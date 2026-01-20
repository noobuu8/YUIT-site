import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeType } from '../../types';
import { MENU_ITEMS, SOCIAL_LINKS } from '../../constants';
import { Logo } from '../Logo';
import { Menu, X, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_URL } from '../../config/images';
import { handleImageError } from '../../lib/utils';
import { ScrollToTop } from '../ui/ScrollToTop';
import { TikTokIcon } from '../icons/TikTokIcon';
import { NoteIcon } from '../icons/NoteIcon';

export const Layout = ({ children, theme }: { children?: React.ReactNode, theme: ThemeType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.pathname !== '/') {
        window.scrollTo(0,0);
    }
  }, [location]);

  const isPop = theme === ThemeType.POP;
  const isTropical = theme === ThemeType.TROPICAL;

  const headerClass = isPop
    ? "bg-white border-b-4 border-black sticky top-0 z-50 transition-all"
    : isTropical
      ? "fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10 text-white transition-all"
      : "bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm opacity-95 backdrop-blur transition-all";

  const linkClass = isPop
    ? "font-black hover:text-teal-500 text-black"
    : isTropical
      ? "font-medium hover:text-cyan-300 text-shadow-sm text-white"
      : "font-bold text-slate-600 hover:text-teal-600";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 text-lg md:text-3xl ${
        isPop ? 'bg-yellow-50 font-sans text-gray-900' : isTropical ? 'bg-slate-900 font-sans text-white' : 'bg-white font-sans text-slate-800'
    }`}>
      <ScrollToTop />
      <header className={headerClass}>
        <div className="container mx-auto px-6 h-20 md:h-28 flex items-center justify-between">
           <Link to="/" className="relative z-50">
             <Logo className={isTropical ? "brightness-0 invert" : ""} />
           </Link>

           <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {MENU_ITEMS.map((item, i) => {
                return item.isExternal ? (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-base md:text-2xl tracking-widest transition-colors ${linkClass}`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={i}
                    to={item.href}
                    className={`text-base md:text-2xl tracking-widest transition-colors ${linkClass}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
           </nav>

           <button
             className={`lg:hidden relative z-50 p-2 ${isTropical ? 'text-white' : 'text-black'}`}
             onClick={() => setIsMenuOpen(!isMenuOpen)}
           >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
           </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`lg:hidden absolute top-full left-0 w-full overflow-hidden shadow-xl ${
                 isPop ? 'bg-white border-b-4 border-black' : isTropical ? 'bg-slate-900/95 backdrop-blur border-b border-white/10' : 'bg-white border-b border-slate-200'
              }`}
            >
              <nav className="flex flex-col p-8 gap-6">
                 {MENU_ITEMS.map((item, i) => (
                    item.isExternal ? (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-xl font-bold ${
                          isPop ? 'text-black hover:bg-yellow-200 p-2' :
                          isTropical ? 'text-white hover:text-cyan-300' :
                          'text-slate-700 hover:text-teal-600'
                        }`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-xl font-bold ${
                          isPop ? 'text-black hover:bg-yellow-200 p-2' :
                          isTropical ? 'text-white hover:text-cyan-300' :
                          'text-slate-700 hover:text-teal-600'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                 ))}
               </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className={`py-16 ${isPop ? 'bg-black text-white' : isTropical ? 'bg-black/40 text-white backdrop-blur-lg border-t border-white/10' : 'bg-slate-800 text-white'}`}>
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-3">
                     <img src={LOGO_URL} alt="YUIT Inc." className="h-16 w-auto object-contain bg-white rounded-xl p-2" loading="lazy" decoding="async" onError={handleImageError} />
                     <span className="font-bold text-2xl md:text-5xl">YUIT Inc.</span>
                  </div>
                  <p className="opacity-60 text-base md:text-2xl">© 2024 YUIT Inc. All Rights Reserved.</p>
               </div>

               <div className="flex gap-8">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:opacity-80 transition-opacity ${isPop ? 'text-yellow-400' : isTropical ? 'text-cyan-400' : 'text-teal-400'}`}
                      title={social.name}
                    >
                       {social.name === 'Instagram' && <Instagram size={28} className="md:w-10 md:h-10" />}
                       {social.name === 'TikTok' && <TikTokIcon size={28} className="md:w-10 md:h-10" />}
                       {social.name === 'note' && <NoteIcon size={28} className="md:w-10 md:h-10" />}
                    </a>
                  ))}
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};
