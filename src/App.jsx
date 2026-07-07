import React, { useEffect } from 'react';
import { AppRoutes } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster, toast } from 'react-hot-toast';

function App() {
  
  // Global interceptor to make all mock buttons feel functional
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const button = e.target.closest('button');
      if (button) {
        // Ignore buttons that already have specific logic (submit, explicitly functional, or sidebar toggles)
        if (button.type === 'submit') return;
        if (button.classList.contains('functional-btn')) return;
        
        // Ensure we don't intercept React Router Link buttons or explicit nav buttons
        if (button.closest('a')) return;
        
        // Try to get a meaningful name from the button text
        let btnText = button.textContent.trim() || 'Action';
        if (btnText.length > 25) btnText = btnText.substring(0, 25) + '...';
        
        // Show a nice generic toast for the demo
        toast.success(`${btnText} initiated successfully.`, {
          icon: '🚀',
          id: `global-btn-${btnText}` // prevent spamming the exact same toast
        });
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="business-brain-theme">
      <AppRoutes />
      <Toaster position="top-right" toastOptions={{
        className: '!bg-[#0B1120] !text-white !border !border-white/10 !shadow-2xl',
        style: { borderRadius: '12px', background: '#0B1120', color: '#fff' }
      }} />
    </ThemeProvider>
  );
}

export default App;
