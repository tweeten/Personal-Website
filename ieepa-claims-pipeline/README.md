# IEEPA Claims Pipeline MVP

**Rapid MVP Development** - 6-week timeline focused on proving automated IEEPA tariff refund management capability.

## Overview

This MVP demonstrates the core technical capability to automatically process ACE report data, calculate refund eligibility, and track critical 180-day protest deadlines for IEEPA tariff refunds.

## Core Features

- **Data Ingestion**: Upload and process three ACE report CSV files
- **Data Parsing & Merging**: Intelligent parsing and merging on `entry_number`
- **Refund Calculation**: Automatic calculation of refund due for IEEPA tariffs (9903.XX.XXXX)
- **Deadline Tracking**: Calculate 180-day protest deadlines and days remaining
- **Risk Flagging**: Visual indicators for urgent (<90 days) and overdue deadlines

## Technology Stack

- **Backend**: Python 3.8+ with FastAPI
- **Data Processing**: Pandas & NumPy for efficient CSV processing
- **Database**: In-memory processing (SQLite optional for future)
- **Frontend**: Minimal HTML/CSS/JS (no frameworks)

## Project Structure

```
ieepa-claims-pipeline/
├── app/
│   └── main.py              # FastAPI application
├── data_parser/
│   └── parser.py            # Core DataParser class
├── templates/
│   └── index.html           # Web interface
├── data/
│   ├── entry_summary.csv    # Mock Report 1
│   ├── liquidation_status.csv # Mock Report 2
│   └── importer_statement.csv # Mock Report 3
├── generate_mock_data.py    # Script to generate test data
├── requirements.txt         # Python dependencies
└── README.md
```

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Generate Mock Data

```bash
python generate_mock_data.py
```

This creates three CSV files in the `data/` directory with ~50 entries, including:
- 10-15 entries with IEEPA tariffs (9903.XX.XXXX)
- Various liquidation dates creating urgent and overdue deadlines
- Realistic duty amounts and entered values

### 3. Run the Application

```bash
cd app
python main.py
```

Or using uvicorn directly:

```bash
uvicorn app.main:app --reload
```

### 4. Access the Web Interface

Open your browser to: `http://localhost:8000`

## Usage

### Option 1: Use Mock Data (Demo)

Click the **"Use Mock Data"** button to instantly process the pre-generated test files.

### Option 2: Upload Your Own Files

1. Prepare your three ACE report CSV files:
   - **Entry Summary**: Must include `entry_number`, `hts_code`, `duties_paid`, `entered_value`
   - **Liquidation Status**: Must include `entry_number`, `liquidation_date`, `liquidation_status`, `protest_status`
   - **Importer Statement**: Optional, includes `entry_number` and additional metadata

2. Click **"Choose File"** for each report
3. Click **"Process Files"**
4. Review results in the table and risk summary

### Export Results

Click **"Export CSV"** to download the processed results as a CSV file.

## Data Model

The merged data model includes:

| Field | Source | Purpose |
|-------|--------|---------|
| `entry_number` | All Reports | Primary key (11-digit) |
| `hts_code` | Report 1 | IEEPA tariff identification |
| `duties_paid` | Report 1 | Refund calculation input |
| `entered_value` | Report 1 | Duty assessment value |
| `liquidation_date` | Report 2 | Deadline calculation start |
| `liquidation_status` | Report 2 | Must be "Liquidated" |
| `protest_status` | Report 2 | Check for existing protests |
| `calculated_refund_due` | Calculated | Refund amount (if eligible) |
| `protest_deadline` | Calculated | Liquidation date + 180 days |
| `days_remaining` | Calculated | Days until deadline |

## Calculation Logic

### Refund Eligibility

An entry is eligible for refund if:
1. HTS code starts with `9903` (IEEPA tariff)
2. Liquidation status is `"Liquidated"`
3. No existing protest (`protest_status` is `"None"` or empty)

**Refund Amount** = `duties_paid` (for eligible entries)

### Deadline Calculation

- **Protest Deadline** = `liquidation_date` + 180 days
- **Days Remaining** = `protest_deadline` - Today

### Risk Flags

- **Urgent**: Days remaining < 90 and >= 0 (yellow highlight)
- **Overdue**: Days remaining < 0 (red highlight)
- **Safe**: Days remaining >= 90 (green highlight)

## API Endpoints

### `POST /api/process`

Process uploaded CSV files.

**Request**: Multipart form data with files:
- `entry_summary`: CSV file (required)
- `liquidation_status`: CSV file (required)
- `importer_statement`: CSV file (optional)

**Response**: JSON with processed data and risk summary

### `POST /api/process-mock`

Process pre-generated mock data files.

**Response**: JSON with processed data and risk summary

### `GET /api/export`

Export processed results as CSV file.

**Response**: CSV file download

## Development Notes

### Code Quality

- **Well-commented**: Core parsing and calculation logic is thoroughly documented
- **Type hints**: Python type hints for better code clarity
- **Error handling**: Comprehensive error handling throughout
- **Clean structure**: Modular design for easy extension

### Future Enhancements (Post-MVP)

- SQLite database for persistent storage
- User authentication and session management
- Batch processing for large files
- Email notifications for urgent deadlines
- Advanced filtering and search
- Historical tracking and reporting

## Testing

The mock data generator creates realistic test scenarios:
- Mix of IEEPA and non-IEEPA tariffs
- Various liquidation dates (past, present, future)
- Different liquidation and protest statuses
- Realistic duty amounts and values

## License

Internal use only - Audit Partner Demo MVP

