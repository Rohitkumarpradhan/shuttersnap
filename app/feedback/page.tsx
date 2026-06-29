"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useTheme } from "../ThemeProvider";

export default function Feedback() {
    const { darkMode } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [popup, setPopup] = useState({
        show: false,
        message: "",
        type: "info" as "success" | "error" | "info",
    });

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [website, setWebsite] = useState("");

    // Trigger entrance animation on load
    useEffect(() => {
        setMounted(true);
    }, []);
    const showPopup = (
        message: string,
        type: "success" | "error" | "info" = "info"
    ) => {
        setPopup({
            show: true,
            message,
            type,
        });

        setTimeout(() => {
            setPopup((prev) => ({
                ...prev,
                show: false,
            }));
        }, 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot Spam Check
        if (website) return;

        // Validation
        if (!form.name.trim()) {
            showPopup("Please enter your name", "error");
            return;
        }
        if (!form.email.trim()) {
            showPopup("Please enter your email", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            showPopup("Please enter a valid email address", "error");
            return;
        }
       
        // 2. 🔥 The Domain Sanitizer
        const emailParts = form.email.split("@");
        const domain = emailParts[1]?.toLowerCase();

        // If the domain contains "gm", "ya", "out", or "hot", but isn't spelled EXACTLY right:
        const majorProviders = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
        const looksLikeGmail = domain.includes("gm") || domain.includes("gai") || domain.includes("gmal");

        if (looksLikeGmail && domain !== "gmail.com") {
            showPopup(`Did you mean @gmail.com? (You typed @${domain})`, "info");
            return;
        }

        if (!form.message.trim()) {
            showPopup("Please enter a message", "error");
            return;
        }
        if (form.message.length < 10) {
            showPopup("Message must be at least 10 characters", "error");
            return;
        }

        // Rate Limiting (1 minute)
        const lastSubmit = localStorage.getItem("lastSubmit");
        if (lastSubmit && Date.now() - Number(lastSubmit) < 60000) {
            showPopup("Please wait 1 minute before sending another feedback.", "info");
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, "feedback"), {
                ...form,
                createdAt: new Date(),
            });

            localStorage.setItem("lastSubmit", Date.now().toString());

            // 🔥 NEW: Ping our Discord middleman silently in the background!
            fetch("/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }).catch((err) => console.error("Discord dispatch glitch:", err));
            showPopup("✅Feedback submitted successfully! 🎉", "success");

            setForm({
                name: "",
                email: "",
                message: "",
            });
        
        } catch (error) {
            console.error("Firebase Error:", error);
            showPopup("❌ Error submitting feedback. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

  
    return (
        <main
            className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-black text-white" : "bg-zinc-50 text-black"
                }`}
        >
            {/* HERO SECTION (Centered like Collections) */}
            <section
                className={`pt-36 pb-16 px-6 transition-all duration-1000 transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h1
                        className="
                            font-serif
                            text-6xl
                            sm:text-7xl
                            md:text-8xl
                            font-light
                            leading-none
                            tracking-tight
                        "
                    >
                        Feedback
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
                        I'd love to hear your thoughts about my photography.
                    </p>
                </div>
            </section>

            {/* FORM SECTION (Staggered Animation Delay) */}
            <section
                className={`max-w-xl mx-auto px-6 pb-24 transition-all duration-1000 delay-300 transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot Field */}
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        style={{ display: "none" }}
                    />

                    <div className="space-y-1.5">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={`w-full p-4 border rounded-xl outline-none transition-all duration-300 focus:ring-4 ${darkMode
                                    ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700 focus:ring-white/5"
                                    : "bg-white border-zinc-200 text-black placeholder-zinc-400 focus:border-black/20 focus:ring-black/5"
                                }`}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={`w-full p-4 border rounded-xl outline-none transition-all duration-300 focus:ring-4 ${darkMode
                                    ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700 focus:ring-white/5"
                                    : "bg-white border-zinc-200 text-black placeholder-zinc-400 focus:border-black/20 focus:ring-black/5"
                                }`}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <textarea
                            placeholder="Your Message"
                            maxLength={1000} // <-- Forces the keyboard to physically stop at 1,000 chars
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className={`w-full p-4 border rounded-xl outline-none h-40 resize-none transition-all duration-300 focus:ring-4 ${darkMode
                                    ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-700 focus:ring-white/5"
                                    : "bg-white border-zinc-200 text-black placeholder-zinc-400 focus:border-black/20 focus:ring-black/5"
                                }`}
                        />
                    </div>

                    {/* Upgraded Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 mt-2 rounded-xl transition-all duration-300 font-medium tracking-wide flex justify-center items-center gap-2
                            ${loading
                                ? "opacity-60 cursor-not-allowed"
                                : "hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            }
                            ${darkMode
                                ? "bg-white text-black hover:bg-zinc-200"
                                : "bg-black text-white hover:bg-zinc-800"
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            "Submit Feedback"
                        )}
                    </button>
                </form>
                {
                    popup.show && (
                        <div
                            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-xl shadow-2xl text-white transition-all duration-300
        ${popup.type === "success"
                                    ? "bg-green-600"
                                    : popup.type === "error"
                                        ? "bg-red-600"
                                        : "bg-zinc-900"
                                }`}
                        >
                            {popup.message}
                        </div>
                    )
                }
            </section>
        </main>
    );
}