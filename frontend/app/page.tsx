'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
LineChart,
Line,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
} from 'recharts';

import StockAnalysisPanel from '@/components/stock-analysis-panel';
import IndicatorsPanel from '@/components/indicators-panel';
import ExplanationPanel from '@/components/explanation-panel';

export default function Home() {
const [ticker, setTicker] = useState('AAPL');
const [range, setRange] = useState('3M');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [analysisData, setAnalysisData] = useState<any>(null);
const [autoRefresh, setAutoRefresh] = useState(true);

const stockOptions = [
"TSLA", "NVDA", "JPM", "META", "AAPL",
"AMZN", "NFLX", "GOOGL", "MSFT", "AMD",
"BA", "WMT", "INTC", "XOM", "ORCL","STX"
];
const BASE_URL = "https://stock-marketanalyzer-production.up.railway.app";
  
async function handleAnalyze() {
if (!ticker.trim()) return;


if (!/^[A-Z]{1,5}$/.test(ticker)) {
  setError("Invalid ticker format");
  return;
}

setLoading(true);
setError('');

try {
  const response = await fetch(
  `${BASE_URL}/analyze/${ticker}?range=${range}`
);

  if (!response.ok) throw new Error('API error');

  const data = await response.json();

  setAnalysisData({
    ...data,
    price: data.latest_price,
    reasons: data.explanation,
  });

} catch (err) {
  console.error(err);
  setError('Failed to fetch data.');
  setAnalysisData(null);
} finally {
  setLoading(false);
}


}

// Auto refresh
useEffect(() => {
if (!autoRefresh) return;


const interval = setInterval(() => {
  handleAnalyze();
}, 30000);

return () => clearInterval(interval);


}, [ticker, range, autoRefresh]);

// Load on range change
useEffect(() => {
handleAnalyze();
}, [range]);

return ( <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6"> <div className="max-w-7xl mx-auto">


    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        Stock Market Analyzer
      </h1>

      <button
        onClick={() => setAutoRefresh(!autoRefresh)}
        className={`px-3 py-1 rounded text-sm ${
          autoRefresh
            ? "bg-green-500 text-black"
            : "bg-gray-700 text-white"
        }`}
      >
        {autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"}
      </button>
    </div>

    {/* SEARCH */}
    <Card className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6">
      <div className="flex gap-3 flex-wrap">

        <select
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded"
        >
          {stockOptions.map((s) => (
            <option
              key={s}
              value={s}
              className="bg-zinc-900 text-white"
            >
              {s}
            </option>
          ))}
        </select>

        <Input
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter ticker"
          className="flex-1 bg-zinc-800 text-white border border-zinc-700 placeholder-gray-400"
        />

        <Button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-green-500 text-black hover:bg-green-400"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </Button>

      </div>
    </Card>

    {/* ERROR */}
    {error && (
      <Card className="p-4 border border-red-500 text-red-400 mb-6">
        {error}
      </Card>
    )}

    {/* CONTENT */}
    {analysisData && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <Card className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">

            {/* PRICE */}
            <div className="mb-4">
              <p className="text-sm text-gray-400">Price</p>
              <h2 className="text-5xl font-bold text-green-400">
                ${analysisData.price?.toFixed(2)}
              </h2>
            </div>

            {/* QUICK STATS */}
            <div className="flex gap-6 text-sm text-gray-400 mb-4">
              <span>RSI: {analysisData.rsi.toFixed(1)}</span>
              <span>MA20: {analysisData.ma20.toFixed(0)}</span>
              <span>MA50: {analysisData.ma50.toFixed(0)}</span>
            </div>

            {/* RANGE */}
            <div className="flex gap-2 mb-6">
              {["1M", "3M", "6M", "1Y"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded ${
                    range === r
                      ? "bg-green-500 text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* CHARTS */}
            <div className="space-y-8">

              {/* PRICE */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">
                  Price Trend
                </h3>

                <div className="h-64">
                  <ResponsiveContainer>
                    <LineChart data={analysisData.chart_data}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" hide />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* VOLUME */}
              <div>
                <h3 className="text-sm text-gray-400 mb-2">
                  Trading Volume
                </h3>

                <div className="h-32">
                  <ResponsiveContainer>
                    <BarChart data={analysisData.chart_data}>
                      <XAxis dataKey="date" hide />
                      <YAxis
                        tickFormatter={(v) =>
                          `${(v / 1_000_000).toFixed(0)}M`
                        }
                      />
                      <Tooltip />
                      <Bar
                        dataKey="volume"
                        fill="#3b82f6"
                        minPointSize={3}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </Card>

          <ExplanationPanel reasons={analysisData.reasons} />

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <StockAnalysisPanel
            signal={analysisData.signal}
            confidence={analysisData.confidence}
          />

          <IndicatorsPanel
            rsi={analysisData.rsi}
            ma20={analysisData.ma20}
            ma50={analysisData.ma50}
          />

        </div>

      </div>
    )}

  </div>
</div>


);
}
