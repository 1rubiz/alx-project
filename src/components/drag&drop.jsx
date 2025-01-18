import React, { useState } from 'react';

const ImageUpload = ({ image, setImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <div
        className={`relative h-36 bg-white/10 backdrop-blur-lg rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
          id="fileInput"
        />
        
        {!image && (
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="text-4xl mb-2">📁</div>
            <p className="text-sm text-white text-center">
              Drag and drop an image here, or click here to add custom background image
            </p>
          </label>
        )}
        
        {image && (
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-60 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
            <label
              htmlFor="fileInput"
              className="text-white cursor-pointer"
            >
              Change Image
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;