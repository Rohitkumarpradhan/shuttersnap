import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ folder: string }> }
) {
    try {
        const { folder } = await params;

        const result = await cloudinary.search
            .expression(`folder="shuttersnap/${folder}"`)
            .sort_by("created_at", "desc")
            .max_results(100)
            .execute();

        return NextResponse.json(result.resources);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }
}