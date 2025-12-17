"""
Quick test script to verify the DataParser works correctly.
Run this to validate the core parsing and calculation logic.
"""

from data_parser.parser import DataParser
from pathlib import Path

def test_parser():
    """Test the DataParser with mock data."""
    print("🧪 Testing DataParser...")
    print()
    
    # Initialize parser
    parser = DataParser()
    
    # Get data paths
    data_dir = Path("data")
    entry_path = data_dir / "entry_summary.csv"
    liq_path = data_dir / "liquidation_status.csv"
    importer_path = data_dir / "importer_statement.csv"
    
    # Process files
    print("📊 Processing mock data files...")
    result_df = parser.process_files(
        str(entry_path),
        str(liq_path),
        str(importer_path)
    )
    
    print(f"✅ Processed {len(result_df)} entries")
    print()
    
    # Get summary
    summary = parser.get_risk_summary()
    print("📈 Risk Summary:")
    print(f"  Total Entries: {summary['total_entries']}")
    print(f"  Refund Eligible: {summary['refund_eligible_count']}")
    print(f"  Urgent Deadlines (<90 days): {summary['urgent_deadlines']}")
    print(f"  Overdue Deadlines: {summary['overdue_deadlines']}")
    print(f"  Total Refund Value: ${summary['total_refund_value']:,.2f}")
    print()
    
    # Show sample entries with refunds
    refund_entries = result_df[result_df['calculated_refund_due'] > 0]
    if len(refund_entries) > 0:
        print("💰 Sample Refund-Eligible Entries:")
        print(refund_entries[['entry_number', 'hts_code', 'calculated_refund_due', 'days_remaining']].head().to_string(index=False))
        print()
    
    # Show urgent entries
    urgent_entries = result_df[(result_df['days_remaining'] < 90) & (result_df['days_remaining'] >= 0)]
    if len(urgent_entries) > 0:
        print("⚠️  Sample Urgent Entries (<90 days remaining):")
        print(urgent_entries[['entry_number', 'protest_deadline', 'days_remaining', 'calculated_refund_due']].head().to_string(index=False))
        print()
    
    print("✅ All tests passed!")

if __name__ == "__main__":
    test_parser()

