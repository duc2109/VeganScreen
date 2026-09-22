"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import {
  CHAT_SUGGESTION_CHIPS,
  MOCK_SUBSTITUTIONS,
  INITIAL_CHAT_MESSAGES,
} from "@/lib/mock/planner";
import { ChatMessage } from "@/lib/mock/types";
import { Send, Sparkles, RotateCcw, Zap } from "lucide-react";

const AI_RESPONSES: Record<string, { text: string; substitutionKey?: string }> = {
  "Egg substitute for baking": {
    text: "Great question! For baking, eggs serve as binders, leaveners, and moisture providers. Here are the most reliable vegan substitutes:\n\n**For binding:** Flax egg (1 tbsp ground flax + 3 tbsp water, rest 5 min) or chia egg (same ratio).\n**For lift:** 1 tsp baking soda + 1 tbsp apple cider vinegar per egg.\n**For moisture & density:** 50g blended silken tofu per egg — works beautifully in brownies and dense cakes.",
    substitutionKey: "egg",
  },
  "How to get enough B12 in Vietnam": {
    text: "B12 is the most critical nutrient for vegans since plants don't produce it reliably. In Vietnam:\n\n• **Supplement:** A weekly 2,000–2,500µg cyanocobalamin tablet is the gold standard — widely available at Pharmacity and An Khang.\n• **Fortified foods:** Some brands of soy milk and nutritional yeast sold at Co.opmart are B12-fortified — check the label.\n• **Nori sheets:** Contain some active B12 analogues, but not sufficient as a sole source.\n\nAim for 2.4µg/day. If you eat eggs or dairy occasionally (lacto-ovo vegetarian), your needs may already be partially covered.",
  },
  "Explain my BMI (21.4)": {
    text: "Your BMI of 21.4 falls within the healthy range (18.5–24.9) — excellent! Here's the full picture:\n\n• **Underweight:** < 18.5\n• **Normal weight:** 18.5–24.9 ✅ You are here\n• **Overweight:** 25.0–29.9\n• **Obese:** ≥ 30.0\n\n**Important caveats:** BMI doesn't distinguish between muscle mass and fat mass. Athletes often have higher BMIs despite low body fat. A plant-based diet at BMI 21.4 with adequate protein is an excellent foundation — focus on protein diversity (tofu, tempeh, edamame, lentils) and B12/D3 supplementation.",
  },
  "Protein in tofu vs tempeh": {
    text: "Both are excellent soy-based protein sources:\n\n**Firm Tofu (per 100g):**\n• Protein: ~8–10g\n• Calories: ~76 kcal\n• Texture: soft, absorbs flavours well\n\n**Tempeh (per 100g):**\n• Protein: ~19–20g ✅ Nearly 2× tofu!\n• Calories: ~193 kcal\n• Bonus: fermented → better gut microbiome support, higher bioavailability\n\n**Verdict:** Tempeh wins on protein density. Combine both for texture variety — marinated tofu in soups/curries, crumbled tempeh for stir-fries and salads.",
  },
};

function GuestTrialBanner({ queriesLeft, onRunOut }: { queriesLeft: number; onRunOut: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-[14px] px-4 py-3 mb-4">
      <Zap className="w-4 h-4 text-amber-600 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-900">Free Trial</p>
        <div className="flex items-center gap-2 mt-0.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < queriesLeft ? "bg-amber-400" : "bg-amber-100"}`}
            />
          ))}
          <span className="text-xs text-amber-700 font-medium ml-1 shrink-0">{queriesLeft}/3 left</span>
        </div>
      </div>
      {queriesLeft === 0 && (
        <button
          onClick={onRunOut}
          className="shrink-0 text-xs font-semibold text-amber-800 underline underline-offset-2 cursor-pointer"
        >
          Unlock
        </button>
      )}
    </div>
  );
}

function ChatInterface({ isGuest }: { isGuest: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([...INITIAL_CHAT_MESSAGES]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [trialQueries, setTrialQueries] = useState(3);
  const [trialExhausted, setTrialExhausted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    if (isGuest && trialQueries <= 0) {
      setTrialExhausted(true);
      return;
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now",
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    if (isGuest) setTrialQueries((q) => q - 1);

    setTimeout(() => {
      const preset = AI_RESPONSES[text.trim()];
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: "Just now",
        text: preset?.text ??
          "That's a great question! As your AI Nutritionist, I can give you personalized advice on plant-based nutrition. Could you give me more context, like your current diet type, health goal, or any allergies? I'll tailor my answer to your profile.",
        substitution: preset?.substitutionKey ? MOCK_SUBSTITUTIONS[preset.substitutionKey] : undefined,
      };
      setMessages((m) => [...m, aiMsg]);
      setLoading(false);
    }, 900);
  };

  if (isGuest && trialExhausted) {
    return (
      <LockedState
        reason="guest"
        title="Upgrade for unlimited AI Nutritionist access"
        description="You've used all 3 free questions. Join VeggieHub for free to ask unlimited nutrition questions, get personalized meal advice, and more."
      />
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px] max-h-[820px] bg-white border border-stone-200 rounded-[20px] shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100 bg-white">
        <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-amber-950 fill-current" />
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">VeggieHub AI Nutritionist</p>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Online · Nutrition-focused
          </span>
        </div>
        <button
          onClick={() => setMessages([...INITIAL_CHAT_MESSAGES])}
          className="ml-auto p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer text-stone-400 hover:text-stone-600"
          title="Clear conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-6 space-y-1">
        {isGuest && (
          <GuestTrialBanner
            queriesLeft={trialQueries}
            onRunOut={() => setTrialExhausted(true)}
          />
        )}

        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            sender={m.sender}
            text={m.text}
            timestamp={m.timestamp}
            substitution={m.substitution}
          />
        ))}

        {loading && (
          <div className="flex items-start gap-3.5 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-950 fill-current" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-4 shadow-sm">
              <div className="flex gap-1 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-stone-300 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestion chips */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
        {CHAT_SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => sendMessage(chip)}
            className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 hover:border-emerald-200 transition-colors cursor-pointer font-medium"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          disabled={loading}
          placeholder={
            isGuest && trialQueries <= 0
              ? "Free queries exhausted — create a free account"
              : "Ask about nutrition, swaps, B12, macros…"
          }
          className="flex-1 h-11 rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none disabled:opacity-50 disabled:cursor-not-allowed transition"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim() || (isGuest && trialQueries <= 0)}
          className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function AIPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[900px] mx-auto w-full">
        <PageHeader
          eyebrow="AI Feature"
          title="AI Nutritionist"
          subtitle="Ask about ingredient swaps, macro balancing, B12 requirements, or how to personalize your diet for your health goals."
        />

        {!ready ? (
          <GatedSkeleton />
        ) : (
          <ChatInterface isGuest={isGuest} />
        )}
      </div>
    </AppShell>
  );
}

