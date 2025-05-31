export async function GET(request) {
  const API_KEY = process.env.HYGEN_API_KEY;
  const API_URL = process.env.HYGEN_API_URL;
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const response = await fetch(`${API_URL}/photo_avatar/train/status/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      const payload = {
        message: "Failed to get status",
        success: false,
      };

      return new Response(JSON.stringify(payload), { status: response.status });
    }

    const data = await response.json();

    const payload = {
      message: "Status fetched successfully",
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
