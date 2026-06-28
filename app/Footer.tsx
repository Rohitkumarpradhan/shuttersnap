"use client";

import {
    FaInstagram,
    FaWhatsapp,
    FaFacebookF,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
    const { darkMode } = useTheme();

    return (
        <footer
            className={`mt-24 px-6 md:px-10 py-12 border-t transition-colors duration-300 ${darkMode
                    ? "bg-black text-white border-white/10"
                    : "bg-white text-black border-black/10"
                }`}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* BRAND */}
                <div>
                    <h2 className="text-2xl tracking-[6px]">
                        SHUTTERSNAP
                    </h2>

                    <p
                        className={`mt-4 text-sm max-w-sm ${darkMode
                                ? "text-white/60"
                                : "text-black/60"
                            }`}
                    >
                        Capturing emotions, stories, and timeless moments through my lens.
                    </p>
                </div>

                {/* LINKS */}
                <div
                    className={`space-y-3 text-sm ${darkMode
                            ? "text-white/70"
                            : "text-black/70"
                        }`}
                >
                    

                    <a
                        href="/"
                        className="block hover:opacity-70 transition"
                    >
                        Home
                    </a>

                    <a
                        href="/collections"
                        className="block hover:opacity-70 transition"
                    >
                        Collections
                    </a>

                    <a
                        href="/feedback"
                        className="block hover:opacity-70 transition"
                    >
                        Feedback
                    </a>
                </div>

                {/* SOCIAL */}
                <div>
                    <p
                        className={`font-medium mb-4 ${darkMode
                                ? "text-white"
                                : "text-black"
                            }`}
                    >
                        Connect
                    </p>

                    <div className="flex gap-5 text-xl">

                        {/* EMAIL */}
                        <a
                            href="mailto:shutter.snap.4@gmail.com"
                            className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${darkMode
                                    ? "border-white/10 hover:bg-blue-500"
                                    : "border-black/10 hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            <MdEmail size={18} />
                        </a>

                        {/* INSTAGRAM */}
                        <a
                            href="https://www.instagram.com/shuttersnap4/"
                            target="_blank"
                            rel="noreferrer"
                            className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${darkMode
                                    ? "border-white/10 hover:bg-pink-500"
                                    : "border-black/10 hover:bg-pink-500 hover:text-white"
                                }`}
                        >
                            <FaInstagram size={18} />
                        </a>

                        {/* WHATSAPP */}
                        <a
                            href="https://whatsapp.com/channel/0029VafRwmJ2phHEOUGHMu2C"
                            target="_blank"
                            rel="noreferrer"
                            className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${darkMode
                                    ? "border-white/10 hover:bg-green-500"
                                    : "border-black/10 hover:bg-green-500 hover:text-white"
                                }`}
                        >
                            <FaWhatsapp size={18} />
                        </a>

                        {/* FACEBOOK */}
                        <a
                            href="https://www.facebook.com/profile.php?id=61562115576921"
                            target="_blank"
                            rel="noreferrer"
                            className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${darkMode
                                    ? "border-white/10 hover:bg-blue-600"
                                    : "border-black/10 hover:bg-blue-600 hover:text-white"
                                }`}
                        >
                            <FaFacebookF size={18} />
                        </a>

                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div
                className={`mt-10 text-center text-xs ${darkMode
                        ? "text-white/40"
                        : "text-black/40"
                    }`}
            >
                © {new Date().getFullYear()} SHUTTERSNAP. All rights reserved.
            </div>
        </footer>
    );
}