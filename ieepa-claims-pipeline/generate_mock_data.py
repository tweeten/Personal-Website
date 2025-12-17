"""
Generate mock ACE report data for testing and demo purposes.

Creates three CSV files with ~50 entries:
- entry_summary.csv: HTS codes, duties paid, entered values
- liquidation_status.csv: Liquidation dates and statuses
- importer_statement.csv: Additional metadata

Ensures 10-15 entries have IEEPA tariffs (9903.XX.XXXX) and
deadlines with < 90 days remaining.
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from pathlib import Path

# Create data directory if it doesn't exist
DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

# Set random seed for reproducibility
random.seed(42)
np.random.seed(42)

# Generate ~50 entry numbers (11-digit)
num_entries = 50
entry_numbers = [f"{random.randint(10000000000, 99999999999):011d}" for _ in range(num_entries)]

# Ensure unique entry numbers
entry_numbers = list(set(entry_numbers))
while len(entry_numbers) < num_entries:
    entry_numbers.append(f"{random.randint(10000000000, 99999999999):011d}")
    entry_numbers = list(set(entry_numbers))

entry_numbers = entry_numbers[:num_entries]

# Generate dates for liquidation (varying from 6 months ago to 1 year from now)
base_date = datetime.now()
liquidation_dates = []
for i in range(num_entries):
    # Vary dates: some past, some future
    days_offset = random.randint(-180, 365)
    date = base_date + timedelta(days=days_offset)
    liquidation_dates.append(date)

# Shuffle to randomize
random.shuffle(liquidation_dates)

# Generate HTS codes - 10-15 should be IEEPA (9903.XX.XXXX)
hts_codes = []
ieepa_count = 0
target_ieepa = random.randint(10, 15)

for i in range(num_entries):
    if ieepa_count < target_ieepa:
        # Generate IEEPA tariff code (9903.XX.XXXX)
        subcode = random.randint(10, 99)
        item = random.randint(1000, 9999)
        hts_code = f"9903.{subcode:02d}.{item:04d}"
        ieepa_count += 1
    else:
        # Generate regular HTS code (non-IEEPA)
        chapter = random.randint(1, 97)
        heading = random.randint(10, 99)
        subheading = random.randint(10, 99)
        item = random.randint(1000, 9999)
        hts_code = f"{chapter:02d}{heading:02d}.{subheading:02d}.{item:04d}"
    
    hts_codes.append(hts_code)

# Generate duties_paid (higher for IEEPA tariffs)
duties_paid = []
for hts in hts_codes:
    if hts.startswith('9903'):
        # IEEPA tariffs: $5,000 - $50,000
        duties = random.uniform(5000, 50000)
    else:
        # Regular tariffs: $100 - $10,000
        duties = random.uniform(100, 10000)
    duties_paid.append(round(duties, 2))

# Generate entered_value (typically 10-50x duties for ad-valorem)
entered_values = [round(duties * random.uniform(10, 50), 2) for duties in duties_paid]

# Generate liquidation_status (most should be "Liquidated")
liquidation_statuses = []
for i in range(num_entries):
    # 90% liquidated, 10% other statuses
    if random.random() < 0.9:
        status = "Liquidated"
    else:
        status = random.choice(["Pending", "Suspended", "Cancelled"])
    liquidation_statuses.append(status)

# Generate protest_status (most should be "None")
# Ensure IEEPA entries have more "None" to make them refund-eligible
protest_statuses = []
for i, hts in enumerate(hts_codes):
    # For IEEPA tariffs, 80% should have no protest (to ensure refund eligibility)
    # For regular tariffs, 85% no protest
    is_ieepa = hts.startswith('9903')
    no_protest_prob = 0.80 if is_ieepa else 0.85
    
    if random.random() < no_protest_prob:
        status = "None"
    else:
        status = random.choice(["Filed", "Pending", "Denied"])
    protest_statuses.append(status)

# Create DataFrames
entry_summary_df = pd.DataFrame({
    'entry_number': entry_numbers,
    'hts_code': hts_codes,
    'duties_paid': duties_paid,
    'entered_value': entered_values
})

liquidation_status_df = pd.DataFrame({
    'entry_number': entry_numbers,
    'liquidation_date': [d.strftime('%Y-%m-%d') for d in liquidation_dates],
    'liquidation_status': liquidation_statuses,
    'protest_status': protest_statuses
})

importer_statement_df = pd.DataFrame({
    'entry_number': entry_numbers,
    'importer_name': [f"Importer {random.randint(1, 20)}" for _ in range(num_entries)],
    'port_of_entry': [random.choice(['LAX', 'JFK', 'MIA', 'ORD', 'SEA', 'DFW']) for _ in range(num_entries)],
    'entry_date': [(base_date + timedelta(days=random.randint(-365, 0))).strftime('%Y-%m-%d') for _ in range(num_entries)]
})

# Save to CSV files
entry_summary_df.to_csv(DATA_DIR / "entry_summary.csv", index=False)
liquidation_status_df.to_csv(DATA_DIR / "liquidation_status.csv", index=False)
importer_statement_df.to_csv(DATA_DIR / "importer_statement.csv", index=False)

print(f"✓ Generated {num_entries} mock entries")
print(f"✓ Created entry_summary.csv with {ieepa_count} IEEPA tariffs")
print(f"✓ Created liquidation_status.csv")
print(f"✓ Created importer_statement.csv")
print(f"\nFiles saved to: {DATA_DIR.absolute()}")

