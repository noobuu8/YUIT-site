import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  // 指定されたロゴ画像のURL（変更厳禁）
  const LOGO_URL = "https://raw.githubusercontent.com/noobuu8/YUIT-site/f611a4c4ca62e49143ae13cb527fffc7b4bfe572/images/yuit_logo.png";

  return (
    <div className={`flex items-center select-none ${className || ''}`}>
      <img 
        src={LOGO_URL} 
        alt="株式会社 YUIT" 
        className="h-14 md:h-20 w-auto object-contain"
      />
    </div>
  );
};