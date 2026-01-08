export enum ThemeType {
  POP = 'POP',
  TROPICAL = 'TROPICAL',
  TRUST = 'TRUST',
}

export interface MenuItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface OverviewItem {
  label: string;
  value: string;
}

export interface NewsItem {
  date: string;
  category: string;
  title: string;
  url?: string;
  thumbnail?: string;
}