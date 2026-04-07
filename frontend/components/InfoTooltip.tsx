'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function InfoTooltip({
  label,
  info,
}: {
  label: string;
  info: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-help underline decoration-dotted !text-white">
          {label}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm bg-zinc-800 text-white border border-zinc-700">
          {info}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}