import React from 'react';

// A simple markdown renderer to handle bold and lists correctly.
// In a real app, you would use 'react-markdown'.

export function MarkdownViewer({ content }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-bold text-white mt-4 mb-2">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('* **')) {
          const parts = line.split('**');
          return (
            <div key={index} className="flex items-start gap-2 ml-2">
              <span className="text-[#00D4FF] mt-1">•</span>
              <span>
                <span className="font-bold text-white">{parts[1]}</span>
                {parts[2]}
              </span>
            </div>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-bold text-white mt-2">{line.replace(/\*\*/g, '')}</p>;
        }
        if (line.startsWith('**') && line.includes('**:')) {
          const parts = line.split('**');
          return <p key={index} className="mt-4"><span className="font-bold text-white">{parts[1]}</span>{parts[2]}</p>;
        }
        if (line.trim() === '') {
          return <div key={index} className="h-2" />;
        }
        
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
}
