"""
DataParser: Core engine for ingesting, parsing, merging, and analyzing ACE report data.

This module handles the critical data processing pipeline:
1. Reads three ACE report CSV files
2. Merges records on entry_number
3. Calculates refund due for IEEPA tariffs
4. Calculates protest deadlines and days remaining
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, Optional
import re


class DataParser:
    """
    Main parser class for processing ACE report data.
    
    Handles the complete data pipeline from raw CSV files to calculated,
    risk-flagged entries ready for analysis.
    """
    
    def __init__(self):
        """Initialize the DataParser."""
        self.merged_data: Optional[pd.DataFrame] = None
        self.entry_summary: Optional[pd.DataFrame] = None
        self.liquidation_status: Optional[pd.DataFrame] = None
        self.importer_statement: Optional[pd.DataFrame] = None
    
    def read_entry_summary(self, file_path: str) -> pd.DataFrame:
        """
        Read Report 1: Entry Summary Report.
        
        Expected columns:
        - entry_number: 11-digit unique identifier
        - hts_code: 10-digit HTS classification code
        - duties_paid: Total duty amount paid
        - entered_value: Value used for ad-valorem duty assessment
        """
        df = pd.read_csv(file_path)
        # Ensure entry_number is string with leading zeros preserved
        df['entry_number'] = df['entry_number'].astype(str).str.zfill(11)
        self.entry_summary = df
        return df
    
    def read_liquidation_status(self, file_path: str) -> pd.DataFrame:
        """
        Read Report 2: Liquidation Status Report.
        
        Expected columns:
        - entry_number: 11-digit unique identifier
        - liquidation_date: Date when entry was liquidated
        - liquidation_status: Status of liquidation (must be "Liquidated")
        - protest_status: Status of any existing protest
        """
        df = pd.read_csv(file_path)
        # Ensure entry_number is string with leading zeros preserved
        df['entry_number'] = df['entry_number'].astype(str).str.zfill(11)
        # Parse liquidation_date as datetime
        df['liquidation_date'] = pd.to_datetime(df['liquidation_date'])
        self.liquidation_status = df
        return df
    
    def read_importer_statement(self, file_path: str) -> pd.DataFrame:
        """
        Read Report 3: Importer Statement Report.
        
        Expected columns:
        - entry_number: 11-digit unique identifier
        - Additional metadata fields (if needed for future enhancements)
        """
        df = pd.read_csv(file_path)
        # Ensure entry_number is string with leading zeros preserved
        df['entry_number'] = df['entry_number'].astype(str).str.zfill(11)
        self.importer_statement = df
        return df
    
    def is_ieepa_tariff(self, hts_code: str) -> bool:
        """
        Check if HTS code indicates an IEEPA tariff.
        
        IEEPA tariffs start with '9903' in the HTS classification.
        
        Args:
            hts_code: HTS classification code (string)
            
        Returns:
            True if HTS code starts with '9903', False otherwise
        """
        if pd.isna(hts_code):
            return False
        hts_str = str(hts_code).strip()
        # Remove any dots or formatting, check first 4 digits
        hts_clean = re.sub(r'[.\s-]', '', hts_str)
        return hts_clean.startswith('9903')
    
    def calculate_refund_due(self, row: pd.Series) -> float:
        """
        Calculate the estimated duty refund for an entry.
        
        Refund is equal to duties_paid if:
        1. HTS code is an IEEPA tariff (starts with 9903)
        2. Entry is liquidated
        3. No existing protest
        
        Args:
            row: DataFrame row containing entry data
            
        Returns:
            Calculated refund amount (float)
        """
        # Check if IEEPA tariff
        if not self.is_ieepa_tariff(row.get('hts_code', '')):
            return 0.0
        
        # Check if liquidated
        if row.get('liquidation_status', '').strip().lower() != 'liquidated':
            return 0.0
        
        # Check if protest already exists
        protest_status = row.get('protest_status', '')
        if pd.notna(protest_status):
            protest_status = str(protest_status).strip().lower()
            if protest_status and protest_status not in ['none', 'na', '', 'nan']:
                return 0.0
        
        # Return duties_paid as refund
        duties = row.get('duties_paid', 0.0)
        return float(duties) if not pd.isna(duties) else 0.0
    
    def calculate_protest_deadline(self, liquidation_date: pd.Timestamp) -> pd.Timestamp:
        """
        Calculate the 180-day protest deadline from liquidation date.
        
        Args:
            liquidation_date: Date when entry was liquidated
            
        Returns:
            Protest deadline date (liquidation_date + 180 days)
        """
        if pd.isna(liquidation_date):
            return pd.NaT
        
        return liquidation_date + timedelta(days=180)
    
    def calculate_days_remaining(self, protest_deadline: pd.Timestamp) -> int:
        """
        Calculate days remaining until protest deadline.
        
        Args:
            protest_deadline: Date of the protest deadline
            
        Returns:
            Integer days remaining (negative if deadline has passed)
        """
        if pd.isna(protest_deadline):
            return None
        
        today = pd.Timestamp.now().normalize()
        deadline = protest_deadline.normalize()
        delta = deadline - today
        
        return int(delta.days)
    
    def merge_data(self) -> pd.DataFrame:
        """
        Merge all three reports on entry_number.
        
        Performs left join starting with entry_summary to ensure all entries
        are included, even if liquidation or importer data is missing.
        
        Returns:
            Merged DataFrame with all fields from all three reports
        """
        if self.entry_summary is None:
            raise ValueError("entry_summary must be loaded before merging")
        
        # Start with entry_summary as base
        merged = self.entry_summary.copy()
        
        # Merge liquidation_status
        if self.liquidation_status is not None:
            merged = merged.merge(
                self.liquidation_status,
                on='entry_number',
                how='left',
                suffixes=('', '_liq')
            )
            # Remove duplicate columns if any
            merged = merged.loc[:, ~merged.columns.str.endswith('_liq')]
        
        # Merge importer_statement
        if self.importer_statement is not None:
            merged = merged.merge(
                self.importer_statement,
                on='entry_number',
                how='left',
                suffixes=('', '_imp')
            )
            # Remove duplicate columns if any
            merged = merged.loc[:, ~merged.columns.str.endswith('_imp')]
        
        self.merged_data = merged
        return merged
    
    def process_and_calculate(self) -> pd.DataFrame:
        """
        Main processing method: merge data and apply all calculations.
        
        This is the core method that:
        1. Merges all three reports
        2. Calculates refund due for each entry
        3. Calculates protest deadline
        4. Calculates days remaining
        
        Returns:
            Fully processed DataFrame with all calculated fields
        """
        # Merge the data
        result = self.merge_data()
        
        # Calculate refund due
        result['calculated_refund_due'] = result.apply(
            self.calculate_refund_due,
            axis=1
        )
        
        # Calculate protest deadline
        result['protest_deadline'] = result['liquidation_date'].apply(
            self.calculate_protest_deadline
        )
        
        # Calculate days remaining
        result['days_remaining'] = result['protest_deadline'].apply(
            self.calculate_days_remaining
        )
        
        # Format dates for display
        result['liquidation_date'] = result['liquidation_date'].dt.strftime('%Y-%m-%d')
        result['protest_deadline'] = result['protest_deadline'].dt.strftime('%Y-%m-%d')
        
        # Replace NaT with None for JSON serialization
        result = result.replace({pd.NaT: None, np.nan: None})
        
        self.merged_data = result
        return result
    
    def process_files(
        self,
        entry_summary_path: str,
        liquidation_status_path: str,
        importer_statement_path: Optional[str] = None
    ) -> pd.DataFrame:
        """
        Complete pipeline: read all files and process.
        
        Convenience method that reads all files and runs the complete
        processing pipeline in one call.
        
        Args:
            entry_summary_path: Path to entry summary CSV
            liquidation_status_path: Path to liquidation status CSV
            importer_statement_path: Optional path to importer statement CSV
            
        Returns:
            Fully processed DataFrame
        """
        # Read all files
        self.read_entry_summary(entry_summary_path)
        self.read_liquidation_status(liquidation_status_path)
        
        if importer_statement_path:
            self.read_importer_statement(importer_statement_path)
        
        # Process and calculate
        return self.process_and_calculate()
    
    def export_to_csv(self, output_path: str) -> None:
        """
        Export processed data to CSV.
        
        Args:
            output_path: Path where CSV should be saved
        """
        if self.merged_data is None:
            raise ValueError("No processed data available. Run process_and_calculate() first.")
        
        self.merged_data.to_csv(output_path, index=False)
    
    def get_risk_summary(self) -> Dict:
        """
        Generate a summary of risk metrics.
        
        Returns:
            Dictionary with risk statistics
        """
        if self.merged_data is None:
            raise ValueError("No processed data available. Run process_and_calculate() first.")
        
        df = self.merged_data
        
        # Count entries with refund due
        refund_eligible = df[df['calculated_refund_due'] > 0]
        
        # Count entries with deadlines approaching (< 90 days)
        urgent = df[(df['days_remaining'] < 90) & (df['days_remaining'] >= 0)]
        
        # Count entries with passed deadlines
        overdue = df[df['days_remaining'] < 0]
        
        # Calculate total refund value
        total_refund = refund_eligible['calculated_refund_due'].sum()
        
        return {
            'total_entries': len(df),
            'refund_eligible_count': len(refund_eligible),
            'urgent_deadlines': len(urgent),
            'overdue_deadlines': len(overdue),
            'total_refund_value': float(total_refund),
            'average_refund': float(refund_eligible['calculated_refund_due'].mean()) if len(refund_eligible) > 0 else 0.0
        }

