import { useMutation } from "@tanstack/react-query";

export const useGenerateAvatarVideo = (options = {}) => {
  const pollForCompletion = async (
    videoId,
    maxAttempts = 30,
    interval = 60000 // 1 minute
  ) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, interval));

      const statusResponse = await fetch(
        `/api/avatars/generate/video/status?id=${videoId}`
      );

      if (!statusResponse.ok) {
        const statusError = await statusResponse.json();
        throw new Error(
          statusError.message || "Failed to check video  generation status"
        );
      }

      const statusData = await statusResponse.json();
      const status = statusData.data?.status;

      console.log(`Attempt ${attempt + 1}: Status is ${status}`);

      if (status === "completed" || status === "success") {
        return statusData;
      }

      if (status === "failed" || status === "error") {
        throw new Error(statusData.data?.msg || "Avatar generation failed");
      }
    }

    throw new Error("Avatar generation timed out. Please try again.");
  };

  return useMutation({
    mutationFn: async (payload) => {
      const response = await fetch("/api/avatars/generate/video", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          dimension: {
            width: 1280,
            height: 720,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate video");
      }

      const generateData = await response.json();
      const { video_id: videoId } = generateData.data.data;

      console.log("Video ID:", videoId);

      const statusData = await pollForCompletion(videoId);
      return statusData;
    },
    ...options,
  });
};
