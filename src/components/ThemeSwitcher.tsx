import React from 'react';
import { ThemeType } from '../types';
import { Palette, Sun, Briefcase } from 'lucide-react';

interface Props {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeSwitcher: React.FC<Props> = ({ currentTheme, setTheme }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <div className="bg-white/90 backdrop-blur shadow-lg rounded-2xl p-2 flex flex-col gap-2 border border-gray-200">
        <button
          onClick={() => setTheme(ThemeType.POP)}
          className={`p-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs ${
            currentTheme === ThemeType.POP 
              ? 'bg-yellow-400 text-black shadow-md scale-105' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <Palette size={18} /> POP
        </button>
        <button
          onClick={() => setTheme(ThemeType.TROPICAL)}
          className={`p-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs ${
            currentTheme === ThemeType.TROPICAL
              ? 'bg-cyan-400 text-white shadow-md scale-105' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <Sun size={18} /> OCEAN
        </button>
        <button
          onClick={() => setTheme(ThemeType.TRUST)}
          className={`p-3 rounded-xl transition-all flex items-center gap-2 font-bold text-xs ${
            currentTheme === ThemeType.TRUST
              ? 'bg-slate-700 text-white shadow-md scale-105' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <Briefcase size={18} /> TRUST
        </button>
      </div>
    </div>
  );
};