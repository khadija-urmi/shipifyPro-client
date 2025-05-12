import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const uploadImageToServer = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const image_hosting_key = import.meta.env.VITE_ImgApiKey;

  try {
    const { data } =
      await axios.post(`https://api.imgbb.com/1/upload?key=${image_hosting_key}`, formData);

    return data.data.display_url
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};