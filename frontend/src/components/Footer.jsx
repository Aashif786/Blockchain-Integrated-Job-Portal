
import { useTheme } from "../App";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t mt-auto transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/50 border-gray-700' 
        : 'bg-white/50 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JB</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                JobBoard
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Connect talented professionals with amazing opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Dashboard', 'Browse Jobs', 'Post Job', 'Profile'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className={`block text-sm transition-colors duration-200 ${
                    isDark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              {['Help Center', 'Contact Us', 'FAQ', 'Terms'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className={`block text-sm transition-colors duration-200 ${
                    isDark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {['💙', '🐦', '📧', '💼'].map((icon, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t text-center text-sm ${
          isDark 
            ? 'border-gray-700 text-gray-400' 
            : 'border-gray-200 text-gray-600'
        }`}>
          <p>&copy; 2024 JobBoard. All rights reserved. Built with ❤️ on Replit</p>
        </div>
      </div>
    </footer>
  );
}
