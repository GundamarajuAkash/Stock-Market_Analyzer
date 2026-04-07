import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  const { ticker } = params;

  if (!ticker || typeof ticker !== 'string') {
    return NextResponse.json(
      { error: 'Invalid ticker parameter' },
      { status: 400 }
    );
  }

  // Mock API response - replace with real API call
  // This would typically call a real API with stock data
  const mockAnalysisData = {
    ticker: ticker.toUpperCase(),
    price: 152.43,
    price_change: 2.45,
    signal: Math.random() > 0.5 ? 'BUY' : 'SELL',
    confidence: Math.floor(Math.random() * 30) + 70,
    rsi: Math.floor(Math.random() * 50) + 35,
    ma20: 150.82,
    ma50: 148.95,
    reasons: [
      'RSI indicates neither overbought nor oversold conditions, suggesting room for movement.',
      'Stock price above both 20-day and 50-day moving averages indicates uptrend.',
      'Recent price action shows strong support at $150 level.',
      'Volume has increased significantly over the past 3 trading days.',
      'Technical indicators align with positive sentiment in the sector.'
    ]
  };

  return NextResponse.json(mockAnalysisData);
}
