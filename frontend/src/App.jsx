
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobFeed from "./pages/JobFeed";
import PostJob from "./pages/PostJob";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const isAuthPage = (pathname) => {
    return pathname === '/' || pathname === '/register';
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <BrowserRouter>
        <div className={`min-h-screen transition-all duration-500 ${
          isDark 
            ? 'bg-slate-900 text-white' 
            : 'bg-gray-50 text-slate-900'
        }`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <div className={`flex flex-col min-h-screen ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-black' 
                  : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
              }`}>
                <Navbar />
                <main className="flex-1 animate-fadeIn">
                  <Dashboard />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/jobs" element={
              <div className={`flex flex-col min-h-screen ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-black' 
                  : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
              }`}>
                <Navbar />
                <main className="flex-1 animate-fadeIn">
                  <JobFeed />
                </main>
                <Footer />
              </div>
            } />
            <Route path="/post-job" element={
              <div className={`flex flex-col min-h-screen ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-black' 
                  : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
              }`}>
                <Navbar />
                <main className="flex-1 animate-fadeIn">
                  <PostJob />
                </main>
                <Footer />
              </div>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
