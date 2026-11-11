export async function onRequestGet({ env }) {
    const placeId = "ChIJYZ587-At30cRDmFp82xBGlM";
    const apiKey = env.GOOGLE_API_KEY;

    try {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}`,
            {
                headers: {
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "reviews",
                },
            }
        );
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Reviews fetch error:", error);
        return Response.json({ error: "Failed to load reviews" }, { status: 500 });
    }
}
