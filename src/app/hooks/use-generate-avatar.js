import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFirestore } from "./use-firestore";
import { nanoid } from "nanoid";

export const useGenerateAvatar = (options = {}) => {
  const queryClient = useQueryClient();
  const { addDocument } = useFirestore();

  const pollForCompletion = async (
    generationId,
    maxAttempts = 30,
    interval = 60000 // 1 minute
  ) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, interval));

      const statusResponse = await fetch(
        `/api/avatars/generate/status?id=${generationId}`
      );

      if (!statusResponse.ok) {
        const statusError = await statusResponse.json();
        throw new Error(
          statusError.message || "Failed to check avatar generation status"
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
      const generateResponse = await fetch("/api/avatars/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          name: nanoid(),
          gender: "Unspecified",
          age: "Unspecified",
          ethnicity: "Unspecified",
          orientation: "vertical",
          pose: "half_body",
          style: "Realistic",
        }),
      });

      if (!generateResponse.ok) {
        console.log("API Response:", generateResponse);
        const error = await generateResponse.json();
        throw new Error(error.message || "Failed to generate avatar");
      }

      const generateData = await generateResponse.json();
      const { generation_id: generationId } = generateData.data;

      const statusData = await pollForCompletion(generationId);
      return statusData;
    },
    ...options,
  });
};
