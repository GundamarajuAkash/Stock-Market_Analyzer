'use client';

import { Card } from '@/components/ui/card';
import InfoTooltip from "@/components/InfoTooltip";

interface IndicatorsPanelProps {
rsi: number;
ma20: number;
ma50: number;
}

export default function IndicatorsPanel({ rsi, ma20, ma50 }: IndicatorsPanelProps) {

const getIndicatorStatus = (value: number) => {
if (value > 70) return { label: 'Overbought', color: 'text-red-400' };
if (value < 30) return { label: 'Oversold', color: 'text-green-400' };
return { label: 'Neutral', color: 'text-gray-400' };
};

const rsiStatus = getIndicatorStatus(rsi);

return ( <Card className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">


  <h3 className="text-lg font-semibold mb-6 text-white">
    Technical Indicators
  </h3>

  <div className="space-y-6">

    {/* RSI */}
    <div>
      <div className="flex justify-between items-center mb-2">

        <InfoTooltip
          label="RSI (14)"
          info="Relative Strength Index. Above 70 = overbought, below 30 = oversold."
        />

        <span className={`text-sm font-semibold ${rsiStatus.color}`}>
          {rsiStatus.label}
        </span>
      </div>

      <p className="text-3xl font-bold text-white">
        {rsi.toFixed(2)}
      </p>

      <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
        <div
          className="bg-green-400 h-2 rounded-full transition-all"
          style={{ width: `${Math.min(rsi, 100)}%` }}
        />
      </div>
    </div>

    {/* MOVING AVERAGES */}
    <div className="pt-4 border-t border-zinc-800">

      <p className="text-gray-400 text-sm mb-3">
        Moving Averages
      </p>

      <div className="space-y-4">

        <div className="flex justify-between items-center">
          <InfoTooltip
            label="MA(20)"
            info="20-day moving average. Tracks short-term trend."
          />
          <span className="font-semibold text-white">
            ${ma20.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <InfoTooltip
            label="MA(50)"
            info="50-day moving average. Tracks medium-term trend."
          />
          <span className="font-semibold text-white">
            ${ma50.toFixed(2)}
          </span>
        </div>

      </div>

    </div>

  </div>

</Card>


);
}
