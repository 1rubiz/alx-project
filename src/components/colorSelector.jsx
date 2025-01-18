import React from 'react';

const ColorSelector = ({ selectedColor, setSelectedColor, isLightColor }) => {
  // Predefined color palette with hex values
  const colorPalette = [
    { hex: '#FFFFFF', name: 'White' },
    { hex: '#FF6B6B', name: 'Coral Red' },
    { hex: '#4ECDC4', name: 'Medium Turquoise' },
    { hex: '#45B7D1', name: 'Sky Blue' },
    { hex: '#96CEB4', name: 'Sage Green' },
    { hex: '#FFEEAD', name: 'Cream Yellow' },
    { hex: '#000000', name: 'black' },
  ];

  // Sample div to show selected color
  const previewStyle = {
    backgroundColor: selectedColor || colorPalette[0].hex,
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 my-2 bg-white/10 backdrop-blur-lg rounded-md p-2">
      {/* Color palette */}
      <div className="flex flex-wrap gap-4 justify-between md:justify-center">
        {colorPalette.map((color) => (
          <button
            key={color.hex}
            onClick={() => setSelectedColor(color.hex)}
            className={`w-6 h-6 md:w-8 lg:w-12 md:h-8 lg:h-12 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${selectedColor === color.hex ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
            aria-label={`Select ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;