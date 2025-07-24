import axios from 'axios';
import { App, AppSearchResult } from '@/types/app';

const API_KEY = 'cf355a4136mshd841ec49e682c38p19b262jsn9f87cc91a7d8';
const BASE_URL = 'https://google-play-scraper-api.p.rapidapi.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'google-play-scraper-api.p.rapidapi.com'
  }
});

export const appService = {
  // البحث عن التطبيقات
  searchApps: async (query: string, country = 'us'): Promise<App[]> => {
    try {
      const response = await api.get('/search', {
        params: {
          term: query,
          country,
          num: 50
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching apps:', error);
      return [];
    }
  },

  // جلب التطبيقات الشائعة
  getTopApps: async (category = 'APPLICATION', collection = 'TOP_FREE'): Promise<App[]> => {
    try {
      const response = await api.get('/list', {
        params: {
          category,
          collection,
          country: 'us',
          num: 50
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top apps:', error);
      return [];
    }
  },

  // جلب تفاصيل التطبيق
  getAppDetails: async (appId: string): Promise<App | null> => {
    try {
      const response = await api.get('/app', {
        params: {
          appId,
          country: 'us'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching app details:', error);
      return null;
    }
  },

  // جلب التطبيقات الجديدة
  getNewApps: async (): Promise<App[]> => {
    try {
      const response = await api.get('/list', {
        params: {
          category: 'APPLICATION',
          collection: 'NEW_FREE',
          country: 'us',
          num: 30
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching new apps:', error);
      return [];
    }
  },

  // جلب الألعاب الشائعة
  getTopGames: async (): Promise<App[]> => {
    try {
      const response = await api.get('/list', {
        params: {
          category: 'GAME',
          collection: 'TOP_FREE',
          country: 'us',
          num: 50
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top games:', error);
      return [];
    }
  }
};