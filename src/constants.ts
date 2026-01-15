import { MenuItem, OverviewItem, NewsItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  { label: 'SERVICE', href: '/#service' },
  { label: 'COMPANY', href: '/#overview' },
  { label: 'MESSAGE', href: '/president' },
  { label: 'CONTACT', href: '/#contact' },
  { label: 'NEWS', href: '/#news' },
  { label: 'RECRUIT', href: '/recruit' },
];

export const COMPANY_OVERVIEW: OverviewItem[] = [
  { label: '会社名', value: '株式会社 YUIT' },
  { label: '設立', value: '2023年12月8日' },
  { label: '代表者', value: '代表取締役 盛島加菜' },
  { label: '事業内容', value: 'SES事業 / エンジニア育成事業' },
  { label: '所在地', value: '〒902-0067 沖縄県那覇市安里381-1 ZORKS沖縄 8F' },
];

export const NEWS_ITEMS: NewsItem[] = [
  { 
    date: '2024.04.01', 
    category: 'INFO', 
    title: 'コーポレートサイトをリニューアルしました', 
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400&h=400' 
  },
  { 
    date: '2024.03.15', 
    category: 'RECRUIT', 
    title: '2025年度新卒採用のエントリー受付を開始しました', 
    url: '/recruit',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=400&h=400'
  },
  { 
    date: '2024.02.01', 
    category: 'EVENT', 
    title: '社内ハッカソン「YUIT THON」を開催しました', 
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400&h=400'
  },
  { 
    date: '2023.12.08', 
    category: 'INFO', 
    title: '株式会社YUITを設立しました', 
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=400'
  },
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/yuit_official/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@yuit_official0' },
  { name: 'note', url: 'https://note.com/yuit_note' },
];