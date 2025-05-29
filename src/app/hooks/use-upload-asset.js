import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadAsset = (options = {}) => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/avatars/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload asset");
      }

      const data = await response.json();
      return data.data;
    },
    ...options,
  });
};
