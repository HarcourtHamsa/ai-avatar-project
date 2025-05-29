export async function POST(request) {
  const API_KEY = process.env.HYGEN_API_KEY;
  const API_URL = "https://upload.heygen.com/v1/asset";

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
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid file" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Convert File to ArrayBuffer, then to Buffer for the request
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": file.type || "image/jpeg", // Default to image/jpeg as in CURL
      },
      body: buffer, // Use buffer instead of stream
    });

    console.log("Upload response status:", uploadResponse.status);

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Upload failed:", errorText);

      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to upload avatar",
          error: errorText,
        }),
        {
          status: uploadResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await uploadResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Avatar uploaded successfully",
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Upload error:", error);

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
