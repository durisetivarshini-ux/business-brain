import React, { useRef } from 'react';
import { Paperclip } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function FileUpload({ onFileSelected }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB).`);
        continue;
      }

      // If it's an image, convert to Base64 for Gemini InlineData
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result.split(',')[1];
          onFileSelected({
            name: file.name,
            type: file.type,
            inlineData: {
              data: base64Data,
              mimeType: file.type
            }
          });
        };
        reader.readAsDataURL(file);
      } 
      // If it's a text/csv file, read as text
      else if (file.type.startsWith('text/') || file.type === 'application/json' || file.name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onFileSelected({
            name: file.name,
            type: 'text/plain',
            textData: `\n\n--- Contents of ${file.name} ---\n${event.target.result}\n--- End of ${file.name} ---\n`
          });
        };
        reader.readAsText(file);
      } else {
        toast.error(`Unsupported file type: ${file.type || file.name}`);
      }
    }
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        multiple 
        accept="image/*, .pdf, .txt, .csv, .json"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-lg hover:bg-white/5 text-[#94A3B8] hover:text-white transition-all"
        title="Upload File (Image, PDF, CSV, Text)"
      >
        <Paperclip size={20} />
      </button>
    </>
  );
}
