"use client";

import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { VideoCard } from "@/components/ui/VideoCard";
import { RECIPE_FILTERS, VIDEO_RECIPES } from "@/lib/mock/data";

export function TrendingVideos() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="mt-11">
      {/* Section Header */}
      <SectionHeader
        eyebrow="WATCH & COOK"
        title="Trending video recipes"
        actionText="See all"
      />

      {/* Filter Row */}
      <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        {RECIPE_FILTERS.map((filter) => (
          <Chip
            key={filter}
            variant="filter"
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Chip>
        ))}

        {/* Sort Chip on the right */}
        <button
          type="button"
          className="ml-auto h-10 px-[18px] text-[15px] rounded-full border border-stone-200 bg-white text-stone-700 font-medium hover:text-stone-900 transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-stone-500" strokeWidth={1.75} />
          <span>Trending</span>
        </button>
      </div>

      {/* 4-column Video Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
        {VIDEO_RECIPES.map((recipe) => (
          <VideoCard
            key={recipe.id}
            title={recipe.title}
            duration={recipe.duration}
            author={recipe.author}
            views={recipe.views}
            imageUrl={recipe.image}
          />
        ))}
      </div>
    </section>
  );
}
