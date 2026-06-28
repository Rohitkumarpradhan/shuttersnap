"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@/app/ThemeProvider";

interface CloudinaryImage {
    asset_id: string;
    secure_url: string;
}

export default function GalleryPage() {
    const { darkMode } = useTheme();
    const params = useParams();
    const category = params.category as string;

    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Create a reference to the native dialog element
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        async function loadImages() {
            if (!category) return;
            try {
                const res = await fetch(`/api/gallery/${category}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setImages(data);
                } else {
                    console.error("Invalid API response:", data);
                }
            } catch (error) {
                console.error("Error loading images:", error);
            }
        }
        loadImages();
    }, [category]);

    // Handle opening and closing the native modal
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (selectedImage) {
            dialog.showModal(); // Forces it into the browser's Top Layer
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            dialog.close();
            document.body.style.overflow = 'unset';
        }

        // Cleanup function
        return () => { document.body.style.overflow = 'unset'; }
    }, [selectedImage]);

    const getThumbnail = (url: string) =>
        url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,w_700,h_900,c_limit/"
        );

    const getLarge = (url: string) => {
        if (!url) return "";
        // c_fit ensures the whole image is visible and fits within 1200x800 without cropping
        return url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,c_fit,w_1200,h_800/"
        );
    };
    return (
        <main
            className={`min-h-screen transition-colors duration-300 ${darkMode
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
        >
            <section className="pt-12 pb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-serif capitalize tracking-wide">
                    {category}
                </h1>
              
            </section>


            <section className="max-w-[1600px] mx-auto px-6 pb-24">
                <div
                    style={{
                        columnCount: 4,
                        columnGap: "20px",
                    }}
                >

                    {images.map((img) => (
                        <div
                            key={img.asset_id}
                            style={{
                                breakInside: "avoid",
                                marginBottom: "20px",
                            }}
                            className="overflow-hidden rounded-2xl bg-zinc-900 group"
                        >
                            <img
                                src={getThumbnail(img.secure_url)}
                                alt=""
                                loading="lazy"
                                onClick={() => setSelectedImage(img.secure_url)}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* THE NATIVE DIALOG */}
            <dialog
                ref={dialogRef}
                // Hitting the "ESC" key natively triggers onClose
                onClose={() => setSelectedImage(null)}
                // The ::backdrop pseudo-element handles the dark overlay
                className="bg-transparent m-auto p-0 outline-none border-none backdrop:bg-black/95 backdrop:backdrop-blur-md w-screen h-screen flex items-center justify-center max-w-none max-h-none"
            >
                {/* INLINE CSS NUCLEAR OPTION */}
                {/* The Lightbox Modal */}
                {selectedImage && (
                    <div
                        // Inline styles guarantee it overrides your layout.tsx Navbar
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.9)",
                            zIndex: 999999, // Forces it above the SHUTTERSNAP header
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2rem"
                        }}
                        onClick={() => setSelectedImage(null)} // Clicking background closes it
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: "absolute",
                                top: "20px",
                                right: "30px",
                                color: "white",
                                fontSize: "3rem",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            ×
                        </button>

                        <img
                            src={getLarge(selectedImage)}
                            alt="Selected"
                            // Stop clicks on the image from closing the background
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "85vh",
                                objectFit: "contain",
                                borderRadius: "8px",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
                            }}
                        />
                    </div>
                )}
            </dialog>
        </main>
    );
}