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
