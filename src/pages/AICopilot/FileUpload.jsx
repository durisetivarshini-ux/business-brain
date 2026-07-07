import React, { useRef } from 'react';
import { Paperclip } from 'lucide-react';

export function FileUpload() {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    // In a real app, handle the file
    console.log(e.target.files);
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        multiple 
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-lg hover:bg-white/5 text-[#94A3B8] hover:text-white transition-all"
        title="Upload File or Image"
      >
        <Paperclip size={20} />
      </button>
    </>
  );
}
