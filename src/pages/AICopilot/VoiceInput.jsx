import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

export function VoiceInput() {
  const [isListening, setIsListening] = useState(false);

  return (
    <button
      onClick={() => setIsListening(!isListening)}
      className={`p-2 rounded-lg transition-all ${isListening ? 'bg-rose-500/20 text-rose-500 relative' : 'hover:bg-white/5 text-[#94A3B8] hover:text-white'}`}
      title="Voice Input"
    >
      {isListening ? (
        <>
          <MicOff size={20} className="relative z-10" />
          <span className="absolute inset-0 rounded-lg border border-rose-500 animate-ping opacity-50" />
        </>
      ) : (
        <Mic size={20} />
      )}
    </button>
  );
}
