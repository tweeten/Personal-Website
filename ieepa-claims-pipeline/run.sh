#!/bin/bash

# IEEPA Claims Pipeline MVP - Quick Start Script

echo "🚀 Starting IEEPA Claims Pipeline MVP..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if mock data exists
if [ ! -f "data/entry_summary.csv" ]; then
    echo "📊 Generating mock data..."
    python3 generate_mock_data.py
fi

# Start the server
echo ""
echo "✅ Starting FastAPI server..."
echo "🌐 Open your browser to: http://localhost:8000"
echo ""
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

