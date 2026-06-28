"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<any>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(true);
    const [showContact, setShowContact] = useState(false);

    const toggleTheme = () => setDarkMode((p: boolean) => !p);

    return (
        <ThemeContext.Provider
            value={{ darkMode, toggleTheme, showContact, setShowContact }}
        >
            {/* 🔥 THE BRUTE FORCE CSS FIX:
              This directly injects an unbreakable stylesheet into the DOM.
              It uses !important to override the Next.js globals.css and Windows OS settings completely.
            */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    html, body {
                        background-color: ${darkMode ? '#000000' : '#ffffff'} !important;
                        color: ${darkMode ? '#ffffff' : '#000000'} !important;
                    }
                `
            }} />

            {/* Added flex-col and min-h-screen to stretch the layout properly */}
            <div className={`min-h-screen flex flex-col transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
                {children}

                {/* GLOBAL CONTACT MODAL */}
                {showContact && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
                        <div className="relative w-[90%] max-w-md p-8 rounded-2xl bg-white/10 border border-white/20 text-white shadow-2xl">
                            <button
                                onClick={() => setShowContact(false)}
                                className="absolute top-4 right-4 text-xl hover:opacity-70 transition-opacity"
                            >
                                ✕
                            </button>
                            <h2 className="text-center text-xl font-serif mb-6">Connect With Me</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <a href="mailto:yourmail@gmail.com" className="hover:text-gray-300 transition-colors">📧 Email</a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">📸 Instagram</a>
                                <a href="https://whatsapp.com/channel/0029VafRwmJ2phHEOUGHMu2C" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">💬 WhatsApp</a>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">👍 Facebook</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used inside ThemeProvider");
    return context;
}