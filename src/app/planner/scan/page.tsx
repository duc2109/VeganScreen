"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Dropzone } from "@/components/ui/Dropzone";
import { VideoCard } from "@/components/ui/VideoCard";
import { LockedState, GatedSkeleton } from "@/components/ui/LockedState";
import { useRole } from "@/context/RoleContext";
import { SCAN_PRESETS } from "@/lib/mock/planner";
import { VIDEO_RECIPES } from "@/lib/mock/videos";
import { DetectedIngredient } from "@/lib/mock/types";
import { CheckCircle2, AlertTriangle, ChevronRight } from "lucide-react";

function FreshnessBadge({ freshness }: { freshness: DetectedIngredient["freshness"] }) {
  if (freshness === "Fresh") {
    return (
      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
        <CheckCircle2 className="w-3 h-3" />
        Fresh
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
      <AlertTriangle className="w-3 h-3" />
      Use soon
    </span>
  );
}

function ScanContent() {
  const [scanned, setScanned] = useState(false);
  const [activePreset, setActivePreset] = useState(SCAN_PRESETS[0]);

  const handleFileAccepted = () => {
    setScanned(true);
  };

  const matchingVideos = VIDEO_RECIPES.filter((v) =>
    activePreset.matchingRecipeIds.includes(v.id)
  );

  return (
    <div className="space-y-8">
      {/* Demo preset picker */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs text-stone-500 self-center mr-1">Demo preset:</span>
        {SCAN_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePreset(p);
              setScanned(false);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              activePreset.id === p.id
                ? "bg-emerald-700 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Upload / Scan zone */}
        <div className="space-y-4">
          <Dropzone
            label={scanned ? "Scan another photo" : "Upload or drop a photo of your ingredients"}
            hint="Supports JPG, PNG, HEIC — max 12 MB"
            accept="image/*"
            onFileAccepted={handleFileAccepted}
            ctaLabel="Choose photo"
          />

          {/* Demo trigger */}
          {!scanned && (
            <button
              onClick={() => setScanned(true)}
              className="w-full flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-emerald-400 text-emerald-700 text-sm font-medium hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
              Simulate AI scan with "{activePreset.label}"
            </button>
          )}
        </div>

        {/* Detected ingredients */}
        {scanned ? (
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-stone-800">
                Detected Ingredients
              </h3>
              <span className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                {activePreset.detected.length} items
              </span>
            </div>

            <div className="space-y-2">
              {activePreset.detected.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 bg-stone-50 border border-stone-100 rounded-[12px] px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{item.name}</p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {item.category} · {Math.round(item.confidence * 100)}% confidence
                    </p>
                  </div>
                  <FreshnessBadge freshness={item.freshness} />
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="p-5 flex flex-col items-center justify-center min-h-[220px] text-center opacity-60">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-stone-400" />
            </div>
            <p className="text-sm font-medium text-stone-600">Upload a photo to see detected ingredients</p>
          </Card>
        )}
      </div>

      {/* Matching Recipes */}
      {scanned && (
        <div className="space-y-4">
          <h3 className="font-semibold text-stone-800">
            Matching Recipes
            <span className="ml-2 text-xs font-normal text-stone-500">
              Based on your detected ingredients
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchingVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
            {matchingVideos.length === 0 && (
              <p className="text-sm text-stone-500 col-span-3">No matching recipes found for these ingredients.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlannerScanPage() {
  const { isGuest, ready } = useRole();

  return (
    <AppShell showRightRail={false}>
      <div className="max-w-[1240px] mx-auto w-full">
        <PageHeader
          eyebrow="Ingredient Scanner"
          title="Scan & Match Recipes"
          subtitle="Take a photo of your fridge or pantry — our AI identifies ingredients and finds matching plant-based recipes instantly."
        />

        {!ready ? (
          <GatedSkeleton />
        ) : isGuest ? (
          <LockedState reason="guest" />
        ) : (
          <ScanContent />
        )}
      </div>
    </AppShell>
  );
}


