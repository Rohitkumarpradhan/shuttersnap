// app/api/homepage/route.ts
import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";

// 🔥 THIS IS THE MAGIC LOCKER: 3600 seconds = exactly 1 Hour
export const revalidate = 3600;
const CONSTANT_HERO = "https://res.cloudinary.com/dasntfhtt/image/upload/v1780417089/DSC_0830_fbyck3.jpg?v=2";
export async function GET() {
    try {
        // By removing 'prefix', Cloudinary pulls the top 40 images from your ENTIRE library
        const results = await cloudinary.api.resources({
            type: "upload",
            max_results: 40,
        });

        const imageUrls = results.resources.map((file: any) => file.secure_url);

        return NextResponse.json({
            hero: CONSTANT_HERO,
            collections: [
                {
                    name: "Featured Gallery",
                    slug: "all",
                    images: imageUrls,
                },
            ],
        });
    } catch (error: any) {
        console.error("API Route Crash Details:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch Cloudinary assets" },
            { status: 500 }
        );
    }
}