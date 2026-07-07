import React from 'react';
import toast from 'react-hot-toast';

export function FunctionalButton({ 
  children, 
  onClick, 
  className, 
  actionName = 'Action', 
  successMessage = 'Success!',
  loadingMessage = 'Processing...',
  delay = 800,
  ...props 
}) {
  const handleClick = async (e) => {
    if (onClick) {
      onClick(e);
      return;
    }

    // Default simulation if no explicit onClick is provided
    const promise = new Promise((resolve) => setTimeout(resolve, delay));
    
    toast.promise(promise, {
      loading: loadingMessage,
      success: successMessage,
      error: 'Failed to complete action.',
    });

    await promise;
  };

  return (
    <button onClick={handleClick} className={`functional-btn ${className}`} {...props}>
      {children}
    </button>
  );
}
