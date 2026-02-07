// utils/gps.ts

export interface HotSpot {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  image: string;
}

export const hotSpots: HotSpot[] = [
  { 
    id: 1, 
    name: 'สยามสแควร์ (Siam Square)', 
    latitude: 13.7443, 
    longitude: 100.5326, 
    image: 'https://images.unsplash.com/photo-1588418012920-92854976ca88?q=80&w=400' 
  },
  { 
    id: 2, 
    name: 'ลิโด้ คอนเน็คท์ (Lido Connect)', 
    latitude: 13.7448, 
    longitude: 100.5332, 
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400' 
  },
  { 
    id: 3, 
    name: 'ตลาดนัดจตุจักร (Chatuchak Market)', 
    latitude: 13.7999, 
    longitude: 100.5505, 
    image: 'https://images.unsplash.com/photo-1563911136181-e28989c9bc11?q=80&w=400' 
  },
  { 
    id: 4, 
    name: 'สวนป่าเบญจกิติ (Benchakitti Park)', 
    latitude: 13.7314, 
    longitude: 100.5583, 
    image: 'https://images.unsplash.com/photo-1589308454676-963f458e0be2?q=80&w=400' 
  },
  { 
    id: 5, 
    name: 'ย่านบรรทัดทอง (Ban Tad Thong)', 
    latitude: 13.7441, 
    longitude: 100.5233, 
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?q=80&w=400' 
  },
];