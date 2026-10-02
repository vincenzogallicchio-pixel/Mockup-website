export type ProductCondition = 'Nuovo' | 'Usato' | 'Ex-demo' | 'B-stock' | 'Rarità';

export type AvailabilityStatus = 
  | 'Disponibile in negozio' 
  | 'Pezzo unico in negozio' 
  | 'Ultimi pezzi in magazzino' 
  | 'Su ordinazione / Chiedi info'
  | 'Su richiesta / Esaurito';

export interface ProductSpecs {
  body?: string;
  neck?: string;
  fingerboard?: string;
  pickups?: string;
  bridge?: string;
  frets?: string;
  scale?: string;
  finish?: string;
  electronics?: string;
  strings?: string;
  caseIncluded?: string;
  origin?: string;
  year?: string;
  weight?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  price: number;
  priceFormatted: string;
  originalPrice?: number;
  originalPriceFormatted?: string;
  image: string;
  galleryImages: string[];
  condition: ProductCondition;
  conditionDescription?: string;
  category: string;
  categorySlug: string;
  categoryLabel: string;
  slug: string;
  availability: AvailabilityStatus;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  description: string;
  shortDescription?: string;
  specs: ProductSpecs;
  // Attributes for the deterministic recommendation engine
  genres: string[]; // 'Rock' | 'Blues' | 'Metal' | 'Pop' | 'Jazz' | 'Country' | 'Fingerstyle' | 'Classical'
  experienceLevel: ('Principiante' | 'Intermedio' | 'Avanzato' | 'Professionista')[];
  primaryStrengths: ('Sound' | 'Playability' | 'Appearance' | 'Brand' | 'Value for money' | 'Versatility')[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isRare?: boolean;
  isUsed?: boolean;
  isFeatured?: boolean;
}

export type MusicGenreAnswer = 
  | 'Rock' 
  | 'Blues' 
  | 'Metal' 
  | 'Pop' 
  | 'Jazz' 
  | 'Country' 
  | 'Fingerstyle' 
  | 'Classical' 
  | 'Other' 
  | "I don't know";

export type InstrumentTypeAnswer = 
  | 'Electric' 
  | 'Acoustic' 
  | 'Classical' 
  | 'Jazz/Semi-Hollow' 
  | 'Bass' 
  | "I don't know";

export type ExperienceAnswer = 
  | 'Beginner' 
  | 'Intermediate' 
  | 'Advanced' 
  | 'Professional';

export type BudgetAnswer = 
  | '0-200' 
  | '200-500' 
  | '500-1000' 
  | '1000-2000' 
  | '2000+';

export type MattersMostAnswer = 
  | 'Sound' 
  | 'Playability' 
  | 'Appearance' 
  | 'Brand' 
  | 'Value for money' 
  | 'Versatility';

export type ForWhoAnswer = 
  | 'For me' 
  | 'Gift';

export interface FinderAnswers {
  musicGenre: MusicGenreAnswer;
  instrumentType: InstrumentTypeAnswer;
  experience: ExperienceAnswer;
  budget: BudgetAnswer;
  mattersMost: MattersMostAnswer;
  forWho: ForWhoAnswer;
}

export interface FinderRecommendation {
  product: Product;
  score: number;
  factualReasons: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  category: 'News' | 'Guida all\'acquisto' | 'Liuteria & Cura' | 'Recensione';
  image: string;
  readTime: string;
  relatedProductIds?: string[];
  geoQuestion?: string;
  faq?: { q: string; a: string }[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
