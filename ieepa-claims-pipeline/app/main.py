"""
FastAPI application for the IEEPA Claims Pipeline MVP.

Provides endpoints for:
- File upload and processing
- Results display
- Data export
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from typing import Optional
import os
import sys
import tempfile
import shutil
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from data_parser.parser import DataParser

app = FastAPI(title="IEEPA Claims Pipeline MVP", version="1.0.0")

# Create uploads directory if it doesn't exist
BASE_DIR = Path(__file__).parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/", response_class=HTMLResponse)
async def home():
    """Serve the main upload interface."""
    template_path = Path(__file__).parent.parent / "templates" / "index.html"
    with open(template_path, "r") as f:
        return HTMLResponse(content=f.read())


@app.post("/api/process")
async def process_files(
    entry_summary: UploadFile = File(...),
    liquidation_status: UploadFile = File(...),
    importer_statement: Optional[UploadFile] = File(None)
):
    """
    Process uploaded ACE report files and return calculated results.
    
    Accepts three CSV files:
    - entry_summary: Report 1 with HTS codes and duties
    - liquidation_status: Report 2 with liquidation dates
    - importer_statement: Report 3 (optional) with additional metadata
    """
    parser = DataParser()
    
    # Save uploaded files temporarily
    temp_files = []
    try:
        # Save entry_summary
        entry_path = UPLOAD_DIR / entry_summary.filename
        with open(entry_path, "wb") as f:
            shutil.copyfileobj(entry_summary.file, f)
        temp_files.append(entry_path)
        
        # Save liquidation_status
        liq_path = UPLOAD_DIR / liquidation_status.filename
        with open(liq_path, "wb") as f:
            shutil.copyfileobj(liquidation_status.file, f)
        temp_files.append(liq_path)
        
        # Save importer_statement if provided
        importer_path = None
        if importer_statement:
            importer_path = UPLOAD_DIR / importer_statement.filename
            with open(importer_path, "wb") as f:
                shutil.copyfileobj(importer_statement.file, f)
            temp_files.append(importer_path)
        
        # Process files
        result_df = parser.process_files(
            str(entry_path),
            str(liq_path),
            str(importer_path) if importer_path else None
        )
        
        # Convert to dictionary for JSON response
        result_dict = result_df.to_dict(orient='records')
        
        # Get risk summary
        risk_summary = parser.get_risk_summary()
        
        return JSONResponse(content={
            "success": True,
            "data": result_dict,
            "summary": risk_summary,
            "total_records": len(result_dict)
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")
    
    finally:
        # Clean up temporary files
        for temp_file in temp_files:
            if temp_file.exists():
                temp_file.unlink()


@app.post("/api/process-mock")
async def process_mock_files():
    """
    Process mock data files for demo purposes.
    
    Uses the pre-generated mock CSV files in the data/ directory.
    """
    parser = DataParser()
    
    try:
        # Use mock data files
        data_dir = Path(__file__).parent.parent / "data"
        entry_path = data_dir / "entry_summary.csv"
        liq_path = data_dir / "liquidation_status.csv"
        importer_path = data_dir / "importer_statement.csv"
        
        # Check if files exist
        if not os.path.exists(entry_path):
            raise HTTPException(
                status_code=404,
                detail="Mock data files not found. Please generate them first."
            )
        
        # Process files
        result_df = parser.process_files(
            str(entry_path),
            str(liq_path),
            str(importer_path)
        )
        
        # Convert to dictionary for JSON response
        result_dict = result_df.to_dict(orient='records')
        
        # Get risk summary
        risk_summary = parser.get_risk_summary()
        
        return JSONResponse(content={
            "success": True,
            "data": result_dict,
            "summary": risk_summary,
            "total_records": len(result_dict)
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")


@app.get("/api/export")
async def export_results():
    """
    Export processed results as CSV.
    
    Note: This endpoint requires data to be processed first via /api/process
    """
    # For MVP, we'll return the mock data export
    # In production, this would use session/state management
    parser = DataParser()
    
    try:
        data_dir = Path(__file__).parent.parent / "data"
        entry_path = data_dir / "entry_summary.csv"
        liq_path = data_dir / "liquidation_status.csv"
        importer_path = data_dir / "importer_statement.csv"
        
        result_df = parser.process_files(str(entry_path), str(liq_path), str(importer_path))
        
        # Save to temporary file
        output_path = UPLOAD_DIR / "exported_results.csv"
        parser.export_to_csv(str(output_path))
        
        return FileResponse(
            path=str(output_path),
            filename="ieepa_claims_results.csv",
            media_type="text/csv"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Export error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

