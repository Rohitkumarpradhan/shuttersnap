import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            return NextResponse.json({ error: "No webhook configured" }, { status: 500 });
        }

        // High-end Discord Embed Styling
        const discordPayload = {
            content: "🚨 **New Portfolio Submission!**",
            username: "SHUTTERSNAP Portal",
            avatar_url: "https://res.cloudinary.com/dasntfhtt/image/upload/v1782670020/DSC_0538_vpxwk1.jpg",
            embeds: [
                {
                    title: "📸 New Portfolio Feedback Received!",
                    color: 16777215, // Crisp Editorial White
                    fields: [
                        { name: "👤 Client Name", value: `**${name}**`, inline: true },
                        { name: "📧 Client Email", value: `[${email}](mailto:${email})`, inline: true },
                        { name: "💬 Message", value: `> ${message}` }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: "SHUTTERSNAP Firebase Vault" }
                }
            ]
        };

        const discordResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordPayload),
        });

        // Basic error catch just in case Discord goes offline
        if (!discordResponse.ok) {
            throw new Error(`Discord API responded with status: ${discordResponse.status}`);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Discord Notify Error:", error);
        return NextResponse.json({ error: "Failed to fire webhook" }, { status: 500 });
    }
}