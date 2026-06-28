"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

// 1. THE AI OPTIMIZER HELPER
function optimizeCloudinaryUrl(url: string, width = 600, height = 400): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  // Injects AI smart-cropping, auto-quality, and next-gen WebP formatting
  return url.replace("/upload/", `/upload/c_fill,g_auto,w_${width},h_${height},q_auto,f_auto/`);
}

function buildSafeRunway(images: string[], minRunway = 8): string[] {
  if (!images || images.length === 0) return [];
  let pool = [...images];
  while (pool.length < minRunway) {
    pool = [...pool, ...images];
  }
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return [...shuffled, ...shuffled];
}

const fallbackRow1 = ["https://res.cloudinary.com/dasntfhtt/image/upload/v1780417213/DSC_0193_dgdqxa.jpg"];
const fallbackRow2 = ["https://res.cloudinary.com/dasntfhtt/image/upload/v1780417087/DSC_0472_gqaaxa.jpg"];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { darkMode } = useTheme();

  const [row1, setRow1] = useState<string[]>(fallbackRow1);
  const [row2, setRow2] = useState<string[]>(fallbackRow2);

  useEffect(() => {
    async function loadDynamicMarquees() {
      try {
        const res = await fetch("/api/homepage");
        const data = await res.json();

        if (data.collections && data.collections.length > 0) {
          const allPhotos: string[] = data.collections.flatMap((col: any) => col.images);

          if (allPhotos.length > 0) {
            const shuffledPool = allPhotos.sort(() => Math.random() - 0.5);
            const midPoint = Math.floor(shuffledPool.length / 2);

            setRow1(buildSafeRunway(shuffledPool.slice(0, midPoint), 8));
            setRow2(buildSafeRunway(shuffledPool.slice(midPoint), 8));
          }
        }
      } catch (err) {
        console.error("Could not load dynamic pictures", err);
      }
    }
    loadDynamicMarquees();
  }, []);

  return (
    <main className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-black text-white" : "bg-zinc-50 text-black"}`}>

      {/* HERO SECTION (Untouched) */}
      <section
        className="h-screen flex items-center px-8 sm:px-12 pt-24 sm:pt-0 mb-24 bg-cover bg-center relative"
        style={{
          /* 🔥 Changed to a Left-to-Right gradient: Darker on the left behind the text, clear on the right */
          backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.84) 10%, rgba(0, 0, 0, 0.43) 80%), url('https://res.cloudinary.com/dasntfhtt/image/upload/v1782670020/DSC_0538_vpxwk1.jpg')"
        }}
      >
        <div className="relative z-10 ">
          {/* 🔥 Added drop-shadow-xl for extra legibility */}
          <h1 className="text-4xl sm:text-7xl font-serif max-w-2xl text-white drop-shadow-xl">
            Capturing Stories Through My Lens
          </h1>
          <p className="mt-4 sm:mt-6 text-gray-200 text-base sm:text-lg drop-shadow-lg font-medium ">
            Every photograph is a story frozen in time.
          </p>
        </div>
      </section>

      {/* COLLECTION PREVIEW */}
      <section className="space-y-8 overflow-hidden py-12">

        {/* ROW 1 */}
        {/* Added: 'w-max' (forces track width to equal the sum of all photos) */}
        {/* Added: 'hover:[animation-play-state:paused]' (pauses scrolling when user hovers to click!) */}
        {/* Swapped animate-marquee for the manual bracket override */}
        {/* ROW 1 (Scrolls Left) */}
        <div className="flex gap-6 animate-[marquee_120s_linear_infinite] w-max hover:[animation-play-state:paused]">
          {row1.map((img, i) => (
            <img
              key={`row1-${i}`}
              src={img}
              onClick={() => setSelectedImage(img)}
              className="w-[420px] h-[280px] object-cover rounded-xl cursor-pointer hover:scale-105 transition"
              alt="Gallery Preview"
            />
          ))}
        </div>

        {/* ROW 2 (Scrolls Right via animation-direction:reverse) */}
        <div className="flex gap-6 animate-[marquee_120s_linear_infinite] [animation-direction:reverse] w-max hover:[animation-play-state:paused]">
          {row2.map((img, i) => (
            <img
              key={`row2-${i}`}
              src={img}
              onClick={() => setSelectedImage(img)}
              className="w-[420px] h-[280px] object-cover rounded-xl cursor-pointer hover:scale-105 transition"
              alt="Gallery Preview"
            />
          ))}
        </div>

      </section>

      {/* CTA & MODAL UNTOUCHED BELOW... */}
      <div className="text-center py-16">
        <Link href="/collections" className={`border px-8 py-4 rounded-full transition ${darkMode ? "border-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-white"}`}>View Collections</Link>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[999999]" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-8 text-white text-5xl hover:opacity-70 transition">✕</button>
          <img src={selectedImage} alt="Preview" onClick={(e) => e.stopPropagation()} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg" />
        </div>
      )}

    </main>
  );
}