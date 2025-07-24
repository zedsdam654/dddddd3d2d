export interface App {
  appId: string;
  title: string;
  icon: string;
  screenshots: string[];
  developer: string;
  category: string;
  genre: string;
  rating: number;
  ratingCount: number;
  installs: string;
  price: string;
  description: string;
  descriptionHTML: string;
  summary: string;
  size: string;
  androidVersion: string;
  contentRating: string;
  updated: string;
  version: string;
  recentChanges: string;
  url: string;
}

export interface AppSearchResult {
  results: App[];
  nextToken?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}