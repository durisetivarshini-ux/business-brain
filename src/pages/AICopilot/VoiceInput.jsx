import React, { useState } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function VoiceInput({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error('Voice input is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);
    toast.success('Listening… speak now!', { icon: '🎙️', duration: 2000 });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onTranscript) onTranscript(transcript);
      setIsListening(false);
      toast.success(`Captured: "${transcript}"`, { icon: '✅' });
    };

    recognition.onerror = (e) => {
      setIsListening(false);
      if (e.error !== 'aborted') {
        toast.error(`Voice error: ${e.error}. Check microphone permissions.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <button
      type="button"
      onClick={handleVoice}
      title={isListening ? 'Stop listening' : 'Voice input'}
      className={`relative p-2 rounded-lg transition-all ${
        isListening
          ? 'bg-rose-500/20 text-rose-400'
          : 'hover:bg-white/5 text-[#94A3B8] hover:text-white'
      }`}
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
