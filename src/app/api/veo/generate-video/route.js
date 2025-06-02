export async function POST(request) {
  const API_URL = process.env.VEO_API_URL;
  const PROJECT_ID = process.env.GCLOUD_PROJECT_ID;
  const MODEL_ID = process.env.VEO_MODEL_ID;
  const ACCESS_TOKEN = process.env.GCLOUD_ACCESS_TOKEN;

  const body = await request.json();

  try {
    const response = await fetch(
      `${API_URL}/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predictLongRunning`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("API response:", response);

    if (!response.ok) {
      const errorText = await response.text();

      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to video",
          error: errorText,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Video generation successful",
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
