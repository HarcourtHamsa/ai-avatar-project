export async function POST(request) {
  const API_KEY = process.env.HYGEN_API_KEY;
  const API_URL = process.env.HYGEN_API_URL;
  const body = await request.json();

  console.log("Request Body: ", body);

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
    const response = await fetch(
      `${API_URL}/photo_avatar/avatar_group/create`,
      {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("API Response: ", response.status);

    if (!response.ok) {
      const errorText = await response.text();

      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to create avatar group",
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
        message: "Avatar group created",
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
