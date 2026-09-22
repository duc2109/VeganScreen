"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { MEAL_PLAN_DAYS, ALLERGY_OPTIONS, PANTRY_DEFAULT_TAGS, GOAL_OPTIONS } from "@/lib/mock/planner";
import { DayPlan, MealItem } from "@/lib/mock/types";
import {
  RefreshCw,
  Leaf,
  UtensilsCrossed,
  ChevronRight,
  Plus,
  X,
  Watch,
  Target,
  Flame,
  Scan,
} from "lucide-react";
import Link from "next/link";

function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-12 text-stone-500 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-right text-stone-700 font-medium">{value}g</span>
    </div>
  );
}

function MealCard({ meal, type }: { meal: MealItem; type: string }) {
  const colorMap: Record<string, string> = {
    Breakfast: "bg-amber-50 text-amber-700 border-amber-200",
    Lunch: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Dinner: "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    <div className="bg-white border border-stone-200 rounded-[16px] p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${colorMap[type] ?? "bg-stone-50 text-stone-600 border-stone-200"}`}
        >
          {type}
        </span>
        <span className="text-xs text-stone-500 shrink-0">{meal.time}</span>
      </div>
      <p className="text-sm font-semibold text-stone-900 leading-snug mb-3">{meal.name}</p>
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center gap-1 text-xs font-medium text-stone-700">
          <Flame className="w-3 h-3 text-amber-500" />
          {meal.kcal} kcal
        </span>
        {meal.inSeason && (
          <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
            <Leaf className="w-3 h-3" />
            In season
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        <MacroBar label="Protein" value={meal.proteinGrams} max={60} color="bg-emerald-500" />
        <MacroBar label="Carbs" value={meal.carbsGrams} max={120} color="bg-amber-400" />
        <MacroBar label="Fat" value={meal.fatGrams} max={50} color="bg-violet-400" />
      </div>
    </div>
  );
}

function DayView({ day }: { day: DayPlan }) {
  const progress = Math.min(100, Math.round((day.totalKcal / day.targetKcal) * 100));
  const wearableDiff = day.actualKcalWearable
    ? day.actualKcalWearable - day.targetKcal
    : null;

  return (
    <div className="space-y-4">
      {/* Day summary bar */}
      <div className="bg-white border border-stone-200 rounded-[16px] p-4 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[180px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-stone-500">
              <span className="font-semibold text-stone-800">{day.totalKcal}</span> / {day.targetKcal} kcal
            </span>
            <span className="text-xs font-semibold text-emerald-700">{progress}%</span>
          </div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {wearableDiff !== null && (
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <Watch className="w-4 h-4 text-stone-400" />
            <span>Wearable:</span>
            <span className={`font-semibold ${wearableDiff > 0 ? "text-amber-600" : "text-emerald-700"}`}>
              {wearableDiff > 0 ? "+" : ""}{wearableDiff} kcal vs target
            </span>
          </div>
        )}
      </div>

      {/* Meal cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MealCard meal={day.breakfast} type="Breakfast" />
        <MealCard meal={day.lunch} type="Lunch" />
        <MealCard meal={day.dinner} type="Dinner" />
      </div>
    </div>
  );
}

function PlannerContent() {
  const [activeDay, setActiveDay] = useState(0);
  const [goal, setGoal] = useState<string>("Weight loss");
  const [bmiHeight, setBmiHeight] = useState("170");
  const [bmiWeight, setBmiWeight] = useState("65");
  const [activeAllergies, setActiveAllergies] = useState<string[]>(["Gluten", "Dairy"]);
  const [pantryTags, setPantryTags] = useState<string[]>([...PANTRY_DEFAULT_TAGS]);
  const [pantryInput, setPantryInput] = useState("");

  const bmi = bmiHeight && bmiWeight
    ? (parseFloat(bmiWeight) / Math.pow(parseFloat(bmiHeight) / 100, 2)).toFixed(1)
    : "—";

  const toggleAllergy = (a: string) =>
    setActiveAllergies((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const addPantry = () => {
    const v = pantryInput.trim();
    if (v && !pantryTags.includes(v)) setPantryTags((p) => [...p, v]);
    setPantryInput("");
  };

  const day = MEAL_PLAN_DAYS[activeDay];

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Left: Personalisation Panel */}
      <div className="xl:w-[320px] shrink-0 space-y-4">
        <Card className="p-5 space-y-5">
          <h3 className="font-semibold text-stone-800 text-sm uppercase tracking-wider">Your Profile</h3>

          {/* Goal */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wider">
              Goal
            </label>
            <div className="flex flex-wrap gap-2">
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    goal === g
                      ? "bg-emerald-700 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* BMI Calculator */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              BMI Calculator
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Height (cm)</label>
                <input
                  type="number"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  className="w-full h-9 rounded-xl border border-stone-200 bg-white px-3 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Weight (kg)</label>
                <input
                  type="number"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  className="w-full h-9 rounded-xl border border-stone-200 bg-white px-3 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
              <span className="text-xs text-stone-500">Your BMI:</span>
              <span className="font-serif font-bold text-xl text-emerald-700">{bmi}</span>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wider">
              Allergies / Avoid
            </label>
            <div className="flex flex-wrap gap-2">
              {ALLERGY_OPTIONS.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAllergy(a)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeAllergies.includes(a)
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Pantry */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wider">
              Pantry Ingredients
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={pantryInput}
                onChange={(e) => setPantryInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPantry()}
                placeholder="Add ingredient…"
                className="flex-1 h-9 rounded-xl border border-stone-200 bg-white px-3 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
              />
              <button
                onClick={addPantry}
                className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pantryTags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium"
                >
                  {t}
                  <button
                    onClick={() => setPantryTags((p) => p.filter((x) => x !== t))}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Scan shortcut */}
        <Link
          href="/planner/scan"
          className="flex items-center gap-3 bg-white border border-stone-200 rounded-[16px] p-4 hover:border-emerald-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
            <Scan className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-stone-900">Scan Ingredients</p>
            <p className="text-xs text-stone-500 mt-0.5">Photo → AI detects & matches recipes</p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors shrink-0" />
        </Link>
      </div>

      {/* Right: Weekly Plan */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Day tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {MEAL_PLAN_DAYS.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                activeDay === i
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-white border border-stone-200 text-stone-700 hover:border-emerald-300"
              }`}
            >
              <span>{d.shortDay}</span>
              <span className={`text-[10px] mt-0.5 ${activeDay === i ? "text-emerald-200" : "text-stone-400"}`}>
                {d.date}
              </span>
            </button>
          ))}
        </div>

        {/* Day header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif font-bold text-xl text-stone-900">{day.day}</p>
            <p className="text-sm text-stone-500">{day.date}</p>
          </div>
          <Button
            variant="soft"
            size="sm"
            className="flex items-center gap-1.5 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate day
          </Button>
        </div>

        <DayView day={day} />

        {/* Weekly summary */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
            <h4 className="font-semibold text-stone-800 text-sm">Weekly Summary</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Avg kcal/day", value: `${Math.round(MEAL_PLAN_DAYS.reduce((s, d) => s + d.totalKcal, 0) / 7)}` },
              { label: "Avg protein/meal", value: "33g" },
              { label: "In-season meals", value: "21 / 21" },
              { label: "Wearable sync", value: "Active" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif font-bold text-2xl text-stone-900">{s.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function PlannerPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="AI-Powered"
          title="My Meal Planner"
          action={
            <Badge variant="beta" className="text-sm px-3 py-1">
              Personalised
            </Badge>
          }
        />

        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <PlannerContent />
        )}
      </div>
    </AppShell>
  );
}
