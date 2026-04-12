export type ThemeMode = 'dark' | 'light';
export type ListingStatus = 'active' | 'sold' | 'expired';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Listing {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  location: string;
  city: string;
  lat: number;
  lng: number;
  photos: string[];
  isFree: boolean;
  isTrade: boolean;
  status: ListingStatus;
  viewCount: number;
  postedAt: string;
  daysOld: number;
  distanceMiles: number;
  seller: {
    name: string;
    phone: string;
    role: 'user' | 'admin';
  };
}
