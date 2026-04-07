from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from data import get_stock_data
from features import add_features
from model import train_model, predict, explain

app = FastAPI()

# CORS (important for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/analyze/{ticker}")
def analyze_stock(ticker: str, range: str = Query("3M")):
    # Get data
    df = get_stock_data(ticker)
    df = add_features(df)

    # Train + predict
    model, features = train_model(df)
    signal, confidence = predict(model, df, features)

    # -------- RANGE LOGIC --------
    range_map = {
        "1M": 30,
        "3M": 90,
        "6M": 180,
        "1Y": 365
    }

    days = range_map.get(range, 90)

    # -------- RESPONSE --------
    return {
        "ticker": ticker,
        "signal": signal,
        "confidence": round(confidence * 100, 2),
        "latest_price": round(float(df["Close"].iloc[-1]), 2),
        "rsi": round(float(df["rsi"].iloc[-1]), 2),
        "ma20": round(float(df["ma20"].iloc[-1]), 2),
        "ma50": round(float(df["ma50"].iloc[-1]), 2),
        "explanation": explain(df),

        "chart_data": [
         {
            "date": str(idx),
            "price": round(float(row["Close"]), 2),
            "volume": float(row["Volume"])
        }
        for idx, row in df.tail(days).iterrows()
    ]
    }