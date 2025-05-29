import { Collections, QueryKeys } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useFirestore } from "./use-firestore";
import { auth } from "@/lib/firebase";

export const useFetchSavedAvatars = () => {
  const { getDocuments } = useFirestore();

  return useQuery({
    queryKey: [QueryKeys.savedAvatars],
    queryFn: async () => {
      const response = await getDocuments(Collections.savedAvatars, [
        {
          type: "where",
          field: "uid",
          operator: "==",
          value: auth.currentUser.uid,
        },
      ]);

      return response;
    },
  });
};
