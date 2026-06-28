"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/ThemeProvider";

// 1. Upgraded Interface: 'recentPhotos' allows the hover-scrubber to cycle images
interface Collection {
    name: string;
    count: number;
    cover: string;
    recentPhotos?: string[];
}

export default function CollectionsPage() {
    const { darkMode } = useTheme();

    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const res = await fetch("/api/collections", {
                    cache: "no-store",
                });

                const data = await res.json();

                if (Array.isArray(data)) {
                    setCollections(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCollections();
    }, []);

    if (loading) {
        return (
            <main
                className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"
                    }`}
            >
                <h1 className="text-2xl opacity-60">Loading Collections...</h1>
            </main>
        );
    }

    return (
        <main
            className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
        >
            {/* Hero Section (Untouched) */}
            <section className="pt-36 pb-28 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1
                        className="
                font-serif
                text-6xl
                sm:text-7xl
                md:text-8xl
                lg:text-[8rem]
                xl:text-[9rem]
                font-light
                leading-none
                tracking-tight
            "
                    >
                        Collections
                    </h1>

                    <div
                        className={`
                w-32
                h-px
                mx-auto
                my-10
                ${darkMode ? "bg-white/15" : "bg-black/15"}
            `}
                    />

                    <p
                        className={`
                max-w-3xl
                mx-auto
                text-lg
                md:text-xl
                leading-9
                ${darkMode ? "text-white/60" : "text-black/60"}
            `}
                    >
                        Where every collection tells a different story
                    </p>
                </div>
            </section>

            {/* Cards Section */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {collections.map((collection) => (
                        <AlbumCard key={collection.name} collection={collection} />
                    ))}
                </div>
            </section>
        </main>
    );
}

// 2. Extracted Card Sub-Component (Preserves 100% of your exact HTML & Styling)
function AlbumCard({ collection }: { collection: Collection }) {
    const [activeCoverIndex, setActiveCoverIndex] = useState(0);

    // Fallback chain: Uses active hovered photo -> falls back to default cover
    const photosPool = collection.recentPhotos && collection.recentPhotos.length > 0
        ? collection.recentPhotos
        : [collection.cover];

    const displayCover = photosPool[activeCoverIndex] || collection.cover;

    return (
        <Link
            href={`/collections/${collection.name.toLowerCase()}`}
            className="group"
            // 🔥 THE HOVER SCRUBBER LOGIC:
            onMouseMove={(e) => {
                if (photosPool.length <= 1) return;
                const cardWidth = e.currentTarget.getBoundingClientRect().width;
                const mouseX = e.nativeEvent.offsetX;
                const sectionWidth = cardWidth / photosPool.length;
                const newIndex = Math.floor(mouseX / sectionWidth);
                setActiveCoverIndex(Math.min(newIndex, photosPool.length - 1));
            }}
            onMouseLeave={() => setActiveCoverIndex(0)}
        >
            <div className="relative h-[320px] overflow-hidden rounded-3xl shadow-xl">
                {/* Cover Image */}
                <img
                    src={displayCover}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70" />

                {/* Content */}
                <div className="absolute bottom-8 left-8 right-8">
                    <h2 className="text-4xl font-serif text-white">
                        {collection.name}
                    </h2>

                    <p className="mt-2 text-white/90">Explore →</p>
                </div>
            </div>
        </Link>
    );
}