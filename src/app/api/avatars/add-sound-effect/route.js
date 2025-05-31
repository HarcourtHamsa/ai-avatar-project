export async function POST(request) {
  const API_KEY = process.env.HYGEN_API_KEY;
  const API_URL = process.env.HYGEN_API_URL;
  const body = await request.json();

  if (!API_KEY) {
    return new Response(
      JSON.stringify({ success: false, message: "API key not found" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const response = await fetch(`${API_URL}/photo_avatar/add_sound_effect`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();

      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to add sound effect",
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
        message: "Sound effect added successfully",
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
