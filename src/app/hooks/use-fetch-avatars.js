import { QueryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";

export const useFetchAvatars = () => {
  return useQuery({
    queryKey: [QueryKeys.defaultAvatars],
    queryFn: async () => {
      const response = await fetch("/api/avatars");

      if (!response.ok) {
        throw new Error("Failed to fetch avatars");
      }
      const data = await response.json();
      return data.data;
    },
  });
};
