"use client";

import React, { useRef } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

export interface DropzoneProps {
  /** New API */
  label?: string;
  hint?: string;
  onFileAccepted?: (file: File) => void;
  ctaLabel?: string;
  /** Legacy API (kept for existing pages) */
  title?: string;
  subtitle?: string;
  onFileSelect?: (file: File) => void;
  /** Shared */
  accept?: string;
  icon?: "upload" | "image";
  className?: string;
}

export function Dropzone({
  label,
  hint,
  onFileAccepted,
  ctaLabel,
  title,
  subtitle,
  onFileSelect,
  accept,
  icon = "image",
  className = "",
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const displayTitle = label ?? title ?? "Drop your photo or file here, or browse";
  const displaySubtitle = hint ?? subtitle ?? "Supports PNG, JPG or MP4 up to 50MB";
  const displayCta = ctaLabel ?? "Browse file";

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileAccepted?.(file);
      onFileSelect?.(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-[20px] p-8 text-center bg-white transition-colors cursor-pointer group select-none flex flex-col items-center justify-center ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform mb-4">
        {icon === "upload" ? (
          <UploadCloud className="w-7 h-7" strokeWidth={1.75} />
        ) : (
          <ImageIcon className="w-7 h-7" strokeWidth={1.75} />
        )}
      </div>

      <p className="text-base font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
        {displayTitle}
      </p>
      <p className="mt-1 text-sm text-stone-500">{displaySubtitle}</p>

      <button
        type="button"
        className="mt-4 h-9 px-4 rounded-full bg-stone-100 group-hover:bg-emerald-50 text-stone-700 group-hover:text-emerald-800 text-sm font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
      >
        <span>{displayCta}</span>
      </button>
    </div>
  );
}
