import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { SubstitutionItem } from "@/lib/mock/types";

export interface ChatBubbleProps {
  sender: "user" | "ai";
  text: string;
  timestamp?: string;
  substitution?: SubstitutionItem;
}

export function ChatBubble({
  sender,
  text,
  timestamp,
  substitution,
}: ChatBubbleProps) {
  if (sender === "user") {
    return (
      <div className="flex flex-col items-end mb-4">
        <div className="bg-emerald-700 text-white rounded-2xl rounded-tr-xs px-5 py-3.5 max-w-[80%] shadow-xs">
          <p className="text-base leading-relaxed">{text}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-stone-400 mt-1 px-1">{timestamp}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3.5 mb-5 max-w-[90%]">
      <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <Sparkles className="w-5 h-5 fill-current" />
      </div>

      <div className="flex-1">
        <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-5 shadow-sm">
          <p className="text-base text-stone-800 leading-relaxed whitespace-pre-line">
            {text}
          </p>

          {substitution && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/70">
              <div className="flex items-center gap-2 text-base font-semibold text-amber-950">
                <span>{substitution.original}</span>
                <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" strokeWidth={2} />
                <span className="text-emerald-800 font-bold">{substitution.substitute}</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
                Ratio: {substitution.ratio}
              </p>
              <p className="mt-2 text-sm text-stone-700 leading-normal">
                {substitution.reason}
              </p>
            </div>
          )}
        </div>

        {timestamp && (
          <span className="text-xs text-stone-400 mt-1 block px-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
