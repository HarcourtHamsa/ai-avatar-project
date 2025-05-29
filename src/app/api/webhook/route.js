import crypto from "crypto";

export async function POST(request) {
  const whSecret = process.env.HEYGEN_WEBHOOK_SECRET;

  if (!whSecret) {
    console.error("HEYGEN_WEBHOOK_SECRET not configured");
    return Response.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  try {
    // Get raw body and signature
    const rawBody = await request.arrayBuffer();
    const bodyBuffer = Buffer.from(rawBody);
    const contentStr = bodyBuffer.toString("utf-8");
    const signature =
      request.headers.get("signature") || request.headers.get("x-signature");

    if (!signature) {
      return Response.json(
        { error: "Missing signature header" },
        { status: 400 }
      );
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", whSecret);
    hmac.update(bodyBuffer);
    const computedSignature = hmac.digest("hex");

    // Handle different signature formats
    const receivedSignature = signature.startsWith("sha256=")
      ? signature.slice(7)
      : signature;

    if (
      !crypto.timingSafeEqual(
        Buffer.from(computedSignature, "hex"),
        Buffer.from(receivedSignature, "hex")
      )
    ) {
      console.error("Invalid signature received");
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the webhook payload
    let parsedData;
    try {
      parsedData = JSON.parse(contentStr);
    } catch (parseError) {
      console.error("Failed to parse webhook payload:", parseError);
      return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const { event_type: eventType, event_data: eventData } = parsedData;

    console.log(`Webhook received - Event Type: ${eventType}`);
    console.log("Event Data:", JSON.stringify(eventData, null, 2));

    // Handle different event types
    switch (eventType) {
      case "avatar.completed":
        console.log("Avatar generation completed:", eventData);
        // Add your avatar completion logic here
        break;

      case "avatar.failed":
        console.error("Avatar generation failed:", eventData);
        // Add your error handling logic here
        break;

      case "video.completed":
        console.log("Video generation completed:", eventData);
        // Add your video completion logic here
        break;

      case "video.failed":
        console.error("Video generation failed:", eventData);
        // Add your error handling logic here
        break;

      default:
        console.log("Unknown event type:", eventType);
    }

    return Response.json({
      message: "Webhook processed successfully",
      eventType,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
