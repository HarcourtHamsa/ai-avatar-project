import { Collections, QueryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useFirestore } from "./use-firestore";

export const useFetchDefaultAvatars = () => {
  const { getDocuments } = useFirestore();

  return useQuery({
    queryKey: [QueryKeys.defaultAvatars],
    queryFn: async () => {
      const response = await getDocuments(Collections.defaultAvatars);
      return response;
    },
  });
};
