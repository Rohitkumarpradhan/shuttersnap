"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
    const { darkMode, toggleTheme } = useTheme();

    // 1. New state to track if the camera should see the nav
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Buffer: Ignore micro-jitters (prevents trackpad twitching)
            if (Math.abs(currentScrollY - lastScrollY) < 10) return;

            // If scrolling DOWN and we are past the top 80px of the page -> Hide
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setIsVisible(false);
            } else {
                // Scrolling UP -> Show
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            /* Added: 'transition-all duration-300 transform'
               Added: isVisible ? "translate-y-0" : "-translate-y-full"
            */
            className={`fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row gap-4 justify-between items-center transition-all duration-300 transform ${isVisible ? "translate-y-0" : "-translate-y-full"
                } ${darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
        >
            {/* Make sure 'flex-col' is in this className! */}
            <Link href="/" className="flex flex-col items-start justify-center">
                <span className="text-xl md:text-2xl font-serif tracking-widest leading-none">
                    SHUTTERSNAP
                </span>
                <span className="text-[10px] italic font-serif opacity-70 tracking-wide lowercase mt-1">
                    still capturing
                </span>
            </Link>
            {/* LINKS */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-sm">
                <Link href="/" className="hover:opacity-70 transition-opacity">
                    Home
                </Link>

                <Link href="/collections" className="hover:opacity-70 transition-opacity">
                    Collections
                </Link>
                <Link href="/feedback" className="hover:opacity-70 transition-opacity">
                    Feedback
                </Link>

                {/* THEME TOGGLE */}
                <button
                    onClick={toggleTheme}
                    className={`px-4 py-2 rounded-full border text-sm transition ${darkMode
                            ? "border-white/30 hover:bg-white hover:text-black"
                            : "border-black/30 hover:bg-black hover:text-white"
                        }`}
                >
                    {darkMode ? "☀ Light" : "🌙 Dark"}
                </button>
            </div>
        </nav>
    );
}