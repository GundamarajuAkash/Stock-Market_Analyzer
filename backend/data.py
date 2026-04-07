import yfinance as yf

def get_stock_data(ticker):
    df = yf.download(ticker, period="1y", interval="1d")

    if isinstance(df.columns, type(df.columns)):
        df.columns = [col[0] if isinstance(col, tuple) else col for col in df.columns]

    df = df.dropna().copy()
    return df


# TEST BLOCK
if __name__ == "__main__":
    df = get_stock_data("AAPL")
    print(df.tail())