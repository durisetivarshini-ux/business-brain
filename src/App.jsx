import { AppRoutes } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from 'react-hot-toast';

function App() {
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
