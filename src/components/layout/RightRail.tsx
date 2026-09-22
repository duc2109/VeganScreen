"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PlaceRow } from "@/components/ui/PlaceRow";
import { Meter } from "@/components/ui/Meter";
import { Badge } from "@/components/ui/Badge";
import { useRole } from "@/context/RoleContext";
import { VEGAN_PLACES, TRENDING_TOPICS } from "@/lib/mock/data";

function MapTeardropPin({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 30"
      width="24"
      height="30"
      className={className}
      fill="none"
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 30 12 30C12 30 24 19.5 24 12C24 5.373 18.627 0 12 0Z"
        className="fill-emerald-600 drop-shadow-sm"
      />
      <circle cx="12" cy="11" r="4.5" className="fill-white" />
    </svg>
  );
}

export function RightRail() {
  const { isGuest } = useRole();

  return (
    <aside className="w-[360px] shrink-0 space-y-[22px] select-none">
      {/* 1. AI Nutritionist Card */}
      <div className="relative overflow-hidden rounded-[20px] border border-amber-100 bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-sm">
        {/* Decor circle: amber-200 at 60% opacity, 128px, at -top-8 -right-8 */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-amber-200/60 pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-amber-950 shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight leading-tight">
                  AI Nutritionist
                </h3>
                {!isGuest && (
                  <Badge variant="success" className="text-[10px] px-1.5 py-0">
                    Unlimited
                  </Badge>
                )}
              </div>
              <p className="text-sm text-amber-800">
                Macros, swaps & B12 questions
              </p>
            </div>
          </div>

          {/* Body */}
          <p className="mt-4 text-base leading-[1.6] text-stone-700">
            “Is this bowl enough protein after a workout?” — ask anything about
            your plate.
          </p>

          {/* Meter for Guest only */}
          {isGuest ? (
            <Meter
              label="Free trial"
              queriesLeft={3}
              totalQueries={3}
              className="mt-4"
            />
          ) : (
            <div className="mt-3 text-xs font-semibold text-emerald-800">
              Active Member Access · Ready to chat
            </div>
          )}

          {/* CTA */}
          <Link
            href="/ai"
            className="mt-4 w-full h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold transition-colors cursor-pointer shadow-sm inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Ask the AI
          </Link>
        </div>
      </div>

      {/* 2. Vegan Spots Card (p-0) */}
      <div className="overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-sm">
        {/* Map Preview: h-[127px], gradient from-map-from to-map-to */}
        <div className="relative h-[127px] w-full bg-gradient-to-br from-map-from to-map-to overflow-hidden">
          {/* Curvy white roads: stroke ≈ 10px, 90% opacity */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 360 127"
            fill="none"
          >
            <path
              d="M-20 45 C 70 85, 170 15, 380 95"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <path
              d="M100 -20 C 145 65, 215 85, 290 150"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
          </svg>

          {/* 3 Pins at (102,35), (274,25), (210,61) */}
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: "102px", top: "35px" }}
          >
            <MapTeardropPin />
          </div>
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: "274px", top: "25px" }}
          >
            <MapTeardropPin />
          </div>
          <div
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: "210px", top: "61px" }}
          >
            <MapTeardropPin />
          </div>
        </div>

        {/* Body (p-6) */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
              Vegan spots near you
            </h3>
            <span className="text-sm text-stone-400">Ho Chi Minh City</span>
          </div>

          {/* Place Rows (pitch 52) */}
          <div className="flex flex-col space-y-0.5">
            {VEGAN_PLACES.slice(0, 3).map((place) => (
              <PlaceRow
                key={place.id}
                name={place.name}
                sub={`${place.district} · ${place.distance}`}
                rating={place.rating}
              />
            ))}
          </div>

          {/* Button "Open map" */}
          <Link
            href="/shops"
            className="mt-4 w-full h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-base font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span>Open map</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </Link>
        </div>
      </div>

      {/* 3. Trending Topics Card */}
      <Card>
        <div className="flex items-center gap-2 mb-3.5">
          <TrendingUp className="w-[18px] h-[18px] text-emerald-600" strokeWidth={2} />
          <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
            Trending topics
          </h3>
        </div>

        <div className="flex flex-col divide-y divide-stone-100">
          {TRENDING_TOPICS.map((topic) => (
            <Link
              key={topic.tag}
              href="/forum"
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-sm transition-colors hover:bg-stone-50 px-1 -mx-1 rounded group cursor-pointer"
            >
              <span className="font-medium text-stone-900 group-hover:text-emerald-700">
                {topic.tag}
              </span>
              <span className="text-stone-500">{topic.posts}</span>
            </Link>
          ))}
        </div>
      </Card>
    </aside>
  );
}
