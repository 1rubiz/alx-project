import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { FaDownload } from 'react-icons/fa'

const CustomQuote = ({ componentRef }) => {
  

  const handleDownload = async () => {
    if (componentRef.current) {
      try {
        const dataUrl = await toPng(componentRef.current);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'component-image.png';
        link.click();
      } catch (error) {
        console.error('Failed to generate image:', error);
      }
    } else {
      console.log('no image ref')
    }
  };

  return (
    <div>
      {/* Component to be converted */}
      {/* <div ref={componentRef} style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h1>Hello, World!</h1>
        <p>This component will be converted to an image.</p>
      </div>*/}

      {/* Button to trigger download */}
      <button
        onClick={handleDownload}
        className='flex items-center px-6 gap-4'
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        <FaDownload /> Download
      </button>
    </div>
  );
};

export default CustomQuote;
