import { ThemeType } from '../../types';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Quote } from 'lucide-react';
import { PRESIDENT_IMAGE_URL } from '../../config/images';
import { handleImageError } from '../../lib/utils';

export const President = ({ theme }: { theme: ThemeType }) => {
  const isPop = theme === ThemeType.POP;
  const isTropical = theme === ThemeType.TROPICAL;
  const isTrust = theme === ThemeType.TRUST;

  const containerClass = `container mx-auto px-6 relative z-10`;

  const bgClass = isPop ? 'bg-yellow-50' : isTropical ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-800';

  const cardClass = isPop
    ? "bg-white border-4 border-black shadow-[8px_8px_0px_0px_#38B2AC] p-8 md:p-12 relative"
    : isTropical
      ? "bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      : "bg-white shadow-xl rounded-2xl p-8 md:p-12 border border-slate-100 relative";

  return (
    <div className={`min-h-screen pt-4 pb-20 ${bgClass}`}>
       {isTropical && (
         <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400"></div>
       )}

       <div className={containerClass}>
          {/* Hero / Header */}
          <div className="text-center mb-16">
             <motion.h1
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className={`text-4xl md:text-8xl font-bold mb-6 ${isTropical ? 'text-white' : 'text-slate-800'}`}
             >
               Message
             </motion.h1>
             <div className={`w-24 h-1.5 mx-auto ${isTropical ? 'bg-white' : 'bg-black'}`}></div>
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

                   <h3 className={`text-2xl md:text-5xl font-bold mb-8 ${
                      isPop ? 'text-pink-600' : isTropical ? 'text-pink-300' : 'text-teal-600'
                   }`}>
                      「挑戦って楽しい！という人を、沖縄中に増やしたい。」
                   </h3>

                   <div className="space-y-6 text-lg md:text-3xl leading-relaxed opacity-90 mb-10">
                      <p>
                        琉球大学大学院（保健体育専攻）からJICA海外協力隊としてウガンダへ。
                        現地の子供たちと泥まみれで走り回る体育教師生活を送り、帰国後「完全未経験」からIT業界へ。
                        東京でのエンジニア修行を経て、未知の世界へ飛び込むワクワクを誰よりも信じ、2023年に株式会社YUITを設立。
                      </p>

                      <p>
                        小学3年生から鍛え上げた「寿司打」のスキルは社内No.1。
                        もはや流れる文面はすべて記憶しているが、最近はメキメキ実力を上げるメンバーたちに「タイピングNo.1の座」を脅かされているので、自主練に励んでいる。
                      </p>

                      <p>
                        目指すはビジネスアスリート。月100kmランニングで鍛えており、ハードな日々が続いても翌朝にはバイブの振動一つで即座に覚醒できるのが特技。
                        平均睡眠スコアは驚異の87点。
                      </p>

                      <div className={`p-6 rounded-xl ${
                        isPop ? 'bg-pink-50 border-2 border-black' :
                        isTropical ? 'bg-white/5 border border-white/20' :
                        'bg-teal-50 border border-teal-200'
                      }`}>
                        <ul className="space-y-3">
                          <li><span className={`font-bold ${isPop ? 'text-pink-600' : isTropical ? 'text-cyan-300' : 'text-teal-600'}`}>好きな筋肉：</span>広背筋（エンジニアも体が資本！）</li>
                          <li><span className={`font-bold ${isPop ? 'text-pink-600' : isTropical ? 'text-cyan-300' : 'text-teal-600'}`}>最近の悩み：</span>擦り傷が治りにくい</li>
                          <li><span className={`font-bold ${isPop ? 'text-pink-600' : isTropical ? 'text-cyan-300' : 'text-teal-600'}`}>メッセージ：</span>泥臭い挑戦の先にある「楽しさ」を、一緒に味わいましょう！</li>
                        </ul>
                      </div>
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

          {/* --- TEAM MEMBERS SECTION --- */}
          <div className="mt-24">
            <h2 className={`text-3xl md:text-6xl font-bold text-center mb-12 ${
              isPop ? 'text-black' : isTropical ? 'text-white' : 'text-slate-800'
            }`}>
              Team Members
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* 営業 - 津波古 大海 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`${
                  isPop
                    ? 'bg-white border-4 border-black shadow-[6px_6px_0px_0px_#38B2AC] p-6 md:p-8'
                    : isTropical
                      ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8'
                      : 'bg-white shadow-lg rounded-xl p-6 md:p-8 border border-slate-100'
                }`}
              >
                {/* 写真（プレースホルダー） */}
                <div className={`aspect-square w-full max-w-[280px] mx-auto mb-6 flex items-center justify-center ${
                  isPop ? 'bg-gray-100 border-4 border-black' :
                  isTropical ? 'bg-white/20 rounded-full border-2 border-white/30' :
                  'bg-gray-100 rounded-lg'
                }`}>
                  <Users size={80} className={`${
                    isPop ? 'text-gray-400' : isTropical ? 'text-white/50' : 'text-gray-400'
                  }`} />
                </div>

                {/* 役職 */}
                <p className={`text-center text-lg md:text-2xl font-bold mb-2 ${
                  isPop ? 'text-teal-600' : isTropical ? 'text-cyan-300' : 'text-teal-600'
                }`}>
                  営業
                </p>

                {/* 名前 */}
                <h3 className={`text-center text-2xl md:text-4xl font-bold mb-4 ${
                  isTropical ? 'text-white' : 'text-slate-800'
                }`}>
                  津波古 大海
                </h3>

                {/* メッセージ（仮テキスト） */}
                <p className={`text-base md:text-xl leading-relaxed ${
                  isPop ? 'text-gray-700' : isTropical ? 'text-white/80' : 'text-gray-600'
                }`}>
                  ※ここにメッセージが入ります。後ほど差し替え予定です。
                </p>
              </motion.div>

              {/* CTO - 関口 貴大 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`${
                  isPop
                    ? 'bg-white border-4 border-black shadow-[6px_6px_0px_0px_#ED8936] p-6 md:p-8'
                    : isTropical
                      ? 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8'
                      : 'bg-white shadow-lg rounded-xl p-6 md:p-8 border border-slate-100'
                }`}
              >
                {/* 写真（プレースホルダー） */}
                <div className={`aspect-square w-full max-w-[280px] mx-auto mb-6 flex items-center justify-center ${
                  isPop ? 'bg-gray-100 border-4 border-black' :
                  isTropical ? 'bg-white/20 rounded-full border-2 border-white/30' :
                  'bg-gray-100 rounded-lg'
                }`}>
                  <Users size={80} className={`${
                    isPop ? 'text-gray-400' : isTropical ? 'text-white/50' : 'text-gray-400'
                  }`} />
                </div>

                {/* 役職 */}
                <p className={`text-center text-lg md:text-2xl font-bold mb-2 ${
                  isPop ? 'text-orange-500' : isTropical ? 'text-orange-300' : 'text-orange-500'
                }`}>
                  CTO
                </p>

                {/* 名前 */}
                <h3 className={`text-center text-2xl md:text-4xl font-bold mb-4 ${
                  isTropical ? 'text-white' : 'text-slate-800'
                }`}>
                  関口 貴大
                </h3>

                {/* キャッチコピー */}
                <p className={`text-lg md:text-2xl font-bold mb-4 ${
                  isPop ? 'text-orange-500' : isTropical ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  「技術は鋭く、物腰は柔らかく。コードに魂を宿すCTO」
                </p>

                {/* 紹介文 */}
                <div className={`text-base md:text-xl leading-relaxed space-y-4 ${
                  isPop ? 'text-gray-700' : isTropical ? 'text-white/80' : 'text-gray-600'
                }`}>
                  <p>
                    専門学校卒業後、エンジニア一筋。PHPから最新のAI技術まで、時代の変化を楽しみながら乗りこなす技術のマルチプレイヤー。
                    かつてトレードマークだった長髪をバッサリ切り、「今はなきポニーテール」を惜しまれるほどの大胆なイメチェンを遂げた。
                  </p>
                  <p>
                    仕事のこだわりは、圧倒的なキャッチアップ速度と精緻な設計。落ち着いたトーンで淡々と、かつロジカルに会話を進める姿は職人そのもの。
                    しかし、ふとした瞬間に見せる「可愛い笑顔」の破壊力は抜群で、そのギャップに癒やされるメンバーも多い。
                  </p>

                  <div className={`p-4 rounded-lg mt-4 ${
                    isPop ? 'bg-orange-50 border-2 border-black' :
                    isTropical ? 'bg-white/5 border border-white/20' :
                    'bg-orange-50 border border-orange-200'
                  }`}>
                    <ul className="space-y-2 text-sm md:text-lg">
                      <li><span className={`font-bold ${isPop ? 'text-orange-500' : isTropical ? 'text-orange-300' : 'text-orange-600'}`}>好きなもの：</span>ライブ鑑賞、イヤホン収集、技術のキャッチアップ</li>
                      <li><span className={`font-bold ${isPop ? 'text-orange-500' : isTropical ? 'text-orange-300' : 'text-orange-600'}`}>最近の悩み：</span>耳が2つしかないのに、魅力的なイヤホンがこの世に多すぎること</li>
                      <li><span className={`font-bold ${isPop ? 'text-orange-500' : isTropical ? 'text-orange-300' : 'text-orange-600'}`}>メッセージ：</span>めちゃくちゃ優しいよ！！！</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* --- END TEAM MEMBERS SECTION --- */}

       </div>
    </div>
  );
};
