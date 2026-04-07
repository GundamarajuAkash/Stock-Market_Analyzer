import ta
from data import get_stock_data

def add_features(df):
    # Moving averages
    df["ma20"] = df["Close"].rolling(20).mean()
    df["ma50"] = df["Close"].rolling(50).mean()

    # RSI
    df["rsi"] = ta.momentum.RSIIndicator(df["Close"]).rsi()

    # MACD
    macd = ta.trend.MACD(df["Close"])
    df["macd"] = macd.macd()

    # Returns
    df["returns"] = df["Close"].pct_change()

    # Clean
    df = df.dropna().copy()
    return df


# TEST BLOCK
if __name__ == "__main__":
    df = get_stock_data("AAPL")
    df = add_features(df)

    print(df.tail())