import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { FaDownload } from 'react-icons/fa'
import toast from 'react-hot-toast';


const CustomQuote = ({ componentRef }) => {
  

  const handleDownload = async () => {
    if (componentRef.current) {
      try {
        toast.loading('Processing...', 3000)
        const dataUrl = await toPng(componentRef.current);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'quote.png';
        link.click();
        toast.success('Download successful')
      } catch (error) {
        console.error('Failed to generate image:', error);
        toast.error('Download Failed')
      }
    } else {
      console.log('no image ref')
    }
  };

  return (
    <div>
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
