export async function POST(request) {
  const API_KEY = process.env.HYGEN_API_KEY;
  const API_URL = process.env.HYGEN_API_URL;
  const body = await request.json();

  try {
    const response = await fetch(`${API_URL}/photo_avatar/photo/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const payload = {
        message: "Failed to generate avatar",
        success: false,
      };
      return new Response(JSON.stringify(payload), { status: response.status });
    }

    const data = await response.json();

    const payload = {
      message: "Avatars generated successfully",
      success: true,
      data: data?.data,
    };

    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (error) {
    const payload = {
      message: error.message,
      success: false,
    };
    return new Response(JSON.stringify(payload), { status: 500 });
  }
}
