import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFirestore } from "./use-firestore";
import { auth } from "@/lib/firebase";
import { Collections } from "@/constants";

export const useUploadAsset = () => {
  const query = useQueryClient();
  const { addDocument } = useFirestore();

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
    onSuccess: async (data) => {
      await addDocument(Collections.savedAvatars, {
        ...data.data,
        uid: auth.currentUser.uid,
      });

      query.invalidateQueries({ queryKey: [Collections.savedAvatars] });
    },
  });
};
