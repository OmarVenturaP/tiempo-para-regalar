"use client";
import { useState } from 'react';

export default function ImageUploader({ onUploadSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
      }
    } catch (error) {
      console.error("Error subiendo imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleUpload}
        accept="image/*"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer text-sm font-bold text-regalo-rosa hover:text-regalo-azul-r"
      >
        {loading ? "Subiendo..." : "Subir imagen"}
      </label>
    </div>
  );
}
