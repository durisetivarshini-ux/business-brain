import React from 'react';

export function GlowEffect({ className = "", color = "#5B5FFF", blur = "100px", opacity = "0.15" }) {
  return (
    <div 
      className={`absolute pointer-events-none rounded-full ${className}`}
      style={{
        background: color,
        filter: `blur(${blur})`,
        opacity: opacity,
        zIndex: 0
      }}
    />
  );
}
