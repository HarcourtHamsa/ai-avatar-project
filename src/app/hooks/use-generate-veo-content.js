import { useMutation } from "@tanstack/react-query";

export const useGenerateVeoContent = (options = {}) => {
  const pollForCompletion = async (
    name,
    maxAttempts = 30,
    interval = 30000 // 30 seconds in milliseconds
  ) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, interval));

      const statusResponse = await fetch(`/api/veo/status`, {
        method: "POST",
        body: JSON.stringify({ operationName: name }),
      });

      if (!statusResponse.ok) {
        const statusError = await statusResponse.json();
        throw new Error(
          statusError.message || "Failed to check video generation status"
        );
      }

      const statusData = await statusResponse.json();

      if (statusData?.data.done) {
        console.log(`Attempt ${attempt + 1}: Status is done`);
        return statusData.data.response;
      }

      console.log(`Attempt ${attempt + 1}: Status is pending`);
    }

    throw new Error("Video generation timed out. Please try again.");
  };

  return useMutation({
    mutationFn: async (payload) => {
      const response = await fetch("/api/veo/generate-video", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate video");
      }

      const result = await response.json();

      const statusData = await pollForCompletion(result.data.name);
      return statusData;
    },
    ...options,
  });
};
