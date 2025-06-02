import { AvatarSource } from "@/constants";

export function extractNumber(text) {
  const match = text.match(/\d+$/);
  return match ? Number(match[0]) : null;
}

export function getImageData(data, index) {
  if (
    index < 0 ||
    index >= data.image_url_list.length ||
    index >= data.image_key_list.length
  ) {
    return null;
  }

  return {
    id: data.id,
    image_key: data.image_key_list[index],
    image_url: data.image_url_list[index],
    source: AvatarSource.generated,
  };
}

export const convertImageUrlToBase64 = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();
    const mimeType = blob.type;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve({
          bytesBase64Encoded: base64String,
          mimeType: mimeType,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw error;
  }
};

export const convertBase64ToVideoUrl = (
  base64String,
  mimeType = "video/mp4"
) => {
  try {
    // Convert base64 to binary
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create blob
    const blob = new Blob([bytes], { type: mimeType });

    // Create object URL
    const videoUrl = URL.createObjectURL(blob);

    return videoUrl;
  } catch (error) {
    console.error("Error converting base64 to video URL:", error);
    throw error;
  }
};
