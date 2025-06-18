import React, { useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onImagesChange,
  maxImages = 3,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const newImages: string[] = [];

    try {
      for (
        let i = 0;
        i < Math.min(files.length, maxImages - images.length);
        i++
      ) {
        const base64 = await convertToBase64(files[i]);
        newImages.push(base64);
      }

      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-3">
      {/* Upload Button */}
      {images.length < maxImages && (
        <label className="cursor-pointer inline-block">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
          <div
            className={`
            px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg 
            hover:border-blue-400 transition-colors text-center text-sm
            ${
              isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50"
            }
          `}
          >
            {isUploading ? "Duke ngarkuar..." : "+ Shto imazh"}
          </div>
        </label>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-16 object-cover rounded border"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                type="button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image count info */}
      <div className="text-xs text-gray-500">
        {images.length}/{maxImages} imazhe
      </div>
    </div>
  );
};

export default ImageUploader;
