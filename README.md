# Stock Market Analyzer

A full stack stock market analysis platform that predicts BUY or SELL signals using machine learning and visualizes key market indicators through an interactive web interface.

## Features

* Historical stock data analysis
* Technical indicators including:

  * Relative Strength Index (RSI)
  * Moving Averages (MA)
  * Moving Average Convergence Divergence (MACD)
* Machine Learning based BUY/SELL prediction
* Prediction confidence scores
* Interactive stock charts and trend visualization
* FastAPI backend for model inference
* Next.js frontend for user interaction

## Tech Stack

### Backend

* Python
* FastAPI
* Pandas
* NumPy
* Scikit Learn

### Frontend

* Next.js
* React.js

### Machine Learning

* Random Forest Classifier

## Project Architecture

```text
Historical Stock Data
          ↓
Data Preprocessing
          ↓
Feature Engineering
(RSI, MA, MACD)
          ↓
Random Forest Model
          ↓
BUY / SELL Prediction
          ↓
FastAPI Backend
          ↓
Next.js Frontend
```

## Machine Learning Pipeline

1. Collect historical stock market data.
2. Clean and preprocess data.
3. Generate technical indicators.
4. Train a Random Forest classification model.
5. Predict next day stock direction.
6. Display prediction results and confidence scores.

## Screenshots

Add screenshots of:

* Home Page
* Stock Analysis Dashboard
* Prediction Results
* Technical Indicator Charts

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/stock-market-analyzer.git
cd stock-market-analyzer
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Usage

1. Launch backend server.
2. Start frontend application.
3. Enter a stock ticker.
4. View technical indicators.
5. Analyze BUY or SELL prediction.
6. Review confidence score and trends.

## Results

* Generates BUY or SELL recommendations based on historical market behavior.
* Provides confidence scores for predictions.
* Visualizes trends and technical indicators for better decision making.

## Future Improvements

* Support additional machine learning models.
* Portfolio tracking.
* Real time stock market integration.
* News sentiment analysis.
* Advanced risk analysis.

## Live Demo

https://stock-market-analyze.netlify.app/

## Author

Akash Gundamaraju

B.Tech Computer Science (AI & ML)

Aspiring Data Analyst | Machine Learning Enthusiast
