from sklearn.ensemble import RandomForestClassifier
from sklearn.utils import resample
import pandas as pd


def train_model(df):
    # Target: next day up or down
    df["target"] = (df["Close"].shift(-1) > df["Close"]).astype(int)

    features = ["ma20", "ma50", "rsi", "macd", "returns"]

    # Drop NaNs
    df = df.dropna().copy()

    # --------- CLASS BALANCING ---------
    df_majority = df[df["target"] == 0]
    df_minority = df[df["target"] == 1]

    df_minority_upsampled = resample(
        df_minority,
        replace=True,
        n_samples=len(df_majority),
        random_state=42
    )

    df_balanced = pd.concat([df_majority, df_minority_upsampled])
    df_balanced = df_balanced.sample(frac=1, random_state=42)

    # Debug (optional)
    print("Balanced class distribution:")
    print(df_balanced["target"].value_counts())

    X = df_balanced[features]
    y = df_balanced["target"]

    # Model
    model = RandomForestClassifier(
        class_weight="balanced",
        random_state=42
    )
    model.fit(X, y)

    return model, features


def predict(model, df, features):
    latest = df.iloc[-1]
    latest_features = df[features].iloc[-1:]

    pred = model.predict(latest_features)[0]
    prob = model.predict_proba(latest_features)[0].max()

    # ML suggestion
    signal = "BUY" if pred == 1 else "SELL"

    # -------- HYBRID LOGIC FIX --------

    bullish = 0
    bearish = 0

    # Trend
    if latest["ma20"] > latest["ma50"]:
        bullish += 1
    else:
        bearish += 1

    # RSI
    if latest["rsi"] < 35:
        bullish += 1
    elif latest["rsi"] > 65:
        bearish += 1

    # MACD
    if latest["macd"] > 0:
        bullish += 1
    else:
        bearish += 1

    # Final decision override
    if bullish >= 2:
        signal = "BUY"
    elif bearish >= 2:
        signal = "SELL"

    return signal, float(prob)

def explain(df):
    latest = df.iloc[-1]
    reasons = []

    # RSI logic
    if latest["rsi"] < 30:
        reasons.append("RSI below 30 indicates oversold conditions")
    elif latest["rsi"] > 70:
        reasons.append("RSI above 70 indicates overbought conditions")
    else:
        reasons.append("RSI is neutral")

    # Trend logic
    if latest["ma20"] > latest["ma50"]:
        reasons.append("Short-term trend is bullish (MA20 above MA50)")
    else:
        reasons.append("Short-term trend is bearish (MA20 below MA50)")

    # MACD logic
    if latest["macd"] > 0:
        reasons.append("MACD indicates bullish momentum")
    else:
        reasons.append("MACD indicates bearish momentum")

    return reasons


# TEST BLOCK
from data import get_stock_data
from features import add_features

if __name__ == "__main__":
    df = get_stock_data("AAPL")
    df = add_features(df)

    model, features = train_model(df)
    signal, confidence = predict(model, df, features)

    print("Signal:", signal)
    print("Confidence:", confidence)