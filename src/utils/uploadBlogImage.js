import axios from "axios";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const uploadBlogImage = async (file, token) => {
  if (!file || !file.type || !ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only PNG, JPEG and WEBP images are allowed.");
  }

  const data = new FormData();
  data.append("image", file);

  const backend = import.meta.env.VITE_BACKEND_URL;

  const res = await axios.post(`${backend}/api/blog/upload-image`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.url;
};