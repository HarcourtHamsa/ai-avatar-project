import { QueryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const useFetchGenerationStatus = (id) => {
  return useQuery({
    queryKey: [QueryKeys.generationStatus, id],
    queryFn: async () => {
      const response = await fetch(`/api/avatars/generate/status?id=${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }
      const data = await response.json();
      return data.data;
    },
  });
};
