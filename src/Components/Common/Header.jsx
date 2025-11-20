'use client';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="lg:ml-80 text-center py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun w-6 lg:w-6 h-6 lg:h-6">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon w-6 lg:w-6 h-6 lg:h-6">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
          </button>
          <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-6 lg:w-6 h-6 lg:h-6 text-indigo-400"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;