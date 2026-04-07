'use client';

import { Card } from '@/components/ui/card';

interface ExplanationPanelProps {
  reasons: string[];
}

export default function ExplanationPanel({ reasons }: ExplanationPanelProps) {
  return (
    <Card className="bg-card border-border p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
      <ul className="space-y-3">
        {reasons.map((reason, index) => (
          <li key={index} className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="text-foreground text-sm leading-relaxed">{reason}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
