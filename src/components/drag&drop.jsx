import React, { useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    setError(null);

    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      setError("Only image files are allowed.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleFileInputChange = (event) => {
    setError(null);

    const files = event.target.files ? Array.from(event.target.files) : [];
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      setError("Only image files are allowed.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-gray-600">
          Drag and drop your images here, or click to select files
        </p>
        <input
          type="file"
          accept="image/*"
          single
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold mb-2">Uploaded Images:</h3>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-32 object-cover rounded-lg shadow"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
