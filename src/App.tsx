import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeType, NewsItem } from './types';
import { MENU_ITEMS, COMPANY_OVERVIEW, SOCIAL_LINKS, NEWS_ITEMS as STATIC_NEWS_ITEMS } from './constants';
import { Logo } from './components/Logo';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Menu, X, Instagram, Mail, ExternalLink, Palmtree, Waves, Sun, Heart, Zap, Anchor, ArrowRight, Send, MapPin, ChevronRight, Paperclip, Briefcase, Laptop, Users, Sparkles, Smile, Quote, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';

// Placeholder for the group photo provided by user
const GROUP_PHOTO_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/37b3eb57fb783d4abd67557b53fc85fa2c08b548/images/YUIT%E9%9B%86%E5%90%88%E5%86%99%E7%9C%9F.png";

// New images for PopHero
const HERO_LEFT_IMAGE_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/eb0865d5cb2cefe0aacdbb34d5daf153be15bfdd/images/1%20%20.JPG";
const HERO_RIGHT_IMAGE_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/eb0865d5cb2cefe0aacdbb34d5daf153be15bfdd/images/YUIT%E7%B4%A0%E6%9D%902.png";

// SES Business Image URL
const SES_IMAGE_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/eb0865d5cb2cefe0aacdbb34d5daf153be15bfdd/images/YUIT%E7%B4%A0%E6%9D%901.png";

// President Profile Image URL
const PRESIDENT_IMAGE_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/eb0865d5cb2cefe0aacdbb34d5daf153be15bfdd/images/YUIT-13.jpg";

// Logo URL for Footer usage
const LOGO_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/f611a4c4ca62e49143ae13cb527fffc7b4bfe572/images/yuit_logo.png";

// --- SCROLL HELPER ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- SUB-COMPONENTS FOR DISTINCT THEMES ---

// Typing Animation Component for Pop Theme
const TypingTitle = () => {
  const [text, setText] = useState("");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    
    if (isInView) {
      const timeline = [
        { t: "", d: 0 },
        { t: "ち", d: 100 },
        { t: "ちょ", d: 200 },
        { t: "ちょう", d: 300 },
        { t: "ちょうせ", d: 400 },
        { t: "ちょうせん", d: 500 },
        { t: "ちょうせんを", d: 600 },
        { t: "挑戦を", d: 1000 },
        { t: "挑戦をも", d: 1200 },
        { t: "挑戦をもっ", d: 1300 },
        { t: "挑戦をもっと", d: 1400 },
        { t: "挑戦をもっと", d: 1700 }, 
        { t: "挑戦をもっとみ", d: 1900 },
        { t: "挑戦をもっとみじ", d: 2000 },
        { t: "挑戦をもっとみじか", d: 2100 },
        { t: "挑戦をもっとみじかに", d: 2200 },
        { t: "挑戦をもっと身近に", d: 2600 },
        { t: "挑戦をもっと身近に。", d: 2800 },
      ];

      timeline.forEach(step => {
        timeouts.push(setTimeout(() => setText(step.t), step.d));
      });

    } else {
      setText("");
      timeouts.forEach(clearTimeout);
    }

    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div ref={ref} className="text-2xl sm:text-4xl md:text-8xl font-black text-center leading-tight bg-white border-4 border-black px-6 md:px-12 py-5 md:py-8 shadow-[8px_8px_0px_0px_#38B2AC] transform rotate-1 whitespace-nowrap min-h-[5rem] sm:min-h-[6rem] md:min-h-[10rem] flex items-center justify-center">
      <span>{text}</span>
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block w-0.5 h-8 sm:h-10 md:h-20 bg-black align-middle"
      />
    </div>
  );
};

// --- ICONS ---
const TikTokIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const NoteIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 2v4a2 2 0 0 0 2 2h4" />
    <path d="M22 6l-6-6H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6z" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </svg>
);

// --- PRESIDENT PAGE COMPONENT ---
const President = ({ theme }: { theme: ThemeType }) => {
  const isPop = theme === ThemeType.POP;
  const isTropical = theme === ThemeType.TROPICAL;
  const isTrust = theme === ThemeType.TRUST;

  const containerClass = `container mx-auto px-6 relative z-10`;
  
  const bgClass = isPop ? 'bg-yellow-50' : isTropical ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-800';
  const headingClass = isPop 
    ? "text-5xl md:text-9xl font-black mb-8 bg-white border-4 border-black inline-block px-6 py-3 shadow-[8px_8px_0px_0px_#ED8936] transform -rotate-1"
    : isTropical 
      ? "text-5xl md:text-9xl font-bold mb-8 text-cyan-200 drop-shadow-lg"
      : "text-5xl md:text-9xl font-bold mb-10 text-slate-800 border-l-8 border-teal-600 pl-6";

  const cardClass = isPop
    ? "bg-white border-4 border-black shadow-[8px_8px_0px_0px_#38B2AC] p-8 md:p-12 relative"
    : isTropical
      ? "bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      : "bg-white shadow-xl rounded-2xl p-8 md:p-12 border border-slate-100 relative";

  return (
    <div className={`min-h-screen pt-24 pb-20 ${bgClass}`}>
       {isTropical && (
         <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400"></div>
       )}

       <div className={containerClass}>
          {/* Hero / Header */}
          <div className="text-center mb-16">
             <motion.h1 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className={headingClass}
             >
               REPRESENTATIVE MESSAGE
             </motion.h1>
             <p className={`text-xl md:text-4xl font-bold tracking-widest ${isTropical ? 'text-white/80' : 'text-slate-500'}`}>
               代表挨拶
             </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
             {/* Left: Profile Image & Basic Info */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className="lg:w-1/3 w-full sticky top-24"
             >
                <div className={`aspect-square w-full mb-6 relative overflow-hidden flex items-center justify-center ${
                   isPop ? 'bg-gray-100 border-4 border-black shadow-[8px_8px_0px_0px_black]' :
                   isTropical ? 'bg-white/20 rounded-full border-4 border-white/30 backdrop-blur' :
                   'bg-gray-100 rounded-lg shadow-lg'
                }`}>
                   <img src={PRESIDENT_IMAGE_URL} alt="盛島 加菜" className="w-full h-full object-cover" />
                </div>
                
                <div className={`text-center ${isPop ? 'bg-white border-4 border-black p-4' : ''}`}>
                   <h2 className={`text-3xl md:text-6xl font-bold mb-2 ${isTropical ? 'text-white' : 'text-slate-800'}`}>盛島 加菜</h2>
                   <p className={`text-lg md:text-3xl font-bold opacity-70 ${isTropical ? 'text-cyan-200' : 'text-teal-600'}`}>Kana Morishima / CEO</p>
                </div>
             </motion.div>

             {/* Right: Content */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="lg:w-2/3 w-full"
             >
                <div className={cardClass}>
                   {isPop && <div className="absolute top-4 right-4 text-9xl text-gray-100 -z-10 font-black opacity-50 select-none">HELLO</div>}
                   {isTrust && <Quote className="absolute top-8 right-8 text-slate-100 w-32 h-32 -z-10" />}

                   <h3 className={`text-3xl md:text-6xl font-bold mb-6 flex items-center gap-3 ${
                      isPop ? 'text-pink-600' : isTropical ? 'text-pink-300' : 'text-teal-600'
                   }`}>
                      <Smile size={40} className="md:w-16 md:h-16" /> はじめまして! 代表の盛島加菜です
                   </h3>

                   <div className="space-y-6 text-xl md:text-4xl leading-relaxed opacity-90 mb-10">
                      <p>
                        1994年、宜野湾市で生まれ。
                      </p>
                      
                      {/* Career Path Visualization */}
                      <div className={`flex flex-wrap items-center gap-2 text-lg md:text-3xl font-bold my-6 ${isTropical ? 'text-cyan-100' : 'text-slate-600'}`}>
                         <span className={`px-4 py-2 rounded-full ${isPop ? 'bg-black text-white' : isTropical ? 'bg-white/20' : 'bg-slate-200'}`}>コザ高校</span>
                         <ArrowRight size={24} className="md:w-10 md:h-10" />
                         <span className={`px-4 py-2 rounded-full ${isPop ? 'bg-black text-white' : isTropical ? 'bg-white/20' : 'bg-slate-200'}`}>琉球大学</span>
                         <ArrowRight size={24} className="md:w-10 md:h-10" />
                         <span className={`px-4 py-2 rounded-full ${isPop ? 'bg-black text-white' : isTropical ? 'bg-white/20' : 'bg-slate-200'}`}>ウガンダで体育教師</span>
                         <ArrowRight size={24} className="md:w-10 md:h-10" />
                         <span className={`px-4 py-2 rounded-full ${isPop ? 'bg-pink-500 text-white' : isTropical ? 'bg-pink-500/50' : 'bg-teal-100 text-teal-700'}`}>未経験からWEBエンジニア</span>
                         <ArrowRight size={24} className="md:w-10 md:h-10" />
                         <span className={`px-4 py-2 rounded-full ${isPop ? 'bg-cyan-400 text-black border-2 border-black' : isTropical ? 'bg-cyan-500 text-white' : 'bg-teal-600 text-white'}`}>沖縄でYUITを起業</span>
                      </div>

                      <p>
                        というキャリアを歩んできました!
                      </p>
                      <p>
                        沖縄でも未経験からWEBエンジニアを目指せる環境を作りたいと思い、立ち上げたYUITですが、創業当初は、お金の問題や私の経営能力の不足などにより、悩める日々を過ごしていました・・・・。
                      </p>
                      <p>
                        ただ、当初掲げた思いを強くもち仲間とともに頑張ってきた結果・・・・・<br/>
                        <span className={`font-bold text-2xl md:text-5xl ${isPop ? 'bg-yellow-200 px-1' : isTropical ? 'text-yellow-300' : 'text-teal-600'}`}>
                          嬉しいことに現在は20名以上の仲間が集まってくれています(嬉)
                        </span>
                      </p>
                      <p>
                        そして今回、もっとエンジニアを目指す仲間を集めたいと思い仲間を募集しております!
                      </p>
                   </div>

                   <div className={`p-8 rounded-xl ${
                      isPop ? 'bg-yellow-100 border-2 border-black border-dashed' :
                      isTropical ? 'bg-white/5 border border-white/20' :
                      'bg-slate-50 border border-slate-200'
                   }`}>
                      <h4 className="text-2xl md:text-5xl font-bold mb-6 text-center">■こんなあなたを待っています■</h4>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {[
                          "キャリアチェンジしたい!",
                          "楽しい会社に出会いたい!",
                          "YUITという会社が気になる!",
                          "盛島と話をしてみたい!"
                        ].map((item, i) => (
                           <li key={i} className={`flex items-center gap-2 font-bold text-lg md:text-3xl ${isPop ? 'text-black' : isTropical ? 'text-white' : 'text-slate-700'}`}>
                              <span className={`flex-shrink-0 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full ${
                                 isPop ? 'bg-cyan-400 text-black' : isTropical ? 'bg-cyan-500 text-white' : 'bg-teal-500 text-white'
                              }`}>✓</span>
                              {item}
                           </li>
                        ))}
                      </ul>
                      <div className="mt-8 text-center">
                         <p className="font-bold mb-6 text-xl md:text-4xl">
                           一度気軽にお話しましょう!<br/>
                           私のエンジニア挑戦での失敗経験なども包み隠さずお話します!
                         </p>
                         <Link 
                           to="/recruit"
                           className={`inline-flex items-center gap-2 px-10 py-5 text-xl md:text-4xl font-bold transition-transform hover:scale-105 ${
                             isPop ? 'bg-black text-white border-4 border-transparent hover:bg-white hover:text-black hover:border-black shadow-[4px_4px_0px_0px_#ED8936]' :
                             isTropical ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg' :
                             'bg-slate-800 text-white rounded hover:bg-teal-600 shadow-md'
                           }`}
                         >
                            採用情報を見る <ArrowRight size={24} className="md:w-10 md:h-10" />
                         </Link>
                      </div>
                   </div>

                </div>
             </motion.div>
          </div>
       </div>
    </div>
  );
};

// 1. POP THEME COMPONENTS
const PopHero = () => (
  <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-yellow-50 pt-32 pb-20">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
      >
        <Sun size={160} className="text-yellow-200" />
      </motion.div>
      <div className="absolute top-40 left-10 text-cyan-400 transform -rotate-12 hidden md:block">
        <Palmtree size={140} strokeWidth={2.5} className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-teal-500 fill-teal-100" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-cyan-300 border-t-4 border-black flex items-end overflow-hidden">
         <div className="w-full flex justify-between px-10 pb-4">
            {[...Array(12)].map((_, i) => (
               <Waves key={i} size={56} className="text-white animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
         </div>
      </div>
    </div>

    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative w-full max-w-[90vw] xl:max-w-7xl mb-12 flex justify-center items-center"
      >
        {/* Center Photo Container - serves as anchor */}
        <div className="relative w-full max-w-4xl z-20">
            
            {/* Left Side Image (Absolute relative to Center) */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[95%] w-[65%] z-10 transform -rotate-6 origin-right">
                <div className="bg-white p-3 border-4 border-black shadow-[12px_12px_0px_0px_#ED8936]">
                    <div className="border-2 border-black">
                        <img src={HERO_LEFT_IMAGE_URL} alt="" className="w-full h-auto" />
                    </div>
                </div>
            </div>

            {/* Right Side Image (Absolute relative to Center) */}
            <div className="hidden lg:block absolute top-[60%] -translate-y-1/2 left-[95%] w-[65%] z-10 transform rotate-6 origin-left">
                <div className="bg-white p-3 border-4 border-black shadow-[12px_12px_0px_0px_#ED8936]">
                    <div className="border-2 border-black">
                        <img src={HERO_RIGHT_IMAGE_URL} alt="" className="w-full h-auto" />
                    </div>
                </div>
            </div>

            {/* Center Image Content */}
            <div className="bg-white p-4 border-4 border-black shadow-[16px_16px_0px_0px_#ED8936] transform -rotate-2 hover:rotate-0 transition-transform duration-300 relative z-20">
                <div className="relative border-2 border-black">
                    <img src={GROUP_PHOTO_URL} alt="YUIT Team" className="w-full h-auto" />
                    <div className="absolute -top-8 -right-6 md:-top-12 md:-right-10 bg-pink-500 text-white font-black px-6 py-3 md:px-12 md:py-5 border-2 border-black shadow-[4px_4px_0px_0px_black] transform rotate-3 text-2xl md:text-7xl z-30 whitespace-nowrap">
                        WE ARE YUIT!
                    </div>
                </div>
            </div>

        </div>
      </motion.div>
      
      <div className="flex items-center justify-center gap-4 md:block relative z-30">
          <div className="md:hidden transform -rotate-12 flex-shrink-0">
            <Palmtree size={64} strokeWidth={2.5} className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-teal-500 fill-teal-100" />
          </div>
          <TypingTitle />
      </div>
    </div>
  </div>
);

const PopOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
    {COMPANY_OVERVIEW.map((item, idx) => (
      <motion.div 
        key={item.label}
        whileHover={{ scale: 1.02 }}
        className={`bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl relative overflow-hidden ${
          idx < 3 ? 'md:col-span-2' : 'md:col-span-3'
        }`}
      >
        <div className="absolute top-0 right-0 p-2 opacity-10">
            {idx % 2 === 0 ? <Waves size={48} /> : <Palmtree size={48} />}
        </div>
        <div className={`text-base md:text-2xl font-black mb-4 uppercase border-b-4 border-black inline-block px-3 ${
            idx % 2 === 0 ? 'bg-cyan-200' : 'bg-pink-200'
        }`}>{item.label}</div>
        <div className="text-xl md:text-4xl font-bold font-pop text-black leading-snug relative z-10">
           {item.label === '代表者' ? (
             <>代表取締役<br/>盛島加菜</>
           ) : (
             item.value
           )}
        </div>
      </motion.div>
    ))}
  </div>
);

interface NewsListProps {
  items: NewsItem[];
  isLoading: boolean;
  error: boolean;
}

const PopNews = ({ items, isLoading, error }: NewsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_black] animate-pulse h-32">
            <div className="h-6 bg-gray-200 w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-4 border-black p-8 text-center text-red-600 font-black shadow-[4px_4px_0px_0px_black] text-xl">
        <AlertCircle className="mx-auto mb-2" size={40} />
        ニュースの読み込みに失敗しました
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.a 
          key={i} 
          href={item.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 10, backgroundColor: "#FFF" }}
          className="block bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_black] flex flex-col md:flex-row md:items-center gap-6 group"
        >
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="font-bold text-gray-500 text-base md:text-2xl whitespace-nowrap">{item.date}</span>
            {item.thumbnail ? (
              <div className="w-32 h-20 border-2 border-black overflow-hidden bg-gray-100 relative flex-shrink-0">
                 <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <span className={`px-3 py-1 text-sm md:text-xl font-black border-2 border-black ${
                item.category === 'INFO' ? 'bg-cyan-200' : item.category === 'RECRUIT' ? 'bg-pink-300' : 'bg-yellow-300'
              }`}>
                {item.category}
              </span>
            )}
          </div>
          <h3 className="flex-1 font-bold text-xl md:text-4xl group-hover:text-teal-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <div className="bg-black text-white p-2 rounded-full group-hover:bg-teal-500 transition-colors self-start md:self-center ml-auto md:ml-0">
            <ChevronRight size={24} className="md:w-10 md:h-10" />
          </div>
        </motion.a>
      ))}
    </div>
  );
};

const PopContact = () => (
  <div className="bg-orange-300 border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_black] relative overflow-hidden">
    <div className="absolute -right-10 -top-10 text-orange-400 opacity-50 rotate-12">
      <Mail size={240} />
    </div>
    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
      <div className="lg:sticky lg:top-24">
        <h3 className="text-5xl md:text-8xl font-black mb-6 bg-white inline-block px-6 py-2 border-4 border-black transform -rotate-2">
          Contact Us
        </h3>
        <p className="font-bold text-2xl md:text-4xl mb-8">
          お仕事のご依頼、採用についてなど、<br/>お気軽にお問い合わせください！
        </p>
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-bold bg-white/50 p-4 rounded border-2 border-black w-fit text-lg md:text-3xl">
            <Mail size={28} className="md:w-10 md:h-10" /> <span>info@yuit-inc.jp</span>
          </div>
          <div className="flex items-center gap-4 font-bold bg-white/50 p-4 rounded border-2 border-black w-fit text-lg md:text-3xl">
            <MapPin size={28} className="md:w-10 md:h-10" /> <span>沖縄県那覇市安里381-1</span>
          </div>
        </div>
      </div>
      <form className="bg-white p-8 border-4 border-black space-y-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
         <div className="space-y-6">
             <div>
                <label className="block font-black mb-2 text-lg md:text-3xl">氏名・会社名 <span className="text-pink-500">*</span></label>
                <input type="text" required className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-2 text-lg md:text-3xl">フリガナ</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-2 text-lg md:text-3xl">電話番号（ハイフンなし）</label>
                <input type="tel" className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-2 text-lg md:text-3xl">メールアドレス <span className="text-pink-500">*</span></label>
                <input type="email" required className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-2 text-lg md:text-3xl">お問い合わせ項目 <span className="text-pink-500">*</span></label>
                <div className="relative border-2 border-black bg-gray-50">
                  <select required className="w-full p-3 font-bold text-lg md:text-3xl bg-transparent appearance-none focus:outline-none">
                     <option value="">選択してください</option>
                     <option value="business">事業内容について</option>
                     <option value="recruit">採用について</option>
                     <option value="other">その他</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                     <ChevronRight size={20} className="md:w-8 md:h-8" />
                  </div>
                </div>
             </div>
             <div>
                <label className="block font-black mb-2 text-lg md:text-3xl">お問い合わせ内容</label>
                <textarea rows={4} className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none"></textarea>
             </div>
             <div>
                <label className="block font-black mb-2 text-lg md:text-3xl">添付ファイル（任意）</label>
                <label className="flex items-center gap-3 w-full bg-gray-100 border-2 border-black border-dashed p-6 cursor-pointer hover:bg-cyan-50 transition-colors">
                  <Paperclip size={24} className="md:w-8 md:h-8" />
                  <span className="font-bold text-base md:text-2xl">ファイルの選択</span>
                  <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                </label>
                <div className="text-sm md:text-xl mt-3 font-bold text-gray-600 space-y-1">
                   <p>会社概要などございましたらご提出ください。</p>
                   <p>・添付数：最大3点</p>
                   <p>・ファイルサイズ：合計30.0MB以下</p>
                   <p>・ファイル拡張子：png / jpg / pdf / jpeg</p>
                </div>
             </div>
             <div className="flex items-start gap-3 pt-2">
               <input type="checkbox" id="privacy-pop" required className="mt-1.5 w-5 h-5 md:w-8 md:h-8 border-2 border-black rounded-none text-cyan-500 focus:ring-0 cursor-pointer" />
               <label htmlFor="privacy-pop" className="text-base md:text-2xl font-bold cursor-pointer">
                 <a href="https://yuit-inc.jp/privacy.html" target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-2 hover:text-cyan-600">プライバシーポリシー</a>
                 に同意する
               </label>
             </div>
         </div>
         <button className="w-full bg-black text-white font-black py-5 text-xl md:text-4xl border-2 border-black hover:bg-teal-500 hover:text-black transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#ED8936]">
           送信する <Send size={24} className="md:w-8 md:h-8" />
         </button>
      </form>
    </div>
  </div>
);

// 2. TROPICAL THEME COMPONENTS
const TropicalHero = () => (
  <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pb-20 pt-32">
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 animate-gradient-xy"></div>
    <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    
    <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="md:w-1/2 text-white"
      >
        <h1 className="text-6xl md:text-9xl font-bold leading-tight mb-8 drop-shadow-lg">
          Connect<br/>
          <span className="text-cyan-200">The Future</span>
        </h1>
        <p className="text-xl md:text-4xl opacity-90 mb-10 font-light tracking-wide border-l-4 border-cyan-300 pl-8">
          沖縄から世界へ。<br/>
          ITの力で、新しい価値と可能性を結びます。
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }}
        className="md:w-1/2 p-6 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl w-full max-w-2xl"
      >
        <div className="rounded-[1.5rem] overflow-hidden shadow-inner relative group">
             <img src={GROUP_PHOTO_URL} alt="YUIT Team" className="w-full h-auto opacity-90 group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent pointer-events-none"></div>
             <div className="absolute bottom-8 left-8 text-white">
                <p className="font-bold text-xl md:text-4xl tracking-widest flex items-center gap-3">
                  <Sun size={24} className="text-yellow-300 md:w-10 md:h-10" /> TEAM YUIT
                </p>
             </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const TropicalOverview = () => (
  <div className="backdrop-blur-xl bg-white/20 border border-white/40 rounded-3xl overflow-hidden shadow-2xl text-white">
    <div className="grid divide-y divide-white/20">
      {COMPANY_OVERVIEW.map((item, idx) => (
        <div key={idx} className="flex flex-col md:flex-row hover:bg-white/10 transition-colors group">
          <div className="md:w-1/3 p-8 bg-white/5 font-bold tracking-widest text-cyan-100 flex items-center gap-3 group-hover:text-white transition-colors text-lg md:text-3xl">
             <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
             {item.label}
          </div>
          <div className="md:w-2/3 p-8 font-medium text-xl md:text-4xl">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TropicalNews = ({ items, isLoading, error }: NewsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-pulse h-32 flex items-center gap-6">
             <div className="w-24 h-24 bg-white/10 rounded-lg"></div>
             <div className="flex-1 space-y-3">
                <div className="h-5 bg-white/10 w-1/4 rounded"></div>
                <div className="h-5 bg-white/10 w-3/4 rounded"></div>
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-red-400/50 rounded-2xl p-10 text-center text-red-200 font-bold text-xl">
        <AlertCircle className="mx-auto mb-3" size={40} />
        ニュースの読み込みに失敗しました
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <motion.a 
          key={i} 
          href={item.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          className="block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 text-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <div className="flex items-center gap-5 flex-shrink-0">
            <span className="font-mono text-base md:text-2xl opacity-80 whitespace-nowrap">{item.date}</span>
            {item.thumbnail ? (
              <div className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                 <img src={item.thumbnail} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
            ) : (
              <span className={`px-3 py-1 text-xs md:text-lg font-bold rounded-full border border-white/40 tracking-wider ${
                 item.category === 'INFO' ? 'bg-cyan-500/30' : 'bg-pink-500/30'
              }`}>
                {item.category}
              </span>
            )}
          </div>
          <h3 className="flex-1 text-xl md:text-4xl font-medium tracking-wide line-clamp-2">
            {item.title}
          </h3>
          <ArrowRight size={24} className="opacity-0 md:opacity-50 group-hover:opacity-100 transition-opacity ml-auto md:ml-0 md:w-10 md:h-10" />
        </motion.a>
      ))}
    </div>
  );
};

const TropicalContact = () => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
    <div className="grid lg:grid-cols-2 gap-16 relative z-10">
      <div>
        <h3 className="text-4xl md:text-8xl font-bold mb-8 text-cyan-200">Contact Us</h3>
        <p className="text-white/80 mb-10 leading-relaxed text-xl md:text-3xl">
          お仕事のご依頼、採用についてなど、<br/>
          以下のフォームよりお気軽にお問い合わせください。
        </p>
        <div className="space-y-6">
           <div className="flex items-center gap-5 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-lg md:text-3xl">
              <Mail className="text-cyan-400 md:w-10 md:h-10" size={28} />
              <span className="font-mono">info@yuit-inc.jp</span>
           </div>
           <div className="flex items-center gap-5 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-lg md:text-3xl">
              <MapPin className="text-cyan-400 md:w-10 md:h-10" size={28} />
              <span>沖縄県那覇市安里381-1</span>
           </div>
        </div>
      </div>
      <form className="space-y-6">
         <div className="space-y-6">
             <div>
                <label className="block text-base md:text-2xl font-bold text-cyan-100 mb-2">氏名・会社名 <span className="text-pink-400">*</span></label>
                <input type="text" required className="w-full bg-white/5 border border-white/20 rounded p-4 text-white text-lg md:text-3xl focus:bg-white/10 focus:border-cyan-400 outline-none transition-all placeholder-white/30" />
             </div>
             <div>
                <label className="block text-base md:text-2xl font-bold text-cyan-100 mb-2">メールアドレス <span className="text-pink-400">*</span></label>
                <input type="email" required className="w-full bg-white/5 border border-white/20 rounded p-4 text-white text-lg md:text-3xl focus:bg-white/10 focus:border-cyan-400 outline-none transition-all placeholder-white/30" />
             </div>
             <div>
                <label className="block text-base md:text-2xl font-bold text-cyan-100 mb-2">お問い合わせ内容</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/20 rounded p-4 text-white text-lg md:text-3xl focus:bg-white/10 focus:border-cyan-400 outline-none transition-all placeholder-white/30"></textarea>
             </div>
             
             <div className="flex items-start gap-3 pt-2">
               <input type="checkbox" id="privacy-tropical" required className="mt-1.5 w-5 h-5 md:w-8 md:h-8 bg-white/10 border-white/30 rounded text-cyan-500 focus:ring-0 cursor-pointer" />
               <label htmlFor="privacy-tropical" className="text-base md:text-2xl font-bold cursor-pointer text-white/80">
                 <a href="https://yuit-inc.jp/privacy.html" target="_blank" rel="noopener noreferrer" className="underline decoration-cyan-400 decoration-2 underline-offset-2 hover:text-cyan-200">プライバシーポリシー</a>
                 に同意する
               </label>
             </div>

             <div className="pt-4">
               <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02] text-xl md:text-4xl">
                 Send Message <Send size={24} className="md:w-8 md:h-8" />
               </button>
             </div>
         </div>
      </form>
    </div>
  </div>
);

// 3. TRUST THEME COMPONENTS
const TrustHero = () => (
  <div className="relative min-h-[90vh] flex items-center justify-center bg-slate-50 pt-20">
    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 mb-10 text-sm md:text-xl font-bold tracking-widest text-teal-700 bg-white rounded-full border border-teal-100 shadow-sm">
           <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
           INNOVATION & TRUST
        </div>
        <h1 className="text-6xl md:text-9xl font-bold text-slate-800 mb-10 leading-tight tracking-tight">
          Reliable Technology,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Create the Future.</span>
        </h1>
        <p className="text-2xl md:text-5xl text-slate-600 mb-14 max-w-4xl mx-auto leading-relaxed">
           確かな技術と信頼で、未来を創る。<br/>
           YUITは、お客様のビジネスを加速させるITパートナーです。
        </p>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2">
            <img 
               src={GROUP_PHOTO_URL} 
               alt="YUIT Team" 
               className="w-full h-auto rounded-xl"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none rounded-xl"></div>
        </div>
      </motion.div>
    </div>
  </div>
);

const TrustOverview = () => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    <div className="divide-y divide-slate-100">
      {COMPANY_OVERVIEW.map((item, idx) => (
        <div key={idx} className="flex flex-col md:flex-row hover:bg-slate-50/50 transition-colors">
          <div className="md:w-1/3 p-8 bg-slate-50 font-bold text-slate-700 flex items-center border-r border-slate-100 text-lg md:text-3xl">
             {item.label}
          </div>
          <div className="md:w-2/3 p-8 text-slate-600 font-medium text-xl md:text-4xl">
             {item.value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TrustNews = ({ items, isLoading, error }: NewsListProps) => {
  if (isLoading) return (
     <div className="space-y-4">
        {[1,2,3].map(i => (
           <div key={i} className="h-32 bg-slate-100 animate-pulse rounded"></div>
        ))}
     </div>
  );
  if (error) return (
     <div className="bg-red-50 border border-red-100 p-10 text-center rounded-lg text-red-600 text-lg">
        <AlertCircle className="mx-auto mb-3 opacity-50" size={32} />
        <span className="font-bold">Failed to load news.</span>
     </div>
  );

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
      {items.map((item, i) => (
        <a 
          key={i} 
          href={item.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col md:flex-row md:items-center gap-8 p-8 hover:bg-slate-50 transition-all group"
        >
          <div className="flex-1 flex flex-col md:flex-row md:items-center gap-6">
             <div className="flex flex-col gap-2 min-w-[160px] flex-shrink-0">
                <span className="text-slate-400 text-base md:text-2xl font-mono">{item.date}</span>
                {item.thumbnail ? (
                  <div className="flex-shrink-0 w-32 h-20 rounded border border-slate-100 overflow-hidden bg-slate-50 mt-1">
                     <img src={item.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <span className={`self-start px-3 py-1 text-xs md:text-lg font-bold tracking-wider rounded border ${
                     item.category === 'INFO' ? 'bg-teal-50 text-teal-700 border-teal-100' : 
                     item.category === 'RECRUIT' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                     'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {item.category}
                  </span>
                )}
             </div>
             <h3 className="flex-1 text-slate-700 font-bold text-xl md:text-4xl group-hover:text-teal-600 transition-colors line-clamp-2">
                {item.title}
             </h3>
          </div>
          <div className="flex items-center gap-2 text-base md:text-2xl font-bold text-slate-400 group-hover:text-teal-600 transition-colors ml-auto">
             Read More <ArrowRight size={20} className="md:w-8 md:h-8" />
          </div>
        </a>
      ))}
    </div>
  );
};

const TrustContact = () => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-10 md:p-14">
    <div className="text-center mb-12">
      <h3 className="text-4xl md:text-7xl font-bold text-slate-800 mb-4">Contact Us</h3>
      <p className="text-slate-500 text-lg md:text-3xl">お問い合わせは以下のフォームよりお願いいたします。</p>
    </div>
    <div className="max-w-3xl mx-auto">
      <form className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-base md:text-2xl font-bold text-slate-700">氏名・会社名 <span className="text-red-500">*</span></label>
            <input type="text" required className="w-full border border-slate-300 rounded p-4 text-lg md:text-3xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
          <div className="space-y-3">
            <label className="text-base md:text-2xl font-bold text-slate-700">フリガナ</label>
            <input type="text" className="w-full border border-slate-300 rounded p-4 text-lg md:text-3xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-base md:text-2xl font-bold text-slate-700">電話番号（ハイフンなし）</label>
            <input type="tel" className="w-full border border-slate-300 rounded p-4 text-lg md:text-3xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
          <div className="space-y-3">
            <label className="text-base md:text-2xl font-bold text-slate-700">メールアドレス <span className="text-red-500">*</span></label>
            <input type="email" required className="w-full border border-slate-300 rounded p-4 text-lg md:text-3xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
        </div>
        <div className="space-y-3">
           <label className="text-base md:text-2xl font-bold text-slate-700">お問い合わせ項目 <span className="text-red-500">*</span></label>
           <div className="relative">
             <select required className="w-full border border-slate-300 rounded p-4 text-lg md:text-3xl appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white">
               <option value="">選択してください</option>
               <option value="business">事業内容について</option>
               <option value="recruit">採用について</option>
               <option value="other">その他</option>
             </select>
             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
               <ChevronRight size={20} className="md:w-8 md:h-8" />
             </div>
           </div>
        </div>
        <div className="space-y-3">
          <label className="text-base md:text-2xl font-bold text-slate-700">お問い合わせ内容</label>
          <textarea rows={6} className="w-full border border-slate-300 rounded p-4 text-lg md:text-3xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"></textarea>
        </div>
        <div className="space-y-3">
          <label className="text-base md:text-2xl font-bold text-slate-700">添付ファイル（任意）</label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-8 hover:bg-slate-100 transition-colors text-center cursor-pointer">
              <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Paperclip className="mx-auto text-slate-400 mb-3 md:w-10 md:h-10" size={32} />
              <span className="text-slate-600 text-base md:text-2xl font-medium">ファイルの選択</span>
          </div>
          <div className="text-sm md:text-xl text-slate-500 mt-3 space-y-1">
             <p>会社概要などございましたらご提出ください。</p>
             <p>・添付数：最大3点</p>
             <p>・ファイルサイズ：合計30.0MB以下</p>
             <p>・ファイル拡張子：png / jpg / pdf / jpeg</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 pt-4">
           <input type="checkbox" id="privacy-trust" required className="w-5 h-5 md:w-8 md:h-8 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer" />
           <label htmlFor="privacy-trust" className="text-base md:text-2xl text-slate-700 cursor-pointer select-none">
             <a href="https://yuit-inc.jp/privacy.html" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">プライバシーポリシー</a>
             に同意する
           </label>
        </div>
        <div className="text-center pt-6">
          <button className="bg-slate-800 text-white font-bold py-5 px-16 rounded text-xl md:text-4xl hover:bg-teal-600 transition-colors shadow-lg">
            送信する
          </button>
        </div>
      </form>
    </div>
  </div>
);

// --- RECRUIT PAGE COMPONENT ---
const Recruit = ({ theme }: { theme: ThemeType }) => {
  const isPop = theme === ThemeType.POP;
  const isTropical = theme === ThemeType.TROPICAL;
  
  const containerClass = `container mx-auto px-6 relative z-10`;
  const sectionTitleClass = isPop 
    ? "text-4xl md:text-8xl font-black bg-black text-white inline-block px-6 py-3 transform -rotate-1 mb-10"
    : isTropical 
      ? "text-4xl md:text-8xl font-bold text-cyan-200 mb-10 border-b-2 border-cyan-500/30 inline-block pb-3"
      : "text-4xl md:text-8xl font-bold text-slate-800 mb-10 border-l-4 border-yuit-teal pl-6";

  const cardClass = isPop
    ? "bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED8936] p-10"
    : isTropical
      ? "bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-white"
      : "bg-white border border-slate-200 shadow-lg rounded-xl p-10";

  return (
    <div className={`min-h-screen pt-20 ${isTropical ? 'text-white' : ''}`}>
      <section className={`relative py-32 overflow-hidden ${isPop ? 'bg-yellow-100' : isTropical ? 'bg-transparent' : 'bg-slate-50'}`}>
        <div className={containerClass}>
          <div className="max-w-5xl">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <span className={`font-bold tracking-[0.2em] mb-6 block text-lg md:text-3xl ${isPop ? 'text-black' : isTropical ? 'text-cyan-300' : 'text-yuit-teal'}`}>— careers at —</span>
               <h1 className={`text-6xl md:text-9xl font-black mb-8 leading-tight ${isPop ? 'text-black' : isTropical ? 'text-white' : 'text-slate-800'}`}>
                 株式会社YUIT<br/>
                 私たちと一緒に<br/>働きませんか？
               </h1>
             </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className={containerClass}>
          <h2 className={sectionTitleClass}>MESSAGE / 私たちの思い</h2>
          <div className={cardClass}>
             <h3 className={`text-3xl md:text-6xl font-bold mb-8 ${isPop ? 'text-pink-600' : isTropical ? 'text-pink-300' : 'text-yuit-orange'}`}>
                ゆるっとガチなエンジニアを育成中！
             </h3>
             <p className="leading-loose text-xl md:text-3xl opacity-90">
               「ITって難しそう」「パソコン苦手だけど大丈夫?」そんな不安は一旦ぜんぶ置いて大丈夫です!<br/>
               ほぼ全てのメンバーが全くの未経験者。<br/>
               知識ゼロから安心して飛び込んできてください!
             </p>
          </div>
        </div>
      </section>

      <section className={`py-24 ${isPop ? 'bg-cyan-100' : isTropical ? 'bg-black/20' : 'bg-slate-50'}`}>
        <div className={containerClass}>
           <h2 className={sectionTitleClass}>ABOUT / 私たちについて</h2>
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team" 
                     className={`w-full h-auto object-cover aspect-video ${isPop ? 'border-4 border-black shadow-[8px_8px_0px_0px_black]' : isTropical ? 'rounded-2xl opacity-80' : 'rounded-lg shadow-md'}`} />
              </div>
              <div className="space-y-8 text-xl md:text-3xl">
                <h3 className="text-2xl md:text-5xl font-bold">■個性バラバラ。でも、想いは一緒。YUITというチームのかたち■</h3>
                <p className="opacity-90 leading-relaxed">
                  YUIT(ユイティー)には、ちょっとクセ強な(?)メンバーがいっぱい。<br/>
                  ホテルのフロントスタッフ、不動産営業、芸能活動経験者、飲食店スタッフなどなど…<br/>
                  「え、そんなバックグラウンドからIT転職!?」というメンバーがたくさん集まっています。
                </p>
                <p className="opacity-90 leading-relaxed">
                  年齢も経歴もバラバラだけど、目指す未来は一緒。だからこそ、支え合えるし、めちゃくちゃ仲がいいんです。
                </p>
                <p className="opacity-90 leading-relaxed">
                  メンバー同士の交流の機会は盛りだくさん!<br/>
                  週3回の勉強会や、月1の懇親会、プライベートでも頻繁にご飯や飲みに行ったり、、!
                  情報交換したり、励まし合ったり、ときに爆笑したり。<br/>
                  YUITには、ただの同僚を超えた“仲間”がいます。
                </p>
                <div className={`p-6 ${isPop ? 'bg-white border-2 border-black' : isTropical ? 'bg-white/10 rounded' : 'bg-white border border-slate-200'}`}>
                   <p className="text-base md:text-2xl">
                     さらに、月に1回の1on1で役員やCTOと直接話す時間も。スキルや目標の話はもちろん、「最近どう?」っていうゆるっとした相談もOK。人生相談、恋愛相談(!?)まで、なんでもどうぞ。笑
                   </p>
                </div>
                <div className="opacity-90 leading-relaxed">
                   <p>「将来自社サービス作りたい!」「受託開発もやりたい!」なんて声も出てきていて、まだまだこれから、YUITはどんどん進化していきます!</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-24">
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>BUSINESS / 事業内容</h2>
            <div className="mb-16 max-w-4xl">
              <p className="leading-relaxed text-xl md:text-3xl">
                YUIT(ユイティー)は、沖縄で未経験からエンジニア転身を叶える会社です。<br/>
                人と人の結びつきを意味する「結」と「IT」を掛け合わせた社名の通り、<br/>
                人と人、会社と会社を結んでいく、そんな存在になりたいと考えております!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
               <div className={cardClass}>
                  <div className={`mb-6 inline-block p-3 rounded ${isPop ? 'bg-black text-white' : isTropical ? 'bg-cyan-500 text-white' : 'bg-yuit-teal text-white'}`}>
                    <Briefcase size={32} className="md:w-12 md:h-12" />
                  </div>
                  <h3 className="text-2xl md:text-5xl font-bold mb-6">—SES事業—</h3>
                  <p className="opacity-80 text-lg md:text-3xl">
                    当社で0からエンジニアを育成し、様々な開発現場にアサインします。YUITに在籍しながら様々な案件に参画できるため、キャリアアップを目指せます!
                  </p>
               </div>
               <div className={cardClass}>
                  <div className={`mb-6 inline-block p-3 rounded ${isPop ? 'bg-black text-white' : isTropical ? 'bg-pink-500 text-white' : 'bg-yuit-orange text-white'}`}>
                    <Laptop size={32} className="md:w-12 md:h-12" />
                  </div>
                  <h3 className="text-2xl md:text-5xl font-bold mb-6">—NARAYUN— WEBエンジニア育成事業</h3>
                  <p className="opacity-80 text-lg md:text-3xl">
                    当社独自のWEBエンジニア育成カリキュラムを提供しています。自らも未経験からエンジニアになった代表、盛島の経験を活かし、こだわりが詰まったカリキュラムとなっております!<br/>
                    また、経験豊富な専属トレーナーが付くため、安心してスキルアップを目指すことができます。
                  </p>
               </div>
            </div>
         </div>
      </section>

      <section className={`py-24 ${isPop ? 'bg-yellow-50' : isTropical ? 'bg-white/5' : 'bg-slate-50'}`}>
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>MORE INFO / 教育カリキュラム</h2>
            
            <div className="flex flex-col md:flex-row gap-16">
               <div className="md:w-1/2 space-y-8 text-xl md:text-3xl">
                  <h3 className="text-3xl md:text-6xl font-bold">完全未経験からついに卒業生第一号!<br/>エンジニアデビューを果たしました!</h3>
                  <p className="leading-relaxed opacity-90">
                    わたしたちは、知識ゼロ・経験ゼロの方でも“やってみたい”気持ちさえあれば、ゼロからエンジニアを目指せる仕組みをつくっています。<br/>
                    そして2025年6月、“完全未経験”でスタートしたメンバーが、ついにエンジニアとしてデビュー!!<br/>
                    沖縄に1人、新たなエンジニアが生まれたこの瞬間は、言葉にできないほどの喜びでした。
                  </p>
                  <p className="leading-relaxed opacity-90">
                    これからの活躍が楽しみで仕方ないのと同時に、「もっと多くの仲間をこの場所から送り出していきたい!」と、チーム一同気合が入っています🔥
                  </p>
                  
                  <div className={`p-8 mt-8 ${isPop ? 'bg-white border-2 border-black' : isTropical ? 'bg-white/10 rounded-xl' : 'bg-white shadow-sm rounded-lg'}`}>
                     <h4 className="font-bold mb-3 text-lg md:text-3xl">■学んで、働いて、成長して■</h4>
                     <p className="text-base md:text-2xl opacity-80 mb-6">
                       「沖縄って、学べる環境が少ないよね」そんな声をよく聞きます。でも、ないなら作ればいい!がYUIT流。<br/>
                       SES、受託、開発、教育…いろんな挑戦を続けながら、“働きながら学べるエンジニア養成所”のような存在になってきました。
                       これからもYUITならではのやり方で、“ちょっと未来が楽しみになる社会”をつくっていきます。
                     </p>
                     <h4 className="font-bold mb-3 text-lg md:text-3xl">■YUITが目指すのは「豊かな人生」■</h4>
                     <p className="text-base md:text-2xl opacity-80">
                       「エンジニアになる」ことがゴールではありません。その先にある、経済的にも精神的にも豊かな未来を獲得すること。幸せになることが人生の目的だと考えています!
                       だからこそ、もっと身近に、もっと楽しく、挑戦できる場所を──それがYUITのありたい姿です。
                     </p>
                  </div>
               </div>
               <div className="md:w-1/2 flex items-center justify-center">
                  <div className={`p-10 text-center ${cardClass}`}>
                     <Sparkles size={64} className={`mx-auto mb-6 md:w-20 md:h-20 ${isPop ? 'text-yellow-500' : 'text-yellow-300'}`} />
                     <p className="text-3xl md:text-6xl font-bold mb-6">
                       さあ、一緒に学び、働き、<br/>笑って、成長していきましょう。
                     </p>
                     <p className="text-xl md:text-4xl">あなたの挑戦、<br/>YUITが全力で応援します!</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-24">
         <div className={containerClass}>
            <div className={`flex flex-col md:flex-row-reverse items-center gap-16 ${isPop ? 'bg-white border-4 border-black p-10' : isTropical ? 'bg-white/10 backdrop-blur rounded-3xl p-12' : 'bg-white shadow-xl rounded-2xl p-12'}`}>
               <div className="md:w-1/3">
                  <div className={`aspect-square w-full flex items-center justify-center ${isPop ? 'bg-gray-200 border-2 border-black' : isTropical ? 'bg-white/20 rounded-full' : 'bg-gray-100 rounded-full'}`}>
                     <Users size={80} className={`opacity-50 md:w-32 md:h-32`} />
                  </div>
                  <p className="text-center font-bold mt-6 text-xl md:text-4xl">代表取締役 盛島加菜</p>
               </div>
               <div className="md:w-2/3 space-y-6 text-xl md:text-3xl">
                  <h3 className="text-3xl md:text-6xl font-bold">■はじめまして!代表の盛島加菜です■</h3>
                  <p className="opacity-90">
                    1994年、宜野湾市で生まれ。コザ高校⇀琉球大学⇀ウガンダで体育教師⇀未経験からWEBエンジニア⇀沖縄でYUITを起業というキャリアを歩んできました!
                  </p>
                  <p className="opacity-90">
                    沖縄でも未経験からWEBエンジニアを目指せる環境を作りたいと思い、立ち上げたYUITですが、創業当初は、お金の問題や私の経営能力の不足などにより、悩める日々を過ごしていました・・・・。
                  </p>
                  <p className="opacity-90">
                    ただ、当初掲げた思いを強くもち仲間とともに頑張ってきた結果・・・・・嬉しいことに現在は20名以上の仲間が集まってくれています(嬉)
                  </p>
                  <p className="opacity-90">
                    そして今回、もっとエンジニアを目指す仲間を集めたいと思い仲間を募集しております!
                  </p>
                  <div className={`mt-8 p-6 ${isPop ? 'bg-pink-100 border-2 border-black' : isTropical ? 'bg-pink-500/20 rounded' : 'bg-pink-50 rounded border border-pink-100'}`}>
                     <p className="font-bold mb-3 text-lg md:text-3xl">■こんなあなたを待っています■</p>
                     <ul className="list-disc list-inside text-base md:text-2xl space-y-2">
                        <li>キャリアチェンジしたい!</li>
                        <li>楽しい会社に出会いたい!</li>
                        <li>YUITという会社が気になる!</li>
                        <li>盛島と話をしてみたい!</li>
                     </ul>
                     <p className="text-base md:text-2xl mt-4 font-bold">一度気軽にお話しましょう!私のエンジニア挑戦での失敗経験なども包み隠さずお話します!</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className={`py-24 ${isPop ? 'bg-gray-100' : isTropical ? 'bg-black/40' : 'bg-slate-50'}`}>
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>COMPANY / 会社概要</h2>
            <div className={`${theme === ThemeType.POP ? 'w-full max-w-[1600px]' : 'max-w-5xl'} mx-auto`}>
               <div className={`text-center mb-8 font-bold text-2xl md:text-5xl ${isTropical ? 'text-cyan-200' : 'text-yuit-teal'}`}>挑戦をもっと身近に。</div>
               
               <div className={`${isPop ? 'bg-white border-4 border-black' : isTropical ? 'bg-white/5 border border-white/20 rounded-xl' : 'bg-white border border-slate-200 rounded'}`}>
                 {[
                   {k: "会社名", v: "株式会社YUIT"},
                   {k: "事業内容", v: "SES事業 / NARAYUN（エンジニア育成事業）"},
                   {k: "企業WEBサイト", v: "https://yuit-inc.jp/"},
                   {k: "所在地", v: "沖縄県那覇市安里"},
                 ].map((row, i) => (
                   <div key={i} className={`flex border-b last:border-0 ${isPop ? 'border-black' : isTropical ? 'border-white/20' : 'border-slate-100'}`}>
                      <div className={`w-1/3 p-6 font-bold text-lg md:text-3xl ${isPop ? 'bg-gray-200' : isTropical ? 'bg-white/10' : 'bg-slate-50'}`}>{row.k}</div>
                      <div className="w-2/3 p-6 text-lg md:text-3xl">{row.v}</div>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </section>

      <section className="py-24">
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>CAREERS / 採用情報</h2>
            <div className="text-center space-y-10">
               <p className="text-xl md:text-3xl">
                 現在、下記の職種で募集を行なっています。<br/>
                 応募を検討される方は、以下のページをご覧ください。
               </p>
               
               <a href="https://en-gage.net" target="_blank" rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-3 px-10 py-5 text-2xl md:text-5xl font-bold transition-transform hover:scale-105 ${
                    isPop ? 'bg-pink-500 text-white border-4 border-black shadow-[8px_8px_0px_0px_black]' :
                    isTropical ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg shadow-pink-500/40' :
                    'bg-yuit-teal text-white rounded-lg shadow-lg'
                  }`}>
                  募集要項を見る (engage) <ExternalLink size={28} className="md:w-12 md:h-12" />
               </a>

               <div className="mt-16 opacity-60 text-base md:text-2xl">
                  <p>これらの求人情報は、一部エンゲージ（https://en-gage.net/）にも転載されます。</p>
                  <p>powered by engage</p>
                  <p>© en Inc.｜エン株式会社（旧：エン・ジャパン株式会社）</p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

// --- HOME PAGE COMPONENT ---
const Home = ({ theme }: { theme: ThemeType }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.3
      }
    }
  };

  const highlightCharVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 10,
      rotate: -180 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 12,
        mass: 1.5,
        duration: 1.5
      }
    }
  };

  const [newsItems, setNewsItems] = useState<NewsItem[]>(STATIC_NEWS_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const RSS_URL = "https://note.com/yuit_note/rss";
        // Switch to corsproxy.io for better reliability
        const PROXY_URL = `https://corsproxy.io/?${encodeURIComponent(RSS_URL)}`;
        
        const res = await fetch(PROXY_URL);
        if (!res.ok) throw new Error("Failed to fetch RSS");
        
        const xmlText = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 4);
        
        const parsedItems: NewsItem[] = items.map((item) => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          
          let dateStr = pubDate;
          try {
            const dateObj = new Date(pubDate);
            if (!isNaN(dateObj.getTime())) {
                dateStr = dateObj.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\//g, '.');
            }
          } catch (e) {}

          let thumbnail = "";
          
          // 1. media:thumbnail
          const mediaThumb = item.getElementsByTagName("media:thumbnail")[0];
          if (mediaThumb) {
             thumbnail = mediaThumb.getAttribute("url") || mediaThumb.textContent || "";
          }

          // 2. description img tag
          if (!thumbnail) {
            const desc = item.querySelector("description")?.textContent || "";
            const match = desc.match(/<img[^>]+src="([^">]+)"/);
            if (match) thumbnail = match[1];
          }

          // 3. content:encoded img tag
          if (!thumbnail) {
             const contentEncoded = item.getElementsByTagName("content:encoded")[0];
             const content = contentEncoded ? contentEncoded.textContent : (item.querySelector("content")?.textContent || "");
             
             if (content) {
                const match = content.match(/<img[^>]+src="([^">]+)"/);
                if (match) {
                    thumbnail = match[1];
                }
             }
          }

          return {
            title,
            url: link,
            date: dateStr,
            category: 'BLOG',
            thumbnail: thumbnail || undefined
          };
        });

        if (parsedItems.length > 0) {
            setNewsItems(parsedItems);
        }

      } catch (e) { 
        console.error("Failed to fetch note rss:", e); 
        // We do NOT set error state here to keep showing static items on failure, as requested.
      } finally { 
        setIsLoading(false); 
      }
    };

    fetchNews();
  }, []);

  const isPop = theme === ThemeType.POP;
  const isTropical = theme === ThemeType.TROPICAL;

  return (
    <>
      {theme === ThemeType.POP && <PopHero />}
      {theme === ThemeType.TROPICAL && <TropicalHero />}
      {theme === ThemeType.TRUST && <TrustHero />}

      <section id="what" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <span className={`inline-block px-5 py-2 text-sm md:text-xl font-bold mb-6 tracking-widest ${
              theme === ThemeType.POP ? 'bg-black text-white' : 
              theme === ThemeType.TROPICAL ? 'bg-white/20 text-white border border-white/40 rounded-full' : 
              'text-yuit-teal bg-teal-50 rounded-full'
            }`}>
              ABOUT US
            </span>
            <h2 className={`text-5xl md:text-9xl font-bold mb-14 ${theme === ThemeType.TROPICAL ? 'text-white drop-shadow-md' : 'text-slate-800'}`}>
              WHAT’s<br/>YUIT Inc.?
            </h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.6 }}
              className={`p-12 md:p-20 relative ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[12px_12px_0px_0px_#38B2AC]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl text-white shadow-2xl' :
                'bg-white shadow-xl rounded-2xl border-t-4 border-yuit-teal'
              }`}
            >
               <p className="text-2xl md:text-4xl font-bold leading-relaxed mb-10">
                 人と人の結びつきを意味する<br/>「
                 <motion.span 
                   variants={highlightCharVariants}
                   className={`inline-block ${theme === ThemeType.POP ? 'text-teal-500' : theme === ThemeType.TROPICAL ? 'text-cyan-200' : 'text-yuit-teal'}`}
                 >
                   結
                 </motion.span>
                 」と「
                 <motion.span 
                   variants={highlightCharVariants}
                   className={`inline-block ${theme === ThemeType.POP ? 'text-orange-500' : theme === ThemeType.TROPICAL ? 'text-orange-200' : 'text-yuit-orange'}`}
                 >
                   IT
                 </motion.span>
                 」。
               </p>
               <p className="text-xl md:text-3xl leading-loose opacity-90">
                 人と人、会社と会社を繋げていく。<br/>
                 そんな存在になりたいという思いを込めて <br/>
                 <span className="font-bold text-3xl md:text-5xl">YUIT</span> と名付けました。
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="service" className={`py-24 relative ${theme === ThemeType.TRUST ? 'bg-slate-50' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               <div className={`relative aspect-video w-full overflow-hidden ${
                 theme === ThemeType.POP ? 'border-4 border-black rounded-none shadow-[8px_8px_0px_0px_#ED8936]' :
                 theme === ThemeType.TROPICAL ? 'rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20' :
                 'rounded-lg shadow-lg'
               }`}>
                 <img src={SES_IMAGE_URL} alt="SES Business" className="w-full h-full object-cover" />
                 <div className={`absolute bottom-0 left-0 w-full p-8 ${
                   theme === ThemeType.POP ? 'bg-cyan-300 border-t-4 border-black' : 
                   theme === ThemeType.TROPICAL ? 'bg-gradient-to-t from-black/90 to-transparent text-white' : 
                   'bg-white/95 backdrop-blur-sm'
                 }`}>
                   <h3 className={`text-3xl md:text-6xl font-bold ${theme === ThemeType.TROPICAL ? 'text-white' : 'text-black'}`}>SES Business</h3>
                   <p className={`text-base md:text-2xl opacity-80 ${theme === ThemeType.TROPICAL ? 'text-gray-200' : 'text-gray-600'}`}>System Engineering Service</p>
                 </div>
               </div>
            </div>

            <div className={`w-full md:w-1/2 ${theme === ThemeType.TROPICAL ? 'text-white' : ''}`}>
              <h2 className={`text-4xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-10 ${
                theme === ThemeType.POP ? 'bg-black text-white inline-block px-6 py-3 transform -rotate-2' : 
                theme === ThemeType.TROPICAL ? 'text-cyan-100' :
                'text-slate-800 border-l-4 border-yuit-teal pl-6'
              }`}>
                事業内容：SES事業
              </h2>
              <p className="text-xl md:text-3xl mb-10 leading-relaxed opacity-90">
                YUITでは、未経験者からエンジニアを目指すことができる教育環境を提供しています。
                トレーナーによるサポートと実践的なカリキュラムで、あなたのエンジニアリングスキルを一から育みます。
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                 <div className={`p-6 flex items-start gap-6 ${
                   theme === ThemeType.POP ? 'bg-white border-2 border-black' : 
                   theme === ThemeType.TROPICAL ? 'bg-white/10 rounded-xl' : 'bg-white rounded shadow-sm border border-slate-100'
                 }`}>
                    <div className={`p-3 rounded-full ${theme === ThemeType.POP ? 'bg-yellow-300 border-2 border-black' : theme === ThemeType.TROPICAL ? 'bg-cyan-500/30' : 'bg-teal-50 text-teal-600'}`}>
                       <Zap size={24} className="md:w-10 md:h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-xl md:text-4xl">未経験からのキャリアアップ</h4>
                      <p className="text-base md:text-2xl opacity-80">独自のカリキュラムで基礎から応用までしっかりサポート。</p>
                    </div>
                 </div>
                 <div className={`p-6 flex items-start gap-6 ${
                   theme === ThemeType.POP ? 'bg-white border-2 border-black' : 
                   theme === ThemeType.TROPICAL ? 'bg-white/10 rounded-xl' : 'bg-white rounded shadow-sm border border-slate-100'
                 }`}>
                    <div className={`p-3 rounded-full ${theme === ThemeType.POP ? 'bg-pink-300 border-2 border-black' : theme === ThemeType.TROPICAL ? 'bg-pink-500/30' : 'bg-teal-50 text-teal-600'}`}>
                       <Anchor size={24} className="md:w-10 md:h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-xl md:text-4xl">多様なプロジェクト</h4>
                      <p className="text-base md:text-2xl opacity-80">大手企業からスタートアップまで、成長できる現場へアサイン。</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-24 relative overflow-hidden`}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
             <h2 className={`text-6xl md:text-9xl font-black mb-6 ${theme === ThemeType.TROPICAL ? 'text-white opacity-90' : 'text-slate-800'}`}>
               Philosophy
             </h2>
             <div className={`w-24 h-1.5 mx-auto ${theme === ThemeType.POP ? 'bg-black' : theme === ThemeType.TROPICAL ? 'bg-cyan-400' : 'bg-yuit-teal'}`}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className={`flex flex-col p-10 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#38B2AC]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-yuit-teal'
              }`}
            >
                <div className="mb-8">
                    <Zap size={48} className={`mb-6 md:w-16 md:h-16 ${theme === ThemeType.TROPICAL ? 'text-cyan-300' : 'text-yuit-teal'}`} />
                    <span className={`text-base md:text-2xl font-bold tracking-widest uppercase ${theme === ThemeType.TROPICAL ? 'text-cyan-200' : 'text-yuit-teal'}`}>
                        Mission
                    </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-6">挑戦をもっと身近に。</h3>
                <p className="opacity-80 leading-relaxed text-lg md:text-3xl">
                    ITで豊かな沖縄を、人生を、選択肢を創出するために挑戦し続けます。
                </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={`flex flex-col p-10 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED8936]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-yuit-orange'
              }`}
            >
                <div className="mb-8">
                    <Anchor size={48} className={`mb-6 md:w-16 md:h-16 ${theme === ThemeType.TROPICAL ? 'text-orange-300' : 'text-yuit-orange'}`} />
                    <span className={`text-base md:text-2xl font-bold tracking-widest uppercase ${theme === ThemeType.TROPICAL ? 'text-orange-200' : 'text-yuit-orange'}`}>
                        Vision
                    </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-6">信頼されるITエンジニアを輩出</h3>
                <p className="text-2xl md:text-4xl font-bold leading-relaxed">
                    沖縄の新たな可能性に貢献する。
                </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={`flex flex-col p-10 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED64A6]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-slate-700'
              }`}
            >
                 <div className="mb-8">
                    <Heart size={48} className={`mb-6 md:w-16 md:h-16 ${theme === ThemeType.POP ? 'text-pink-500' : theme === ThemeType.TROPICAL ? 'text-pink-300' : 'text-slate-700'}`} />
                    <span className={`text-base md:text-2xl font-bold tracking-widest uppercase ${theme === ThemeType.POP ? 'text-pink-500' : theme === ThemeType.TROPICAL ? 'text-pink-200' : 'text-slate-700'}`}>
                        Values
                    </span>
                </div>
                
                <ul className="space-y-8">
                    <li>
                        <h4 className="font-bold text-xl md:text-4xl">Try first</h4>
                        <p className="text-base md:text-2xl opacity-80">悩むなら、やってみよう</p>
                    </li>
                    <li>
                        <h4 className="font-bold text-xl md:text-4xl">Learn and Grow</h4>
                        <p className="text-base md:text-2xl opacity-80">学び、成長し続けよう</p>
                    </li>
                    <li>
                        <h4 className="font-bold text-xl md:text-4xl">YUIMA-RU</h4>
                        <p className="text-base md:text-2xl opacity-80">関わる全ての人を幸せにしよう</p>
                    </li>
                </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="overview" className={`py-24 relative ${theme === ThemeType.TRUST ? 'bg-slate-50' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className={`text-4xl md:text-8xl font-bold mb-16 text-center ${theme === ThemeType.TROPICAL ? 'text-white' : 'text-slate-800'}`}>
              Overview / 会社概要
            </h2>
            
            {theme === ThemeType.POP && <PopOverview />}
            {theme === ThemeType.TROPICAL && <TropicalOverview />}
            {theme === ThemeType.TRUST && <TrustOverview />}
            
          </div>
        </div>
      </section>

      <section id="news" className={`py-20 relative ${theme === ThemeType.TRUST ? 'bg-slate-50' : ''}`}>
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className={`inline-block px-4 py-1.5 text-sm md:text-xl font-bold mb-3 tracking-widest ${
                  theme === ThemeType.POP ? 'bg-black text-white' : 
                  theme === ThemeType.TROPICAL ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30 rounded-full' : 
                  'text-yuit-teal bg-teal-50 rounded'
                }`}>
                  LATEST INFO
                </span>
                <h2 className={`text-5xl md:text-8xl font-bold ${theme === ThemeType.TROPICAL ? 'text-white' : 'text-slate-800'}`}>
                  News & Topics
                </h2>
              </div>
              <a 
                href="https://note.com/yuit_note"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-lg md:text-3xl font-bold flex items-center gap-2 hover:underline ${theme === ThemeType.TROPICAL ? 'text-cyan-200' : 'text-slate-500'}`}
              >
                 View All <ChevronRight size={20} className="md:w-8 md:h-8" />
              </a>
           </div>

           {theme === ThemeType.POP && <PopNews items={newsItems} isLoading={isLoading} error={error} />}
           {theme === ThemeType.TROPICAL && <TropicalNews items={newsItems} isLoading={isLoading} error={error} />}
           {theme === ThemeType.TRUST && <TrustNews items={newsItems} isLoading={isLoading} error={error} />}
        </div>
      </section>

      {/* --- PRESIDENT BANNER --- */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
           <Link to="/president" className="block group">
             <div className={`relative overflow-hidden p-10 md:p-16 transition-all duration-300 transform group-hover:scale-[1.02] ${
               isPop ? 'bg-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_black] group-hover:shadow-[12px_12px_0px_0px_black]' :
               isTropical ? 'bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl' :
               'bg-slate-800 rounded-xl shadow-lg'
             }`}>
               {/* Background Decoration */}
               {isPop && <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300 rounded-full -mr-20 -mt-20 z-0"></div>}
               {isTropical && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-pulse z-0"></div>}
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                     <div className={`w-24 h-24 md:w-40 md:h-40 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 ${
                        isPop ? 'bg-white border-2 border-black' : 
                        isTropical ? 'bg-white/10 backdrop-blur border border-white/20' : 
                        'bg-white/10'
                     }`}>
                        <img src={PRESIDENT_IMAGE_URL} alt="盛島 加菜" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <span className={`inline-block px-4 py-1.5 text-sm md:text-xl font-bold mb-3 tracking-widest ${
                          isPop ? 'bg-black text-white' : isTropical ? 'bg-cyan-500 text-white' : 'bg-teal-500 text-white rounded'
                        }`}>MESSAGE</span>
                        <h3 className={`text-3xl md:text-6xl font-bold mb-3 ${isPop ? 'text-black' : 'text-white'}`}>
                          代表挨拶 / President Message
                        </h3>
                        <p className={`text-base md:text-2xl ${isPop ? 'text-gray-700' : 'text-gray-300'}`}>
                           代表取締役 盛島加菜からのメッセージをご覧いただけます。
                        </p>
                     </div>
                  </div>
                  <div className={`flex items-center gap-3 font-bold px-8 py-4 text-lg md:text-3xl transition-colors ${
                     isPop ? 'bg-white border-2 border-black group-hover:bg-black group-hover:text-white' : 
                     isTropical ? 'bg-white/20 hover:bg-white hover:text-blue-900 rounded-full border border-white/30' : 
                     'bg-white text-slate-800 rounded hover:bg-gray-100'
                  }`}>
                     Read Message <ArrowRight size={24} className="md:w-8 md:h-8" />
                  </div>
               </div>
             </div>
           </Link>
        </div>
      </section>

      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6">
          {theme === ThemeType.POP && <PopContact />}
          {theme === ThemeType.TROPICAL && <TropicalContact />}
          {theme === ThemeType.TRUST && <TrustContact />}
        </div>
      </section>
    </>
  );
};

// --- LAYOUT ---
const Layout = ({ children, theme, setTheme }: { children?: React.ReactNode, theme: ThemeType, setTheme: (t: ThemeType) => void }) => {
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
                return (
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
                     <img 
                       src={LOGO_URL} 
                       alt="YUIT Inc." 
                       className="h-16 w-auto object-contain bg-white rounded-xl p-2"
                     />
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
      
      <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />
    </div>
  );
};

// --- APP ---
const App = () => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.POP);

  return (
    <HashRouter>
      <Layout theme={theme} setTheme={setTheme}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/president" element={<President theme={theme} />} />
          <Route path="/recruit" element={<Recruit theme={theme} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;