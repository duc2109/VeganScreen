import React from "react";
import Image from "next/image";
import {
  Flame,
  Clock,
  ChefHat,
  Star,
  Play,
  Bookmark,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { DurationChip } from "@/components/ui/DurationChip";

export function Hero() {
  return (
    <div className="relative h-[498px] w-full rounded-3xl bg-emerald-900 overflow-hidden select-none">
      {/* Background Decor Circle */}
      <div className="absolute -left-10 -bottom-20 w-64 h-64 rounded-full bg-emerald-800 pointer-events-none" />

      {/* Right Image Container */}
      <div className="absolute right-0 inset-y-0 w-[55%] overflow-hidden">
        {/* Local asset extracted from reference with fallback support */}
        <Image
          src="/images/hero-bowl.jpg"
          alt="Lemongrass Tofu Rice Bowl"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 55vw"
        />

        {/* Left-to-right overlay gradient: emerald-900 -> transparent across left 40% */}
        <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-emerald-900 to-transparent pointer-events-none" />

        {/* Bottom-right Duration Chip */}
        <div className="absolute right-4 bottom-4 z-10">
          <DurationChip duration="5:12" variant="hero" />
        </div>
      </div>

      {/* Left Column Content */}
      <div className="relative z-10 p-11 max-w-[500px] h-full flex flex-col justify-between">
        <div>
          {/* Top Tag Row */}
          <div className="flex items-center gap-3">
            <span className="h-8 px-3 rounded-full bg-amber-400 text-amber-950 text-sm font-semibold inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Recipe of the day</span>
            </span>
            <span className="text-sm font-semibold text-emerald-200">
              Vietnamese
            </span>
          </div>

          {/* Heading H1 */}
          <h1 className="mt-6 font-serif font-bold text-[46px] leading-[50px] text-white tracking-tight">
            Lemongrass
            <br />
            Tofu Rice Bowl
          </h1>

          {/* Description */}
          <p className="mt-5 text-lg leading-[27px] text-emerald-100">
            Crispy lemongrass-chili tofu over jasmine rice with pickled carrot,
            cucumber and a punchy vegan nuoc cham.
          </p>

          {/* Meta Row */}
          <div className="mt-5 flex items-center gap-6 text-base font-semibold text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-[18px] h-[18px] text-emerald-200" />
              <span>35 min</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-[18px] h-[18px] text-emerald-200" />
              <span>Easy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-[18px] h-[18px] fill-amber-400 text-amber-400" />
              <span>4.8</span>
              <span className="text-emerald-300 font-semibold">(1.3K)</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-[18px] h-[18px] text-emerald-200" />
              <span>540 kcal</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex items-center gap-6">
            <button
              type="button"
              className="h-[54px] px-7 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-[17px] font-medium inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900"
            >
              <Play className="w-[18px] h-[18px] fill-current" />
              <span>Watch recipe</span>
            </button>
            <button
              type="button"
              className="h-[54px] px-4 rounded-full text-white hover:bg-white/10 text-[17px] font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-900"
            >
              <Bookmark className="w-[18px] h-[18px]" strokeWidth={1.75} />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Divider & Author Row */}
        <div>
          <div className="h-px w-full bg-white/10" />
          <div className="mt-5 flex items-center gap-3">
            <Avatar initials="LN" verified={true} />
            <div className="flex items-center gap-1.5 text-base font-semibold text-white">
              <span>Linh Nguyen</span>
              <span className="text-white/60">·</span>
              <span className="text-emerald-200/85 font-normal">
                @linh.greens
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
