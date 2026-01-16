import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeType, NewsItem } from './types';
import { MENU_ITEMS, COMPANY_OVERVIEW, SOCIAL_LINKS, NEWS_ITEMS as STATIC_NEWS_ITEMS } from './constants';
import { Logo } from './components/Logo';
import { Menu, X, Instagram, Mail, ExternalLink, Palmtree, Waves, Sun, Heart, Zap, Anchor, ArrowRight, Send, MapPin, ChevronRight, Paperclip, Briefcase, Laptop, Users, Sparkles, Smile, Quote, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';

// Image URLs - served from public/images
const GROUP_PHOTO_URL = "/images/group-photo.png";
const HERO_LEFT_IMAGE_URL = "/images/hero-left.jpg";
const HERO_RIGHT_IMAGE_URL = "/images/hero-right.png";
const SES_IMAGE_URL = "/images/ses.png";
const PRESIDENT_IMAGE_URL = "/images/president.jpg";
const LOGO_URL = "/images/yuit-logo.png";

// Fallback handler for broken images
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
};

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
                   <img src={PRESIDENT_IMAGE_URL} alt="盛島 加菜" className="w-full h-full object-cover" loading="lazy" decoding="async" onError={handleImageError} />
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
                         <a
                           href="https://en-gage.net/yuit-inc_recruit/"
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`inline-flex items-center gap-2 px-10 py-5 text-xl md:text-4xl font-bold transition-transform hover:scale-105 ${
                             isPop ? 'bg-black text-white border-4 border-transparent hover:bg-white hover:text-black hover:border-black shadow-[4px_4px_0px_0px_#ED8936]' :
                             isTropical ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg' :
                             'bg-slate-800 text-white rounded hover:bg-teal-600 shadow-md'
                           }`}
                         >
                            採用情報を見る <ArrowRight size={24} className="md:w-10 md:h-10" />
                         </a>
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
  <div className="relative min-h-[90vh] lg:min-h-[78vh] flex items-center justify-center overflow-hidden bg-yellow-50 pt-28 pb-16 lg:pt-20 lg:pb-12">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
      >
        <Sun size={160} className="text-yellow-200" />
      </motion.div>
      <div className="absolute top-24 lg:top-12 left-10 text-cyan-400 transform -rotate-12 hidden md:block">
        <Palmtree size={140} strokeWidth={2.5} className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-teal-500 fill-teal-100" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-cyan-300 border-t-4 border-black flex items-end">
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
        className="relative w-full max-w-[90vw] xl:max-w-7xl mb-8 flex justify-center items-center lg:-translate-y-6"
      >
        {/* Center Photo Container - serves as anchor */}
        <div className="relative w-full lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl z-20">
          {/* Scale Wrapper - separated from Framer Motion to avoid transform conflict */}
          <div className="lg:scale-[0.8] xl:scale-[0.88] 2xl:scale-95 origin-top">

            {/* Left Side Image (Absolute relative to Center) */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[95%] lg:w-[50%] xl:w-[55%] 2xl:w-[65%] z-10 transform -rotate-6 origin-right">
                <div className="bg-white p-3 border-4 border-black shadow-[12px_12px_0px_0px_#ED8936]">
                    <div className="border-2 border-black">
                        <img src={HERO_LEFT_IMAGE_URL} alt="" className="w-full h-auto" loading="lazy" decoding="async" onError={handleImageError} />
                    </div>
                </div>
            </div>

            {/* Right Side Image (Absolute relative to Center) */}
            <div className="hidden lg:block absolute top-[60%] -translate-y-1/2 left-[95%] lg:w-[50%] xl:w-[55%] 2xl:w-[65%] z-10 transform rotate-6 origin-left">
                <div className="bg-white p-3 border-4 border-black shadow-[12px_12px_0px_0px_#ED8936]">
                    <div className="border-2 border-black">
                        <img src={HERO_RIGHT_IMAGE_URL} alt="" className="w-full h-auto" loading="lazy" decoding="async" onError={handleImageError} />
                    </div>
                </div>
            </div>

            {/* Center Image Content */}
            <div className="bg-white p-4 border-4 border-black shadow-[16px_16px_0px_0px_#ED8936] transform -rotate-2 hover:rotate-0 transition-transform duration-300 relative z-20">
                <div className="relative border-2 border-black">
                    <img src={GROUP_PHOTO_URL} alt="YUIT Team" className="w-full h-auto" loading="eager" decoding="async" onError={handleImageError} />
                    <div className="absolute -top-8 -right-6 md:-top-12 md:-right-10 bg-pink-500 text-white font-black px-6 py-3 md:px-12 md:py-5 border-2 border-black shadow-[4px_4px_0px_0px_black] transform rotate-3 text-2xl md:text-7xl z-30 whitespace-nowrap">
                        WE ARE YUIT!
                    </div>
                </div>
            </div>

          </div>
        </div>
      </motion.div>
      
      <div className="flex items-center justify-center gap-4 md:block relative z-30 -translate-y-8 lg:-translate-y-10">
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
           ) : item.label === '所在地' ? (
             <>〒902-0067<br/>沖縄県那覇市安里381-1<br/>ZORKS沖縄 8F</>
           ) : item.label === '事業内容' ? (
             <>SES事業<br/>エンジニア育成事業</>
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
                 <img src={item.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" onError={handleImageError} />
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

const PopContact = () => {
  const [name, setName] = useState('');
  const [kana, setKana] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const MAX_FILES = 3;
  const MAX_TOTAL_SIZE = 30 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'pdf'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const fileArray = Array.from(selectedFiles);

    // Validate file count
    if (fileArray.length > MAX_FILES) {
      setSubmitResult({ type: 'error', message: `添付ファイルは最大${MAX_FILES}点までです` });
      e.target.value = '';
      return;
    }

    // Validate total size
    const totalSize = fileArray.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      setSubmitResult({ type: 'error', message: '添付ファイルの合計サイズが30MBを超えています' });
      e.target.value = '';
      return;
    }

    // Validate extensions
    for (const file of fileArray) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setSubmitResult({ type: 'error', message: `対応していないファイル形式です: ${file.name}` });
        e.target.value = '';
        return;
      }
    }

    // All validations passed
    setFiles(fileArray);
    setSubmitResult(null);
  };

  const resetForm = () => {
    setName('');
    setKana('');
    setPhone('');
    setEmail('');
    setCategory('');
    setMessage('');
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    // Validation
    if (!name.trim()) {
      setSubmitResult({ type: 'error', message: '氏名・会社名は必須です' });
      return;
    }
    if (!email.trim()) {
      setSubmitResult({ type: 'error', message: 'メールアドレスは必須です' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitResult({ type: 'error', message: 'メールアドレスの形式が正しくありません' });
      return;
    }
    if (!category) {
      setSubmitResult({ type: 'error', message: 'お問い合わせ項目を選択してください' });
      return;
    }

    // File validation
    if (files.length > MAX_FILES) {
      setSubmitResult({ type: 'error', message: `添付ファイルは最大${MAX_FILES}点までです` });
      return;
    }
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      setSubmitResult({ type: 'error', message: '添付ファイルの合計サイズが30MBを超えています' });
      return;
    }
    for (const file of files) {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setSubmitResult({ type: 'error', message: `対応していないファイル形式です: ${file.name}` });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('category', category);
      if (kana) formData.append('kana', kana);
      if (phone) formData.append('phone', phone);
      if (message) formData.append('message', message);
      for (const file of files) {
        formData.append('attachments', file);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.ok) {
        setSubmitResult({ type: 'success', message: 'お問い合わせを送信しました。ありがとうございます！' });
        resetForm();
      } else {
        setSubmitResult({ type: 'error', message: data.message || '送信に失敗しました' });
      }
    } catch {
      setSubmitResult({ type: 'error', message: 'ネットワークエラーが発生しました' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <form onSubmit={handleSubmit} className="bg-white p-8 border-4 border-black space-y-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
           <div className="space-y-6">
               <div>
                  <label className="block font-black mb-2 text-lg md:text-3xl">氏名・会社名 <span className="text-pink-500">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
               </div>
               <div>
                  <label className="block font-black mb-2 text-lg md:text-3xl">フリガナ</label>
                  <input type="text" value={kana} onChange={(e) => setKana(e.target.value)} className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
               </div>
               <div>
                  <label className="block font-black mb-2 text-lg md:text-3xl">電話番号（ハイフンなし）</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
               </div>
               <div>
                  <label className="block font-black mb-2 text-lg md:text-3xl">メールアドレス <span className="text-pink-500">*</span></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none" />
               </div>
               <div>
                  <label className="block font-black mb-2 text-lg md:text-3xl">お問い合わせ項目 <span className="text-pink-500">*</span></label>
                  <div className="relative border-2 border-black bg-gray-50">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 font-bold text-lg md:text-3xl bg-transparent appearance-none focus:outline-none">
                       <option value="">選択してください</option>
                       <option value="事業内容について">事業内容について</option>
                       <option value="採用について">採用について</option>
                       <option value="その他">その他</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                       <ChevronRight size={20} className="md:w-8 md:h-8" />
                    </div>
                  </div>
               </div>
               <div>
                  <label className="block font-black mb-2 text-lg md:text-3xl">お問い合わせ内容</label>
                  <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-gray-50 border-2 border-black p-3 font-bold text-lg md:text-3xl focus:bg-cyan-50 focus:outline-none"></textarea>
               </div>
               <div>
                  <label className="block font-black mb-2 text-lg md:text-3xl">添付ファイル（任意）</label>
                  <label className="flex items-center gap-3 w-full bg-gray-100 border-2 border-black border-dashed p-6 cursor-pointer hover:bg-cyan-50 transition-colors">
                    <Paperclip size={24} className="md:w-8 md:h-8" />
                    <span className="font-bold text-base md:text-2xl">ファイルの選択</span>
                    <input ref={fileInputRef} type="file" multiple accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {files.map((file, idx) => (
                        <p key={idx} className="text-sm md:text-xl font-bold text-teal-600">{file.name}</p>
                      ))}
                    </div>
                  )}
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
                   <Link to="/privacy-policy" className="underline decoration-2 underline-offset-2 hover:text-cyan-600">プライバシーポリシー</Link>
                   に同意する
                 </label>
               </div>
           </div>
           {submitResult && (
             <div className={`p-4 border-2 border-black font-bold text-lg md:text-2xl ${submitResult.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
               {submitResult.message}
             </div>
           )}
           <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-black py-5 text-xl md:text-4xl border-2 border-black hover:bg-teal-500 hover:text-black transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#ED8936] disabled:opacity-50 disabled:cursor-not-allowed">
             {isSubmitting ? '送信中...' : '送信する'} {!isSubmitting && <Send size={24} className="md:w-8 md:h-8" />}
           </button>
        </form>
      </div>
    </div>
  );
};

// --- PRIVACY POLICY PAGE COMPONENT ---
const PrivacyPolicy = ({ theme }: { theme: ThemeType }) => {
  const isPop = theme === ThemeType.POP;

  const sectionHeadingClass = "text-xl md:text-3xl font-extrabold mt-10 mb-3";
  const bodyTextClass = "text-base md:text-xl leading-relaxed";

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isPop ? 'bg-yellow-50' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl md:text-7xl font-black mb-12 ${isPop ? 'bg-white border-4 border-black inline-block px-8 py-4 shadow-[8px_8px_0px_0px_#38B2AC]' : ''}`}>
            Privacy Policy
          </h1>

          <div className={`text-left ${isPop ? 'bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_black]' : 'bg-white p-8 md:p-12 shadow-lg rounded-xl'}`}>
            <p className={bodyTextClass}>
              株式会社 YUITは個人情報取り扱い事業者として個人情報保護に関連する法令を遵守し、ご提供いただく個人情報について、細心の注意を払って取り扱い、管理致します。
            </p>

            <h2 className={sectionHeadingClass}>1. 個人情報の定義</h2>
            <p className={bodyTextClass}>
              本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義される個人情報を意味するものとします。 例）氏名、性別、生年月日、住所、電話番号、メールアドレス、職業、ご契約情報等、特定の個人が識別され得るもの
            </p>

            <h2 className={sectionHeadingClass}>2. 個人情報の利用目的</h2>
            <p className={bodyTextClass}>
              当社は、個人情報を以下の目的で利用します。
            </p>
            <ol className={`${bodyTextClass} list-decimal list-inside mt-2 ml-4`}>
              <li>お電話あるいはダイレクトメール等により、当社の事業または商品のご案内のため</li>
              <li>契約締結後のサービス提供またご案内のため</li>
              <li>当社サービス導入意思決定後の契約の締結、情報の提供、取引の履行のため</li>
              <li>当社新入社員・中途社員募集の採用選考のため</li>
              <li>上記1～4の利用目的に準じ、お客様の同意を得た上で、必要範囲内で第三者へ提供するため</li>
              <li>上記1～5の該当の有無に関わらず、ご本人様の申し出があった時点で個人情報の削除を実施します</li>
            </ol>

            <h2 className={sectionHeadingClass}>3. 第三者への提供</h2>
            <p className={bodyTextClass}>
              当社は、個人情報を以下の場合を除いては第三者への開示・提供は行わないものとします。
            </p>
            <ol className={`${bodyTextClass} list-decimal list-inside mt-2 ml-4`}>
              <li>お客様の同意がある場合。</li>
              <li>お客様個人を識別できない状況で開示する場合。</li>
              <li>上記利用目的を円滑に達成する為、業務委託先、又は提携先に預託する場合。</li>
              <li>法令等に基づき、裁判所、警察機関などの公的機関から開示の要請があった場合。</li>
              <li>公衆衛生上、または児童の健全な育成推進に特に必要であり、お客様の同意を得ることが困難な場合。</li>
              <li>国の機関や地方公共団体などが法令上の事務を遂行するのに協力が必要で、お客様の同意を得ることにより当該事務の遂行に支障を及ぼす恐れがある場合。</li>
            </ol>

            <h2 className={sectionHeadingClass}>4. 個人情報の管理</h2>
            <p className={bodyTextClass}>
              個人情報は正確かつ最新の状態に保ち、個人情報への不正アクセス、紛失、改ざん及び漏洩等の予防に努めます。 個人情報を取り扱う部門に関し責任者を置き、適切な管理を行います。
            </p>

            <h2 className={sectionHeadingClass}>5. 個人情報の開示及び訂正、削除、利用の停止</h2>
            <p className={bodyTextClass}>
              当社は、お客様ご本人からご自身に関する個人情報の訂正、削除のお申し出があり、ご本人確認が可能な場合は速やかに対応いたします。
            </p>
            <ol className={`${bodyTextClass} list-decimal list-inside mt-2 ml-4`}>
              <li>当社からお客様に送付するサービス、商品のご案内やその他の通知について、お客様が送付の停止を希望される場合は、当社までご連絡下さい。</li>
              <li>お客様が当社に対し、当社が保有しているお客様の個人情報の開示及び個人情報の訂正、追加または削除を請求される場合は、書面または電子メールによりご請求下さい。なお、この場合、当社は請求者に対して、請求者が請求の対象である個人情報に係るお客様本人であることを確認する為、当該確認に必要な書類等の提示を求める可能性があります。</li>
            </ol>

            <h2 className={sectionHeadingClass}>6. リンク先における個人情報の取り扱い</h2>
            <p className={bodyTextClass}>
              本ホームページではお客様に対し有用な情報・サービスを提供する為に、他の会社のホームページへのリンクを紹介することがございます。 リンク先のホームページにて行われる個人情報の収集に関しましては、当社は一切管理責任を負いません。お客様ご自身の判断によってご利用下さい。
            </p>

            <h2 className={sectionHeadingClass}>7. 個人情報窓口</h2>
            <p className={bodyTextClass}>
              弊社への個人情報に関する（訂正・削除・使用停止等）お問合せは、以下にて受け付けております。
            </p>
            <div className={`${bodyTextClass} mt-4 ml-4`}>
              <p>名称　：    株式会社 YUIT</p>
              <p>管理部：    盛島加菜</p>
              <p>所在地：    〒902-0067</p>
              <p>　　　　    沖縄県那覇市安里381-1</p>
              <p>　　　　    ZORKS沖縄 8F</p>
              <p>E-mail：    info@yuit-inc.jp</p>
            </div>
          </div>

          <Link
            to="/"
            className={`inline-flex items-center gap-3 mt-12 px-8 py-4 font-bold text-lg md:text-2xl transition-colors ${
              isPop
                ? 'bg-black text-white border-4 border-black hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_#38B2AC]'
                : 'bg-slate-800 text-white rounded hover:bg-slate-700'
            }`}
          >
            <ArrowRight size={24} className="rotate-180" />
            トップページに戻る
          </Link>
        </div>
      </div>
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
      <PopHero />

      <section id="what" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block px-5 py-2 text-sm md:text-xl font-bold mb-6 tracking-widest bg-black text-white">
              ABOUT US
            </span>
            <h2 className="text-5xl md:text-9xl font-bold mb-14 text-slate-800">
              WHAT’s<br/>YUIT Inc.?
            </h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.6 }}
              className="p-12 md:p-20 relative bg-white border-4 border-black shadow-[12px_12px_0px_0px_#38B2AC]"
            >
               <p className="text-2xl md:text-4xl font-bold leading-relaxed mb-10">
                 人と人の結びつきを意味する<br/>「
                 <motion.span 
                   variants={highlightCharVariants}
                   className="inline-block text-teal-500"
                 >
                   結
                 </motion.span>
                 」と「
                 <motion.span 
                   variants={highlightCharVariants}
                   className="inline-block text-orange-500"
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

      <section id="service" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               <div className="relative aspect-video w-full overflow-hidden border-4 border-black rounded-none shadow-[8px_8px_0px_0px_#ED8936]">
                 <img src={SES_IMAGE_URL} alt="SES事業" className="w-full h-full object-cover" loading="lazy" decoding="async" onError={handleImageError} />
                 <div className="absolute bottom-0 left-0 w-full p-8 bg-cyan-300 border-t-4 border-black">
                   <h3 className="text-3xl md:text-6xl font-bold text-black">SES事業</h3>
                   <p className="text-base md:text-2xl opacity-80 text-gray-600">System Engineering Service</p>
                 </div>
               </div>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-xl md:text-3xl mb-10 leading-relaxed opacity-90">
                YUITでは、未経験者からエンジニアを目指すことができる教育環境を提供しています。
                トレーナーによるサポートと実践的なカリキュラムで、あなたのエンジニアリングスキルを一から育みます。
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                 <div className="p-6 flex items-start gap-6 bg-white border-2 border-black">
                    <div className="p-3 rounded-full bg-yellow-300 border-2 border-black">
                       <Zap size={24} className="md:w-10 md:h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-xl md:text-4xl">未経験からのキャリアアップ</h4>
                      <p className="text-base md:text-2xl opacity-80">独自のカリキュラムで基礎から応用までしっかりサポート。</p>
                    </div>
                 </div>
                 <div className="p-6 flex items-start gap-6 bg-white border-2 border-black">
                    <div className="p-3 rounded-full bg-pink-300 border-2 border-black">
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
              className={`flex flex-col items-center text-center p-10 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#38B2AC]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-yuit-teal'
              }`}
            >
                <div className="mb-8 flex flex-col items-center">
                    <Zap size={48} className={`mb-6 md:w-16 md:h-16 ${theme === ThemeType.TROPICAL ? 'text-cyan-300' : 'text-yuit-teal'}`} />
                    <span className={`text-base md:text-2xl font-bold tracking-widest uppercase ${theme === ThemeType.TROPICAL ? 'text-cyan-200' : 'text-yuit-teal'}`}>
                        Mission
                    </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold mb-6">挑戦をもっと身近に。</h3>
                <p className="opacity-80 leading-relaxed text-base md:text-2xl">
                    ITで豊かな<br/>
                    沖縄を、人生を、選択肢を<br/>
                    創出するために<br/>
                    挑戦し続けます
                </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center text-center p-10 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED8936]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-yuit-orange'
              }`}
            >
                <div className="mb-8 flex flex-col items-center">
                    <Anchor size={48} className={`mb-6 md:w-16 md:h-16 ${theme === ThemeType.TROPICAL ? 'text-orange-300' : 'text-yuit-orange'}`} />
                    <span className={`text-base md:text-2xl font-bold tracking-widest uppercase ${theme === ThemeType.TROPICAL ? 'text-orange-200' : 'text-yuit-orange'}`}>
                        Vision
                    </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold leading-relaxed">
                    信頼される<br/>
                    ITエンジニアを輩出し<br/>
                    沖縄の新たな<br/>
                    可能性に貢献する
                </h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center text-center p-10 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED64A6]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-slate-700'
              }`}
            >
                 <div className="mb-8 flex flex-col items-center">
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

      <section id="overview" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-8xl font-bold mb-16 text-center text-slate-800">
              Overview
            </h2>
            
            <PopOverview />
            
          </div>
        </div>
      </section>

      <section id="news" className="py-20 relative">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="inline-block px-4 py-1.5 text-sm md:text-xl font-bold mb-3 tracking-widest bg-black text-white">
                  LATEST INFO
                </span>
                <h2 className="text-5xl md:text-8xl font-bold text-slate-800">
                  News & Topics
                </h2>
              </div>
              <a 
                href="https://note.com/yuit_note"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg md:text-3xl font-bold flex items-center gap-2 hover:underline text-slate-500"
              >
                 View All <ChevronRight size={20} className="md:w-8 md:h-8" />
              </a>
           </div>

           <PopNews items={newsItems} isLoading={isLoading} error={error} />
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
                        <img src={PRESIDENT_IMAGE_URL} alt="盛島 加菜" className="w-full h-full object-cover" loading="lazy" decoding="async" onError={handleImageError} />
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
               </div>
             </div>
           </Link>
        </div>
      </section>

      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <PopContact />
        </div>
      </section>
    </>
  );
};

// --- LAYOUT ---
const Layout = ({ children, theme }: { children?: React.ReactNode, theme: ThemeType }) => {
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

// --- APP ---
const App = () => {
  const theme = ThemeType.POP;

  return (
    <HashRouter>
      <Layout theme={theme}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/president" element={<President theme={theme} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;