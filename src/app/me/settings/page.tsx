"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { ALLERGY_OPTIONS, GOAL_OPTIONS } from "@/lib/mock/planner";
import { DIET_OPTIONS } from "@/lib/mock/videos";
import { CheckCircle2, Watch, Smartphone, Globe, Leaf } from "lucide-react";

const REGION_OPTIONS = ["Ho Chi Minh City", "Ha Noi", "Da Nang", "Can Tho", "Hue", "Other (Vietnam)", "Other (International)"];
const SEASON_OPTIONS = ["Spring", "Summer", "Autumn", "Winter", "All seasons"];

function SettingsSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-stone-800">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

function SettingsContent() {
  const [dietType, setDietType] = useState("vegan");
  const [goal, setGoal] = useState<string>("Weight loss");
  const [region, setRegion] = useState("Ho Chi Minh City");
  const [season, setSeason] = useState("All seasons");
  const [activeAllergies, setActiveAllergies] = useState<string[]>(["Gluten"]);
  const [bmiHeight, setBmiHeight] = useState("170");
  const [bmiWeight, setBmiWeight] = useState("65");
  const [appleHealth, setAppleHealth] = useState(true);
  const [googleFit, setGoogleFit] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [saved, setSaved] = useState(false);

  const bmi = bmiHeight && bmiWeight
    ? (parseFloat(bmiWeight) / Math.pow(parseFloat(bmiHeight) / 100, 2)).toFixed(1)
    : "—";

  const toggleAllergy = (a: string) =>
    setActiveAllergies((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Diet Type */}
      <SettingsSection title="Diet & Lifestyle" icon={<Leaf className="w-4 h-4" />}>
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
            Diet Type
          </label>
          <div className="flex flex-wrap gap-2">
            {DIET_OPTIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDietType(d.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  dietType === d.id
                    ? "bg-emerald-700 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
            Health Goal
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

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
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
      </SettingsSection>

      {/* BMI */}
      <SettingsSection title="BMI & Body Metrics" icon={<CheckCircle2 className="w-4 h-4" />}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="height" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Height (cm)
            </label>
            <input
              id="height"
              type="number"
              value={bmiHeight}
              onChange={(e) => setBmiHeight(e.target.value)}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              value={bmiWeight}
              onChange={(e) => setBmiWeight(e.target.value)}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
          <span className="text-sm text-stone-500">Calculated BMI:</span>
          <span className="font-serif font-bold text-2xl text-emerald-700">{bmi}</span>
          <span className="text-xs text-stone-500 ml-auto">
            {parseFloat(bmi) < 18.5 ? "Underweight" :
             parseFloat(bmi) < 25 ? "✅ Healthy weight" :
             parseFloat(bmi) < 30 ? "Overweight" : "Obese"}
          </span>
        </div>
      </SettingsSection>

      {/* Region & Season */}
      <SettingsSection title="Region & Season" icon={<Globe className="w-4 h-4" />}>
        <p className="text-sm text-stone-500">
          Used to personalise recipe recommendations with local, seasonal ingredients.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="region" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Region
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            >
              {REGION_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="season" className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Season
            </label>
            <select
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full h-11 rounded-xl border border-stone-200 bg-white px-4 text-base focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
            >
              {SEASON_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </SettingsSection>

      {/* Wearable Sync */}
      <SettingsSection title="Wearable Sync" icon={<Watch className="w-4 h-4" />}>
        <p className="text-sm text-stone-500">
          Sync with your fitness tracker to compare actual calorie burn vs your meal plan targets.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-800 text-white flex items-center justify-center text-xs font-bold">
                🍎
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">Apple Health</p>
                <p className="text-xs text-stone-500">HealthKit integration</p>
              </div>
            </div>
            <Toggle checked={appleHealth} onChange={setAppleHealth} />
          </div>

          <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">Google Fit</p>
                <p className="text-xs text-stone-500">Fitness API integration</p>
              </div>
            </div>
            <Toggle checked={googleFit} onChange={setGoogleFit} />
          </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" icon={<CheckCircle2 className="w-4 h-4" />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-900">Email notifications</p>
              <p className="text-xs text-stone-500">Replies to your posts and comments</p>
            </div>
            <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
          </div>
          <div className="h-px bg-stone-100" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-900">Weekly meal digest</p>
              <p className="text-xs text-stone-500">Personalized recipe roundup every Monday</p>
            </div>
            <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} />
          </div>
        </div>
      </SettingsSection>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="h-11 px-8 rounded-xl bg-emerald-700 text-white font-semibold text-base hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
        >
          Save settings
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-700 font-medium animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}

export default function MeSettingsPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Account"
          title="Settings"
          subtitle="Personalise your diet, health goals, region, and connected apps."
        />
        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <SettingsContent />
        )}
      </div>
    </AppShell>
  );
}

