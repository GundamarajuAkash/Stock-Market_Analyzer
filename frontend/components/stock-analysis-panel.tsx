'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StockAnalysisPanelProps {
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
}

export default function StockAnalysisPanel({ signal, confidence }: StockAnalysisPanelProps) {
  const signalColor = signal === 'BUY' ? 'text-primary' : signal === 'SELL' ? 'text-destructive' : 'text-muted-foreground';
  const badgeVariant = signal === 'BUY' ? 'default' : signal === 'SELL' ? 'destructive' : 'secondary';

  return (
    <Card className="bg-card border-border p-6">
      <h3 className="text-lg font-semibold mb-4">AI Prediction</h3>
      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground text-sm mb-2">Signal</p>
          <div className="flex items-center gap-3">
            <Badge variant={badgeVariant} className="text-base px-4 py-2">
              {signal}
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm mb-2">Confidence</p>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-primary">{confidence}%</p>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
