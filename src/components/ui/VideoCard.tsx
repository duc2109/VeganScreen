import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DurationChip } from "./DurationChip";
import { BookmarkButton } from "./BookmarkButton";
import { VideoRecipe } from "@/lib/mock/types";

export interface VideoCardProps {
  /** Convenience: pass a full VideoRecipe object */
  video?: VideoRecipe;
  /** Flat props (used when video is not passed) */
  title?: string;
  duration?: string;
  author?: string;
  views?: string;
  imageUrl?: string;
  id?: string;
  className?: string;
}

export function VideoCard({
  video,
  title: titleProp,
  duration: durationProp,
  author: authorProp,
  views: viewsProp,
  imageUrl: imageUrlProp,
  id: idProp,
  className = "",
}: VideoCardProps) {
  const title = video?.title ?? titleProp ?? "";
  const duration = video?.duration ?? durationProp ?? "";
  const author = video?.author ?? authorProp ?? "";
  const views = video?.views ?? viewsProp ?? "";
  const imageUrl = video?.image ?? imageUrlProp;
  const id = video?.id ?? idProp;

  const inner = (
    <div className={`flex flex-col group cursor-pointer ${className}`}>
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 1280px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-400">
            <svg
              className="w-10 h-10 stroke-current stroke-1 opacity-40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="2" y="2" width="20" height="20" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Top-left Duration Chip */}
        <div className="absolute left-3 top-3 z-10 pointer-events-none">
          <DurationChip duration={duration} variant="video" />
        </div>

        {/* Top-right Bookmark Button */}
        <div className="absolute right-3 top-3 z-10">
          <BookmarkButton />
        </div>
      </div>

      {/* Body */}
      <div className="mt-3 flex flex-col">
        <h3 className="text-base font-semibold text-stone-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-stone-500">
          {author} · {views}
        </p>
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/videos/${id}`}>{inner}</Link>;
  }
  return inner;
}
