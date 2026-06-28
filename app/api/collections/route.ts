// app/api/collections/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export const revalidate = 1800; // 30 minutes

interface CollectionData {
    name: string;
    count: number;
    recentPhotos: string[]; // <-- Upgraded to hold a pool of photos!
}

export async function GET() {
    try {
        const result = await cloudinary.api.resources({
            type: "upload",
            resource_type: "image",
            max_results: 500,
            direction: "desc", // 🔥 Fixes Sticky Note 2: Grabs newest uploads first!
        });

        const collections: Record<string, CollectionData> = {};

        result.resources.forEach((image: any) => {
            // 🔥 Fixes Sticky Note 1: Fallback chain checks all possible Cloudinary SDK properties
            const rawPath = image.asset_folder || image.folder || image.public_id;
            if (!rawPath || !rawPath.includes("shuttersnap/")) return;

            // Safely extracts the folder name (e.g., "nature")
            const folder = rawPath.split("shuttersnap/")[1].split("/")[0];
            if (!folder) return;

            if (!collections[folder]) {
                collections[folder] = {
                    name: folder.charAt(0).toUpperCase() + folder.slice(1), // Capitalized
                    count: 0,
                    recentPhotos: [],
                };
            }

            collections[folder].count++;

            // Collect up to 5 recent photos per category so the UI can choose the best cover!
            if (collections[folder].recentPhotos.length < 5) {
                collections[folder].recentPhotos.push(image.secure_url);
            }
        });

        return NextResponse.json(Object.values(collections));
    } catch (err) {
        console.error("Collections API Error:", err);
        return NextResponse.json(
            { error: "Failed to load collections" },
            { status: 500 }
        );
    }
}