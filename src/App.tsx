import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeType, NewsItem } from './types';
import { MENU_ITEMS, COMPANY_OVERVIEW, SOCIAL_LINKS, NEWS_ITEMS as STATIC_NEWS_ITEMS } from './constants';
import { Logo } from './components/Logo';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Menu, X, Instagram, Mail, ExternalLink, Palmtree, Waves, Sun, Heart, Zap, Anchor, ArrowRight, Send, MapPin, ChevronRight, Paperclip, Briefcase, Laptop, Users, Sparkles, FileText, Smartphone, Smile, Quote, RefreshCw, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';

// Cloudflare Worker URL (デプロイしたURLに書き換えてください)
// 正しいURL形式: "https://[YOUR_WORKER].workers.dev/note-latest"
const NOTE_API_URL = "YOUR_WORKER_URL_HERE"; 

// Placeholder for the group photo provided by user
const GROUP_PHOTO_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/37b3eb57fb783d4abd67557b53fc85fa2c08b548/images/YUIT%E9%9B%86%E5%90%88%E5%86%99%E7%9C%9F.png";

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
    <div ref={ref} className="text-xl sm:text-3xl md:text-5xl font-black text-center leading-tight bg-white border-4 border-black px-4 md:px-8 py-4 shadow-[8px_8px_0px_0px_#38B2AC] transform rotate-1 whitespace-nowrap min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-center justify-center">
      <span>{text}</span>
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block w-0.5 h-6 sm:h-8 md:h-10 bg-black align-middle"
      />
    </div>
  );
};

// --- ICONS ---
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const NoteIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
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
    ? "text-4xl md:text-5xl font-black mb-8 bg-white border-4 border-black inline-block px-6 py-3 shadow-[8px_8px_0px_0px_#ED8936] transform -rotate-1"
    : isTropical 
      ? "text-4xl md:text-6xl font-bold mb-8 text-cyan-200 drop-shadow-lg"
      : "text-4xl md:text-5xl font-bold mb-10 text-slate-800 border-l-8 border-teal-600 pl-6";

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
             <p className={`text-lg font-bold tracking-widest ${isTropical ? 'text-white/80' : 'text-slate-500'}`}>
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
                   <Users size={120} className={isTropical ? "text-white/50" : "text-gray-400"} />
                </div>
                
                <div className={`text-center ${isPop ? 'bg-white border-4 border-black p-4' : ''}`}>
                   <h2 className={`text-2xl font-bold mb-2 ${isTropical ? 'text-white' : 'text-slate-800'}`}>盛島 加菜</h2>
                   <p className={`text-sm font-bold opacity-70 ${isTropical ? 'text-cyan-200' : 'text-teal-600'}`}>Kana Morishima / CEO</p>
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

                   <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                      isPop ? 'text-pink-600' : isTropical ? 'text-pink-300' : 'text-teal-600'
                   }`}>
                      <Smile size={32} /> はじめまして! 代表の盛島加菜です
                   </h3>

                   <div className="space-y-6 text-lg leading-relaxed opacity-90 mb-10">
                      <p>
                        1994年、宜野湾市で生まれ。
                      </p>
                      
                      {/* Career Path Visualization */}
                      <div className={`flex flex-wrap items-center gap-2 text-sm font-bold my-6 ${isTropical ? 'text-cyan-100' : 'text-slate-600'}`}>
                         <span className={`px-3 py-1 rounded-full ${isPop ? 'bg-black text-white' : isTropical ? 'bg-white/20' : 'bg-slate-200'}`}>コザ高校</span>
                         <ArrowRight size={16} />
                         <span className={`px-3 py-1 rounded-full ${isPop ? 'bg-black text-white' : isTropical ? 'bg-white/20' : 'bg-slate-200'}`}>琉球大学</span>
                         <ArrowRight size={16} />
                         <span className={`px-3 py-1 rounded-full ${isPop ? 'bg-black text-white' : isTropical ? 'bg-white/20' : 'bg-slate-200'}`}>ウガンダで体育教師</span>
                         <ArrowRight size={16} />
                         <span className={`px-3 py-1 rounded-full ${isPop ? 'bg-pink-500 text-white' : isTropical ? 'bg-pink-500/50' : 'bg-teal-100 text-teal-700'}`}>未経験からWEBエンジニア</span>
                         <ArrowRight size={16} />
                         <span className={`px-3 py-1 rounded-full ${isPop ? 'bg-cyan-400 text-black border-2 border-black' : isTropical ? 'bg-cyan-500 text-white' : 'bg-teal-600 text-white'}`}>沖縄でYUITを起業</span>
                      </div>

                      <p>
                        というキャリアを歩んできました!
                      </p>
                      <p>
                        沖縄でも未経験からWEBエンジニアを目指せる環境を作りたいと思い、立ち上げたYUITですが、創業当初は、お金の問題や私の経営能力の不足などにより、悩める日々を過ごしていました・・・・。
                      </p>
                      <p>
                        ただ、当初掲げた思いを強くもち仲間とともに頑張ってきた結果・・・・・<br/>
                        <span className={`font-bold text-xl ${isPop ? 'bg-yellow-200 px-1' : isTropical ? 'text-yellow-300' : 'text-teal-600'}`}>
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
                      <h4 className="text-xl font-bold mb-6 text-center">■こんなあなたを待っています■</h4>
                      <ul className="grid md:grid-cols-2 gap-4">
                        {[
                          "キャリアチェンジしたい!",
                          "楽しい会社に出会いたい!",
                          "YUITという会社が気になる!",
                          "盛島と話をしてみたい!"
                        ].map((item, i) => (
                           <li key={i} className={`flex items-center gap-2 font-bold ${isPop ? 'text-black' : isTropical ? 'text-white' : 'text-slate-700'}`}>
                              <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${
                                 isPop ? 'bg-cyan-400 text-black' : isTropical ? 'bg-cyan-500 text-white' : 'bg-teal-500 text-white'
                              }`}>✓</span>
                              {item}
                           </li>
                        ))}
                      </ul>
                      <div className="mt-8 text-center">
                         <p className="font-bold mb-6">
                           一度気軽にお話しましょう!<br/>
                           私のエンジニア挑戦での失敗経験なども包み隠さずお話します!
                         </p>
                         <Link 
                           to="/recruit"
                           className={`inline-flex items-center gap-2 px-8 py-4 text-lg font-bold transition-transform hover:scale-105 ${
                             isPop ? 'bg-black text-white border-4 border-transparent hover:bg-white hover:text-black hover:border-black shadow-[4px_4px_0px_0px_#ED8936]' :
                             isTropical ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-lg' :
                             'bg-slate-800 text-white rounded hover:bg-teal-600 shadow-md'
                           }`}
                         >
                            採用情報を見る <ArrowRight size={20} />
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
  <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-yellow-50 pt-20">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
      >
        <Sun size={140} className="text-yellow-200" />
      </motion.div>
      <div className="absolute top-40 left-10 text-cyan-400 transform -rotate-12 hidden md:block">
        <Palmtree size={120} strokeWidth={2.5} className="drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-teal-500 fill-teal-100" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-cyan-300 border-t-4 border-black flex items-end overflow-hidden">
         <div className="w-full flex justify-between px-10 pb-4">
            {[...Array(12)].map((_, i) => (
               <Waves key={i} size={48} className="text-white animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
         </div>
      </div>
    </div>

    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative max-w-2xl w-full mb-12"
      >
        <div className="bg-white p-4 border-4 border-black shadow-[16px_16px_0px_0px_#ED8936] transform -rotate-2 hover:rotate-0 transition-transform duration-300 relative z-0">
            <div className="relative border-2 border-black">
                <img src={GROUP_PHOTO_URL} alt="YUIT Team" className="w-full h-auto" />
                <div className="absolute -top-6 -right-4 bg-pink-500 text-white font-black px-6 py-2 border-2 border-black shadow-[4px_4px_0px_0px_black] transform rotate-3 text-xl z-20">
                    WE ARE YUIT!
                </div>
            </div>
        </div>
      </motion.div>
      
      <div className="flex items-center justify-center gap-3 md:block">
          <div className="md:hidden transform -rotate-12 flex-shrink-0">
            <Palmtree size={56} strokeWidth={2.5} className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-teal-500 fill-teal-100" />
          </div>
          <TypingTitle />
      </div>
    </div>
  </div>
);

const PopOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {COMPANY_OVERVIEW.map((item, idx) => (
      <motion.div 
        key={item.label}
        whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
        className={`bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl relative overflow-hidden ${idx === 0 ? 'md:col-span-2' : ''}`}
      >
        <div className="absolute top-0 right-0 p-2 opacity-10">
            {idx % 2 === 0 ? <Waves size={40} /> : <Palmtree size={40} />}
        </div>
        <div className={`text-sm font-black mb-3 uppercase border-b-4 border-black inline-block px-2 ${
            idx % 2 === 0 ? 'bg-cyan-200' : 'bg-pink-200'
        }`}>{item.label}</div>
        <div className="text-xl font-bold font-pop text-black leading-snug relative z-10">
           {item.value}
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
          <div key={i} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black] animate-pulse h-24">
            <div className="h-4 bg-gray-200 w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-4 border-black p-8 text-center text-red-600 font-black shadow-[4px_4px_0px_0px_black]">
        <AlertCircle className="mx-auto mb-2" size={32} />
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
          className="block bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_black] flex flex-col md:flex-row md:items-center gap-4 group"
        >
          {item.thumbnail && (
            <div className="flex-shrink-0 w-full md:w-20 md:h-20 border-2 border-black overflow-hidden bg-gray-100">
               <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex items-center gap-3 min-w-[140px]">
            <span className="font-bold text-gray-500 text-sm">{item.date}</span>
            <span className={`px-2 py-0.5 text-xs font-black border-2 border-black ${
              item.category === 'INFO' ? 'bg-cyan-200' : item.category === 'RECRUIT' ? 'bg-pink-300' : 'bg-yellow-300'
            }`}>
              {item.category}
            </span>
          </div>
          <h3 className="flex-1 font-bold text-lg group-hover:text-teal-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <div className="bg-black text-white p-1 rounded-full group-hover:bg-teal-500 transition-colors self-start md:self-center ml-auto md:ml-0">
            <ChevronRight size={20} />
          </div>
        </motion.a>
      ))}
    </div>
  );
};

const PopContact = () => (
  <div className="bg-orange-300 border-4 border-black p-8 shadow-[12px_12px_0px_0px_black] relative overflow-hidden">
    <div className="absolute -right-10 -top-10 text-orange-400 opacity-50 rotate-12">
      <Mail size={200} />
    </div>
    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
      <div className="lg:sticky lg:top-24">
        <h3 className="text-4xl font-black mb-4 bg-white inline-block px-4 py-1 border-4 border-black transform -rotate-2">
          Contact Us
        </h3>
        <p className="font-bold text-xl mb-6">
          お仕事のご依頼、採用についてなど、<br/>お気軽にお問い合わせください！
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-bold bg-white/50 p-2 rounded border-2 border-black w-fit">
            <Mail size={24} /> <span>info@yuit-inc.jp</span>
          </div>
          <div className="flex items-center gap-3 font-bold bg-white/50 p-2 rounded border-2 border-black w-fit">
            <MapPin size={24} /> <span>沖縄県那覇市安里381-1</span>
          </div>
        </div>
      </div>
      <form className="bg-white p-6 border-4 border-black space-y-4 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
         <div className="space-y-4">
             <div>
                <label className="block font-black mb-1">氏名・会社名 <span className="text-pink-500">*</span></label>
                <input type="text" required className="w-full bg-gray-50 border-2 border-black p-2 font-bold focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-1">フリガナ</label>
                <input type="text" className="w-full bg-gray-50 border-2 border-black p-2 font-bold focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-1">電話番号（ハイフンなし）</label>
                <input type="tel" className="w-full bg-gray-50 border-2 border-black p-2 font-bold focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-1">メールアドレス <span className="text-pink-500">*</span></label>
                <input type="email" required className="w-full bg-gray-50 border-2 border-black p-2 font-bold focus:bg-cyan-50 focus:outline-none" />
             </div>
             <div>
                <label className="block font-black mb-1">お問い合わせ項目 <span className="text-pink-500">*</span></label>
                <div className="relative border-2 border-black bg-gray-50">
                  <select required className="w-full p-2 font-bold bg-transparent appearance-none focus:outline-none">
                     <option value="">選択してください</option>
                     <option value="business">事業内容について</option>
                     <option value="recruit">採用について</option>
                     <option value="other">その他</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                     <ChevronRight size={16} />
                  </div>
                </div>
             </div>
             <div>
                <label className="block font-black mb-1">お問い合わせ内容</label>
                <textarea rows={4} className="w-full bg-gray-50 border-2 border-black p-2 font-bold focus:bg-cyan-50 focus:outline-none"></textarea>
             </div>
             <div>
                <label className="block font-black mb-1">添付ファイル（任意）</label>
                <label className="flex items-center gap-2 w-full bg-gray-100 border-2 border-black border-dashed p-4 cursor-pointer hover:bg-cyan-50 transition-colors">
                  <Paperclip size={20} />
                  <span className="font-bold text-sm">ファイルの選択</span>
                  <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
                </label>
                <div className="text-xs mt-2 font-bold text-gray-600 space-y-1">
                   <p>会社概要などございましたらご提出ください。</p>
                   <p>・添付数：最大3点</p>
                   <p>・ファイルサイズ：合計30.0MB以下</p>
                   <p>・ファイル拡張子：png / jpg / pdf / jpeg</p>
                </div>
             </div>
             <div className="flex items-start gap-2 pt-2">
               <input type="checkbox" id="privacy-pop" required className="mt-1.5 w-4 h-4 border-2 border-black rounded-none text-cyan-500 focus:ring-0 cursor-pointer" />
               <label htmlFor="privacy-pop" className="text-sm font-bold cursor-pointer">
                 <a href="https://yuit-inc.jp/privacy.html" target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-2 hover:text-cyan-600">プライバシーポリシー</a>
                 に同意する
               </label>
             </div>
         </div>
         <button className="w-full bg-black text-white font-black py-4 border-2 border-black hover:bg-teal-500 hover:text-black transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#ED8936]">
           送信する <Send size={18} />
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
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
          Connect<br/>
          <span className="text-cyan-200">The Future</span>
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-8 font-light tracking-wide border-l-4 border-cyan-300 pl-6">
          沖縄から世界へ。<br/>
          ITの力で、新しい価値と可能性を結びます。
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }}
        className="md:w-1/2 p-4 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl w-full max-w-xl"
      >
        <div className="rounded-[1.5rem] overflow-hidden shadow-inner relative group">
             <img src={GROUP_PHOTO_URL} alt="YUIT Team" className="w-full h-auto opacity-90 group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent pointer-events-none"></div>
             <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg tracking-widest flex items-center gap-2">
                  <Sun size={20} className="text-yellow-300" /> TEAM YUIT
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
          <div className="md:w-1/3 p-6 bg-white/5 font-bold tracking-widest text-cyan-100 flex items-center gap-3 group-hover:text-white transition-colors">
             <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
             {item.label}
          </div>
          <div className="md:w-2/3 p-6 font-medium text-lg">
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
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 animate-pulse h-24 flex items-center gap-4">
             <div className="w-16 h-16 bg-white/10 rounded-lg"></div>
             <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 w-1/4 rounded"></div>
                <div className="h-4 bg-white/10 w-3/4 rounded"></div>
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-red-400/50 rounded-2xl p-8 text-center text-red-200 font-bold">
        <AlertCircle className="mx-auto mb-2" size={32} />
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
          whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          className="block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 text-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          {item.thumbnail && (
            <div className="flex-shrink-0 w-full md:w-20 md:h-20 rounded-lg overflow-hidden border border-white/10">
               <img src={item.thumbnail} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
          <div className="flex items-center gap-4 min-w-[150px] opacity-80">
            <span className="font-mono text-sm">{item.date}</span>
            <span className={`px-3 py-1 text-[10px] font-bold rounded-full border border-white/40 tracking-wider ${
               item.category === 'INFO' ? 'bg-cyan-500/30' : 'bg-pink-500/30'
            }`}>
              {item.category}
            </span>
          </div>
          <h3 className="flex-1 text-lg font-medium tracking-wide line-clamp-2">
            {item.title}
          </h3>
          <ArrowRight size={20} className="opacity-0 md:opacity-50 group-hover:opacity-100 transition-opacity ml-auto md:ml-0" />
        </motion.a>
      ))}
    </div>
  );
};

const TropicalContact = () => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
    <div className="grid lg:grid-cols-2 gap-12 relative z-10">
      <div>
        <h3 className="text-3xl font-bold mb-6 text-cyan-200">Contact Us</h3>
        <p className="text-white/80 mb-8 leading-relaxed">
          お仕事のご依頼、採用についてなど、<br/>
          以下のフォームよりお気軽にお問い合わせください。
        </p>
        <div className="space-y-4">
           <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Mail className="text-cyan-400" />
              <span className="font-mono">info@yuit-inc.jp</span>
           </div>
           <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <MapPin className="text-cyan-400" />
              <span>沖縄県那覇市安里381-1</span>
           </div>
        </div>
      </div>
      <form className="space-y-4">
         <div className="space-y-4">
             <div>
                <label className="block text-sm font-bold text-cyan-100 mb-1">氏名・会社名 <span className="text-pink-400">*</span></label>
                <input type="text" required className="w-full bg-white/5 border border-white/20 rounded p-3 text-white focus:bg-white/10 focus:border-cyan-400 outline-none transition-all placeholder-white/30" />
             </div>
             <div>
                <label className="block text-sm font-bold text-cyan-100 mb-1">メールアドレス <span className="text-pink-400">*</span></label>
                <input type="email" required className="w-full bg-white/5 border border-white/20 rounded p-3 text-white focus:bg-white/10 focus:border-cyan-400 outline-none transition-all placeholder-white/30" />
             </div>
             <div>
                <label className="block text-sm font-bold text-cyan-100 mb-1">お問い合わせ内容</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/20 rounded p-3 text-white focus:bg-white/10 focus:border-cyan-400 outline-none transition-all placeholder-white/30"></textarea>
             </div>
             
             <div className="flex items-start gap-2 pt-2">
               <input type="checkbox" id="privacy-tropical" required className="mt-1 w-4 h-4 bg-white/10 border-white/30 rounded text-cyan-500 focus:ring-0 cursor-pointer" />
               <label htmlFor="privacy-tropical" className="text-sm font-bold cursor-pointer text-white/80">
                 <a href="https://yuit-inc.jp/privacy.html" target="_blank" rel="noopener noreferrer" className="underline decoration-cyan-400 decoration-2 underline-offset-2 hover:text-cyan-200">プライバシーポリシー</a>
                 に同意する
               </label>
             </div>

             <div className="pt-2">
               <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]">
                 Send Message <Send size={18} />
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-teal-700 bg-white rounded-full border border-teal-100 shadow-sm">
           <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
           INNOVATION & TRUST
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-8 leading-tight tracking-tight">
          Reliable Technology,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Create the Future.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
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
          <div className="md:w-1/3 p-6 bg-slate-50 font-bold text-slate-700 flex items-center border-r border-slate-100">
             {item.label}
          </div>
          <div className="md:w-2/3 p-6 text-slate-600 font-medium">
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
           <div key={i} className="h-20 bg-slate-100 animate-pulse rounded"></div>
        ))}
     </div>
  );
  if (error) return (
     <div className="bg-red-50 border border-red-100 p-8 text-center rounded-lg text-red-600">
        <AlertCircle className="mx-auto mb-2 opacity-50" />
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
          className="flex flex-col md:flex-row md:items-center gap-6 p-6 hover:bg-slate-50 transition-all group"
        >
          {item.thumbnail && (
            <div className="flex-shrink-0 w-full md:w-24 md:h-24 rounded border border-slate-100 overflow-hidden bg-slate-50">
               <img src={item.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          )}
          <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
             <div className="flex flex-col gap-1 min-w-[140px]">
                <span className="text-slate-400 text-sm font-mono">{item.date}</span>
                <span className={`self-start px-2 py-0.5 text-[10px] font-bold tracking-wider rounded border ${
                   item.category === 'INFO' ? 'bg-teal-50 text-teal-700 border-teal-100' : 
                   item.category === 'RECRUIT' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                   'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  {item.category}
                </span>
             </div>
             <h3 className="flex-1 text-slate-700 font-bold group-hover:text-teal-600 transition-colors line-clamp-2">
                {item.title}
             </h3>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-teal-600 transition-colors ml-auto">
             Read More <ArrowRight size={16} />
          </div>
        </a>
      ))}
    </div>
  );
};

const TrustContact = () => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 md:p-12">
    <div className="text-center mb-10">
      <h3 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h3>
      <p className="text-slate-500">お問い合わせは以下のフォームよりお願いいたします。</p>
    </div>
    <div className="max-w-2xl mx-auto">
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">氏名・会社名 <span className="text-red-500">*</span></label>
            <input type="text" required className="w-full border border-slate-300 rounded p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">フリガナ</label>
            <input type="text" className="w-full border border-slate-300 rounded p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">電話番号（ハイフンなし）</label>
            <input type="tel" className="w-full border border-slate-300 rounded p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">メールアドレス <span className="text-red-500">*</span></label>
            <input type="email" required className="w-full border border-slate-300 rounded p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" />
          </div>
        </div>
        <div className="space-y-2">
           <label className="text-sm font-bold text-slate-700">お問い合わせ項目 <span className="text-red-500">*</span></label>
           <div className="relative">
             <select required className="w-full border border-slate-300 rounded p-3 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white">
               <option value="">選択してください</option>
               <option value="business">事業内容について</option>
               <option value="recruit">採用について</option>
               <option value="other">その他</option>
             </select>
             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
               <ChevronRight size={16} />
             </div>
           </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">お問い合わせ内容</label>
          <textarea rows={5} className="w-full border border-slate-300 rounded p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">添付ファイル（任意）</label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 hover:bg-slate-100 transition-colors text-center cursor-pointer">
              <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Paperclip className="mx-auto text-slate-400 mb-2" />
              <span className="text-slate-600 text-sm font-medium">ファイルの選択</span>
          </div>
          <div className="text-xs text-slate-500 mt-2 space-y-1">
             <p>会社概要などございましたらご提出ください。</p>
             <p>・添付数：最大3点</p>
             <p>・ファイルサイズ：合計30.0MB以下</p>
             <p>・ファイル拡張子：png / jpg / pdf / jpeg</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 pt-2">
           <input type="checkbox" id="privacy-trust" required className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer" />
           <label htmlFor="privacy-trust" className="text-sm text-slate-700 cursor-pointer select-none">
             <a href="https://yuit-inc.jp/privacy.html" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">プライバシーポリシー</a>
             に同意する
           </label>
        </div>
        <div className="text-center pt-4">
          <button className="bg-slate-800 text-white font-bold py-4 px-12 rounded hover:bg-teal-600 transition-colors shadow-lg">
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
    ? "text-3xl font-black bg-black text-white inline-block px-4 py-2 transform -rotate-1 mb-8"
    : isTropical 
      ? "text-3xl font-bold text-cyan-200 mb-8 border-b-2 border-cyan-500/30 inline-block pb-2"
      : "text-3xl font-bold text-slate-800 mb-8 border-l-4 border-yuit-teal pl-4";

  const cardClass = isPop
    ? "bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED8936] p-8"
    : isTropical
      ? "bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white"
      : "bg-white border border-slate-200 shadow-lg rounded-xl p-8";

  return (
    <div className={`min-h-screen pt-20 ${isTropical ? 'text-white' : ''}`}>
      <section className={`relative py-32 overflow-hidden ${isPop ? 'bg-yellow-100' : isTropical ? 'bg-transparent' : 'bg-slate-50'}`}>
        <div className={containerClass}>
          <div className="max-w-4xl">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <span className={`font-bold tracking-[0.2em] mb-4 block ${isPop ? 'text-black' : isTropical ? 'text-cyan-300' : 'text-yuit-teal'}`}>— careers at —</span>
               <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${isPop ? 'text-black' : isTropical ? 'text-white' : 'text-slate-800'}`}>
                 株式会社YUIT<br/>
                 私たちと一緒に<br/>働きませんか？
               </h1>
             </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className={containerClass}>
          <h2 className={sectionTitleClass}>MESSAGE / 私たちの思い</h2>
          <div className={cardClass}>
             <h3 className={`text-2xl font-bold mb-6 ${isPop ? 'text-pink-600' : isTropical ? 'text-pink-300' : 'text-yuit-orange'}`}>
                ゆるっとガチなエンジニアを育成中！
             </h3>
             <p className="leading-loose text-lg opacity-90">
               「ITって難しそう」「パソコン苦手だけど大丈夫?」そんな不安は一旦ぜんぶ置いて大丈夫です!<br/>
               ほぼ全てのメンバーが全くの未経験者。<br/>
               知識ゼロから安心して飛び込んできてください!
             </p>
          </div>
        </div>
      </section>

      <section className={`py-20 ${isPop ? 'bg-cyan-100' : isTropical ? 'bg-black/20' : 'bg-slate-50'}`}>
        <div className={containerClass}>
           <h2 className={sectionTitleClass}>ABOUT / 私たちについて</h2>
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team" 
                     className={`w-full h-auto object-cover aspect-video ${isPop ? 'border-4 border-black shadow-[8px_8px_0px_0px_black]' : isTropical ? 'rounded-2xl opacity-80' : 'rounded-lg shadow-md'}`} />
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold">■個性バラバラ。でも、想いは一緒。YUITというチームのかたち■</h3>
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
                <div className={`p-4 ${isPop ? 'bg-white border-2 border-black' : isTropical ? 'bg-white/10 rounded' : 'bg-white border border-slate-200'}`}>
                   <p className="text-sm">
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

      <section className="py-20">
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>BUSINESS / 事業内容</h2>
            <div className="mb-12 max-w-3xl">
              <p className="leading-relaxed text-lg">
                YUIT(ユイティー)は、沖縄で未経験からエンジニア転身を叶える会社です。<br/>
                人と人の結びつきを意味する「結」と「IT」を掛け合わせた社名の通り、<br/>
                人と人、会社と会社を結んでいく、そんな存在になりたいと考えております!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className={cardClass}>
                  <div className={`mb-4 inline-block p-2 rounded ${isPop ? 'bg-black text-white' : isTropical ? 'bg-cyan-500 text-white' : 'bg-yuit-teal text-white'}`}>
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">—SES事業—</h3>
                  <p className="opacity-80">
                    当社で0からエンジニアを育成し、様々な開発現場にアサインします。YUITに在籍しながら様々な案件に参画できるため、キャリアアップを目指せます!
                  </p>
               </div>
               <div className={cardClass}>
                  <div className={`mb-4 inline-block p-2 rounded ${isPop ? 'bg-black text-white' : isTropical ? 'bg-pink-500 text-white' : 'bg-yuit-orange text-white'}`}>
                    <Laptop size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">—NARAYUN— WEBエンジニア育成事業</h3>
                  <p className="opacity-80">
                    当社独自のWEBエンジニア育成カリキュラムを提供しています。自らも未経験からエンジニアになった代表、盛島の経験を活かし、こだわりが詰まったカリキュラムとなっております!<br/>
                    また、経験豊富な専属トレーナーが付くため、安心してスキルアップを目指すことができます。
                  </p>
               </div>
            </div>
         </div>
      </section>

      <section className={`py-20 ${isPop ? 'bg-yellow-50' : isTropical ? 'bg-white/5' : 'bg-slate-50'}`}>
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>MORE INFO / 教育カリキュラム</h2>
            
            <div className="flex flex-col md:flex-row gap-12">
               <div className="md:w-1/2 space-y-6">
                  <h3 className="text-2xl font-bold">完全未経験からついに卒業生第一号!<br/>エンジニアデビューを果たしました!</h3>
                  <p className="leading-relaxed opacity-90">
                    わたしたちは、知識ゼロ・経験ゼロの方でも“やってみたい”気持ちさえあれば、ゼロからエンジニアを目指せる仕組みをつくっています。<br/>
                    そして2025年6月、“完全未経験”でスタートしたメンバーが、ついにエンジニアとしてデビュー!!<br/>
                    沖縄に1人、新たなエンジニアが生まれたこの瞬間は、言葉にできないほどの喜びでした。
                  </p>
                  <p className="leading-relaxed opacity-90">
                    これからの活躍が楽しみで仕方ないのと同時に、「もっと多くの仲間をこの場所から送り出していきたい!」と、チーム一同気合が入っています🔥
                  </p>
                  
                  <div className={`p-6 mt-6 ${isPop ? 'bg-white border-2 border-black' : isTropical ? 'bg-white/10 rounded-xl' : 'bg-white shadow-sm rounded-lg'}`}>
                     <h4 className="font-bold mb-2">■学んで、働いて、成長して■</h4>
                     <p className="text-sm opacity-80 mb-4">
                       「沖縄って、学べる環境が少ないよね」そんな声をよく聞きます。でも、ないなら作ればいい!がYUIT流。<br/>
                       SES、受託、開発、教育…いろんな挑戦を続けながら、“働きながら学べるエンジニア養成所”のような存在になってきました。
                       これからもYUITならではのやり方で、“ちょっと未来が楽しみになる社会”をつくっていきます。
                     </p>
                     <h4 className="font-bold mb-2">■YUITが目指すのは「豊かな人生」■</h4>
                     <p className="text-sm opacity-80">
                       「エンジニアになる」ことがゴールではありません。その先にある、経済的にも精神的にも豊かな未来を獲得すること。幸せになることが人生の目的だと考えています!
                       だからこそ、もっと身近に、もっと楽しく、挑戦できる場所を──それがYUITのありたい姿です。
                     </p>
                  </div>
               </div>
               <div className="md:w-1/2 flex items-center justify-center">
                  <div className={`p-8 text-center ${cardClass}`}>
                     <Sparkles size={48} className={`mx-auto mb-4 ${isPop ? 'text-yellow-500' : 'text-yellow-300'}`} />
                     <p className="text-2xl font-bold mb-4">
                       さあ、一緒に学び、働き、<br/>笑って、成長していきましょう。
                     </p>
                     <p className="text-lg">あなたの挑戦、<br/>YUITが全力で応援します!</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="py-20">
         <div className={containerClass}>
            <div className={`flex flex-col md:flex-row-reverse items-center gap-12 ${isPop ? 'bg-white border-4 border-black p-8' : isTropical ? 'bg-white/10 backdrop-blur rounded-3xl p-10' : 'bg-white shadow-xl rounded-2xl p-10'}`}>
               <div className="md:w-1/3">
                  <div className={`aspect-square w-full flex items-center justify-center ${isPop ? 'bg-gray-200 border-2 border-black' : isTropical ? 'bg-white/20 rounded-full' : 'bg-gray-100 rounded-full'}`}>
                     <Users size={64} className="opacity-50" />
                  </div>
                  <p className="text-center font-bold mt-4">代表取締役 盛島加菜</p>
               </div>
               <div className="md:w-2/3 space-y-4">
                  <h3 className="text-2xl font-bold">■はじめまして!代表の盛島加菜です■</h3>
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
                  <div className={`mt-6 p-4 ${isPop ? 'bg-pink-100 border-2 border-black' : isTropical ? 'bg-pink-500/20 rounded' : 'bg-pink-50 rounded border border-pink-100'}`}>
                     <p className="font-bold mb-2">■こんなあなたを待っています■</p>
                     <ul className="list-disc list-inside text-sm space-y-1">
                        <li>キャリアチェンジしたい!</li>
                        <li>楽しい会社に出会いたい!</li>
                        <li>YUITという会社が気になる!</li>
                        <li>盛島と話をしてみたい!</li>
                     </ul>
                     <p className="text-sm mt-2 font-bold">一度気軽にお話しましょう!私のエンジニア挑戦での失敗経験なども包み隠さずお話します!</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className={`py-20 ${isPop ? 'bg-gray-100' : isTropical ? 'bg-black/40' : 'bg-slate-50'}`}>
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>COMPANY / 会社概要</h2>
            <div className="max-w-2xl mx-auto">
               <div className={`text-center mb-6 font-bold text-xl ${isTropical ? 'text-cyan-200' : 'text-yuit-teal'}`}>挑戦をもっと身近に。</div>
               
               <div className={`${isPop ? 'bg-white border-4 border-black' : isTropical ? 'bg-white/5 border border-white/20 rounded-xl' : 'bg-white border border-slate-200 rounded'}`}>
                 {[
                   {k: "会社名", v: "株式会社YUIT"},
                   {k: "事業内容", v: "SES事業 / NARAYUN（エンジニア育成事業）"},
                   {k: "企業WEBサイト", v: "https://yuit-inc.jp/"},
                   {k: "所在地", v: "沖縄県那覇市安里"},
                 ].map((row, i) => (
                   <div key={i} className={`flex border-b last:border-0 ${isPop ? 'border-black' : isTropical ? 'border-white/20' : 'border-slate-100'}`}>
                      <div className={`w-1/3 p-4 font-bold ${isPop ? 'bg-gray-200' : isTropical ? 'bg-white/10' : 'bg-slate-50'}`}>{row.k}</div>
                      <div className="w-2/3 p-4">{row.v}</div>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </section>

      <section className="py-20">
         <div className={containerClass}>
            <h2 className={sectionTitleClass}>CAREERS / 採用情報</h2>
            <div className="text-center space-y-8">
               <p className="text-lg">
                 現在、下記の職種で募集を行なっています。<br/>
                 応募を検討される方は、以下のページをご覧ください。
               </p>
               
               <a href="https://en-gage.net" target="_blank" rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-2 px-8 py-4 text-xl font-bold transition-transform hover:scale-105 ${
                    isPop ? 'bg-pink-500 text-white border-4 border-black shadow-[8px_8px_0px_0px_black]' :
                    isTropical ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg shadow-pink-500/40' :
                    'bg-yuit-teal text-white rounded-lg shadow-lg'
                  }`}>
                  募集要項を見る (engage) <ExternalLink size={24} />
               </a>

               <div className="mt-12 opacity-60 text-sm">
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
      // Don't fetch if URL is not configured
      if (NOTE_API_URL === "YOUR_WORKER_URL_HERE") {
        console.warn("Please update NOTE_API_URL in App.tsx with your Cloudflare Worker URL.");
        return;
      }

      setIsLoading(true);
      setError(false);

      try {
        const response = await fetch(NOTE_API_URL);
        if (response.ok) {
          const data = await response.json();
          // Safe access to items array
          const rawItems = Array.isArray(data?.items) ? data.items : [];

          // Transform API items to NewsItem format
          const formattedItems: NewsItem[] = rawItems.map((item: any) => {
            let dateStr = "";
            try {
              const dateObj = new Date(item.pubDate);
              dateStr = dateObj.toLocaleDateString('ja-JP', {
                 year: 'numeric',
                 month: '2-digit',
                 day: '2-digit'
              }).replace(/\//g, '.');
            } catch (e) {
              dateStr = item.pubDate;
            }

            return {
              date: dateStr,
              category: 'BLOG',
              title: item.title,
              url: item.link,
              thumbnail: item.thumbnail || undefined
            };
          });
          
          if (formattedItems.length > 0) {
             setNewsItems(formattedItems);
          } else {
             // If we got a response but no items (or 0 valid items), treat as error state to avoid stale static data
             setError(true);
          }
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch note rss:", error);
        setError(true);
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
          <div className="max-w-4xl mx-auto text-center">
            <span className={`inline-block px-4 py-1 text-xs font-bold mb-4 tracking-widest ${
              theme === ThemeType.POP ? 'bg-black text-white' : 
              theme === ThemeType.TROPICAL ? 'bg-white/20 text-white border border-white/40 rounded-full' : 
              'text-yuit-teal bg-teal-50 rounded-full'
            }`}>
              ABOUT US
            </span>
            <h2 className={`text-4xl font-bold mb-12 ${theme === ThemeType.TROPICAL ? 'text-white drop-shadow-md' : 'text-slate-800'}`}>
              WHAT’s YUIT Inc.?
            </h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.6 }}
              className={`p-10 md:p-16 relative ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[12px_12px_0px_0px_#38B2AC]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl text-white shadow-2xl' :
                'bg-white shadow-xl rounded-2xl border-t-4 border-yuit-teal'
              }`}
            >
               <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-8">
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
               <p className="text-lg leading-loose opacity-90">
                 人と人、会社と会社を繋げていく。<br/>
                 そんな存在になりたいという思いを込めて <br/>
                 <span className="font-bold text-2xl">YUIT</span> と名付けました。
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
                 <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="SES Business" className="w-full h-full object-cover" />
                 <div className={`absolute bottom-0 left-0 w-full p-6 ${
                   theme === ThemeType.POP ? 'bg-cyan-300 border-t-4 border-black' : 
                   theme === ThemeType.TROPICAL ? 'bg-gradient-to-t from-black/90 to-transparent text-white' : 
                   'bg-white/95 backdrop-blur-sm'
                 }`}>
                   <h3 className={`text-2xl font-bold ${theme === ThemeType.TROPICAL ? 'text-white' : 'text-black'}`}>SES Business</h3>
                   <p className={`text-sm opacity-80 ${theme === ThemeType.TROPICAL ? 'text-gray-200' : 'text-gray-600'}`}>System Engineering Service</p>
                 </div>
               </div>
            </div>

            <div className={`w-full md:w-1/2 ${theme === ThemeType.TROPICAL ? 'text-white' : ''}`}>
              <h2 className={`text-3xl font-bold mb-8 ${
                theme === ThemeType.POP ? 'bg-black text-white inline-block px-4 py-2 transform -rotate-2' : 
                theme === ThemeType.TROPICAL ? 'text-cyan-100' :
                'text-slate-800 border-l-4 border-yuit-teal pl-4'
              }`}>
                事業内容：SES事業
              </h2>
              <p className="text-lg mb-8 leading-relaxed opacity-90">
                YUITでは、未経験者からエンジニアを目指すことができる教育環境を提供しています。
                トレーナーによるサポートと実践的なカリキュラムで、あなたのエンジニアリングスキルを一から育みます。
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                 <div className={`p-4 flex items-start gap-4 ${
                   theme === ThemeType.POP ? 'bg-white border-2 border-black' : 
                   theme === ThemeType.TROPICAL ? 'bg-white/10 rounded-xl' : 'bg-white rounded shadow-sm border border-slate-100'
                 }`}>
                    <div className={`p-2 rounded-full ${theme === ThemeType.POP ? 'bg-yellow-300 border-2 border-black' : theme === ThemeType.TROPICAL ? 'bg-cyan-500/30' : 'bg-teal-50 text-teal-600'}`}>
                       <Zap size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">未経験からのキャリアアップ</h4>
                      <p className="text-sm opacity-80">独自のカリキュラムで基礎から応用までしっかりサポート。</p>
                    </div>
                 </div>
                 <div className={`p-4 flex items-start gap-4 ${
                   theme === ThemeType.POP ? 'bg-white border-2 border-black' : 
                   theme === ThemeType.TROPICAL ? 'bg-white/10 rounded-xl' : 'bg-white rounded shadow-sm border border-slate-100'
                 }`}>
                    <div className={`p-2 rounded-full ${theme === ThemeType.POP ? 'bg-pink-300 border-2 border-black' : theme === ThemeType.TROPICAL ? 'bg-pink-500/30' : 'bg-teal-50 text-teal-600'}`}>
                       <Anchor size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">多様なプロジェクト</h4>
                      <p className="text-sm opacity-80">大手企業からスタートアップまで、成長できる現場へアサイン。</p>
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
             <h2 className={`text-5xl font-black mb-4 ${theme === ThemeType.TROPICAL ? 'text-white opacity-90' : 'text-slate-800'}`}>
               Philosophy
             </h2>
             <div className={`w-20 h-1 mx-auto ${theme === ThemeType.POP ? 'bg-black' : theme === ThemeType.TROPICAL ? 'bg-cyan-400' : 'bg-yuit-teal'}`}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className={`flex flex-col p-8 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#38B2AC]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-yuit-teal'
              }`}
            >
                <div className="mb-6">
                    <Zap size={40} className={`mb-4 ${theme === ThemeType.TROPICAL ? 'text-cyan-300' : 'text-yuit-teal'}`} />
                    <span className={`text-sm font-bold tracking-widest uppercase ${theme === ThemeType.TROPICAL ? 'text-cyan-200' : 'text-yuit-teal'}`}>
                        Mission
                    </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">挑戦をもっと身近に。</h3>
                <p className="opacity-80 leading-relaxed">
                    ITで豊かな沖縄を、人生を、選択肢を創出するために挑戦し続けます。
                </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={`flex flex-col p-8 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED8936]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-yuit-orange'
              }`}
            >
                <div className="mb-6">
                    <Anchor size={40} className={`mb-4 ${theme === ThemeType.TROPICAL ? 'text-orange-300' : 'text-yuit-orange'}`} />
                    <span className={`text-sm font-bold tracking-widest uppercase ${theme === ThemeType.TROPICAL ? 'text-orange-200' : 'text-yuit-orange'}`}>
                        Vision
                    </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">信頼されるITエンジニアを輩出</h3>
                <p className="opacity-80 leading-relaxed">
                    沖縄の新たな可能性に貢献する。
                </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className={`flex flex-col p-8 h-full ${
                theme === ThemeType.POP ? 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_#ED64A6]' :
                theme === ThemeType.TROPICAL ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white' :
                'bg-white shadow-lg rounded-xl border-t-4 border-slate-700'
              }`}
            >
                 <div className="mb-6">
                    <Heart size={40} className={`mb-4 ${theme === ThemeType.POP ? 'text-pink-500' : theme === ThemeType.TROPICAL ? 'text-pink-300' : 'text-slate-700'}`} />
                    <span className={`text-sm font-bold tracking-widest uppercase ${theme === ThemeType.POP ? 'text-pink-500' : theme === ThemeType.TROPICAL ? 'text-pink-200' : 'text-slate-700'}`}>
                        Values
                    </span>
                </div>
                
                <ul className="space-y-6">
                    <li>
                        <h4 className="font-bold text-lg">Try first</h4>
                        <p className="text-sm opacity-80">悩むなら、やってみよう</p>
                    </li>
                    <li>
                        <h4 className="font-bold text-lg">Learn and Grow</h4>
                        <p className="text-sm opacity-80">学び、成長し続けよう</p>
                    </li>
                    <li>
                        <h4 className="font-bold text-lg">YUIMA-RU</h4>
                        <p className="text-sm opacity-80">関わる全ての人を幸せにしよう</p>
                    </li>
                </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="overview" className={`py-24 relative ${theme === ThemeType.TRUST ? 'bg-slate-50' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold mb-12 text-center ${theme === ThemeType.TROPICAL ? 'text-white' : 'text-slate-800'}`}>
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
           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className={`inline-block px-3 py-1 text-xs font-bold mb-2 tracking-widest ${
                  theme === ThemeType.POP ? 'bg-black text-white' : 
                  theme === ThemeType.TROPICAL ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30 rounded-full' : 
                  'text-yuit-teal bg-teal-50 rounded'
                }`}>
                  LATEST INFO
                </span>
                <h2 className={`text-4xl font-bold ${theme === ThemeType.TROPICAL ? 'text-white' : 'text-slate-800'}`}>
                  News & Topics
                </h2>
              </div>
              <a 
                href="https://note.com/yuit_note"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-bold flex items-center gap-1 hover:underline ${theme === ThemeType.TROPICAL ? 'text-cyan-200' : 'text-slate-500'}`}
              >
                 View All <ChevronRight size={16} />
              </a>
           </div>

           {theme === ThemeType.POP && <PopNews items={newsItems} isLoading={isLoading} error={error} />}
           {theme === ThemeType.TROPICAL && <TropicalNews items={newsItems} isLoading={isLoading} error={error} />}
           {theme === ThemeType.TRUST && <TrustNews items={newsItems} isLoading={isLoading} error={error} />}
        </div>
      </section>

      {/* --- PRESIDENT BANNER --- */}
      <section className="py-12 relative">
        <div className="container mx-auto px-6">
           <Link to="/president" className="block group">
             <div className={`relative overflow-hidden p-8 md:p-12 transition-all duration-300 transform group-hover:scale-[1.02] ${
               isPop ? 'bg-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_black] group-hover:shadow-[12px_12px_0px_0px_black]' :
               isTropical ? 'bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl' :
               'bg-slate-800 rounded-xl shadow-lg'
             }`}>
               {/* Background Decoration */}
               {isPop && <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full -mr-16 -mt-16 z-0"></div>}
               {isTropical && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-pulse z-0"></div>}
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                     <div className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 ${
                        isPop ? 'bg-white border-2 border-black' : 
                        isTropical ? 'bg-white/10 backdrop-blur border border-white/20' : 
                        'bg-white/10'
                     }`}>
                        <Users size={40} className={isPop ? 'text-black' : 'text-white'} />
                     </div>
                     <div>
                        <span className={`inline-block px-3 py-1 text-xs font-bold mb-2 tracking-widest ${
                          isPop ? 'bg-black text-white' : isTropical ? 'bg-cyan-500 text-white' : 'bg-teal-500 text-white rounded'
                        }`}>MESSAGE</span>
                        <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isPop ? 'text-black' : 'text-white'}`}>
                          代表挨拶 / President Message
                        </h3>
                        <p className={`text-sm md:text-base ${isPop ? 'text-gray-700' : 'text-gray-300'}`}>
                           代表取締役 盛島加菜からのメッセージをご覧いただけます。
                        </p>
                     </div>
                  </div>
                  <div className={`flex items-center gap-2 font-bold px-6 py-3 transition-colors ${
                     isPop ? 'bg-white border-2 border-black group-hover:bg-black group-hover:text-white' : 
                     isTropical ? 'bg-white/20 hover:bg-white hover:text-blue-900 rounded-full border border-white/30' : 
                     'bg-white text-slate-800 rounded hover:bg-gray-100'
                  }`}>
                     Read Message <ArrowRight size={20} />
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
const Layout = ({ children, theme, setTheme }: { children: React.ReactNode, theme: ThemeType, setTheme: (t: ThemeType) => void }) => {
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
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isPop ? 'bg-yellow-50 font-sans text-gray-900' : isTropical ? 'bg-slate-900 font-sans text-white' : 'bg-white font-sans text-slate-800'
    }`}>
      <ScrollToTop />
      <header className={headerClass}>
        <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
           <Link to="/" className="relative z-50">
             <Logo className={isTropical ? "brightness-0 invert" : ""} />
           </Link>
           
           <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {MENU_ITEMS.map((item, i) => {
                return (
                 <Link 
                    key={i} 
                    to={item.href}
                    className={`text-sm tracking-widest transition-colors ${linkClass}`}
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
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
              <nav className="flex flex-col p-6 gap-4">
                 {MENU_ITEMS.map((item, i) => (
                    <Link 
                      key={i} 
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg font-bold ${
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

      <footer className={`py-12 ${isPop ? 'bg-black text-white' : isTropical ? 'bg-black/40 text-white backdrop-blur-lg border-t border-white/10' : 'bg-slate-800 text-white'}`}>
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-2">
                     <Logo className="brightness-0 invert" />
                     <span className="font-bold text-xl">YUIT Inc.</span>
                  </div>
                  <p className="opacity-60 text-sm">© 2024 YUIT Inc. All Rights Reserved.</p>
               </div>
               
               <div className="flex gap-6">
                  {SOCIAL_LINKS.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`hover:opacity-80 transition-opacity ${isPop ? 'text-yellow-400' : isTropical ? 'text-cyan-400' : 'text-teal-400'}`}
                      title={social.name}
                    >
                       {social.name === 'Instagram' && <Instagram size={24} />}
                       {social.name === 'TikTok' && <TikTokIcon size={24} />}
                       {social.name === 'note' && <NoteIcon size={24} />}
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