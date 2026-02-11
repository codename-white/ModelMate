// utils/gps.ts
import * as Location from 'expo-location';

export const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    return await Location.getCurrentPositionAsync({});
};

export const hotSpots = [
    { id: 1, name: 'ลิโด้ คอนเน็คท์ (Lido Connect)', latitude: 13.7448, longitude: 100.5332, image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400' },
    { id: 2, name: 'ตลาดนัดจตุจักร', latitude: 13.7999, longitude: 100.5505, image: 'https://images.unsplash.com/photo-1563911136181-e28989c9bc11?w=400' },
    { id: 3, name: 'สยามสแควร์ ซอย 7', latitude: 13.7443, longitude: 100.5326, image: 'https://images.unsplash.com/photo-1588418012920-92854976ca88?w=400' },
    { id: 4, name: 'สวนป่าเบญจกิติ', latitude: 13.7314, longitude: 100.5583, image: 'https://images.unsplash.com/photo-1589308454676-963f458e0be2?w=400' },
    { id: 5, name: 'ย่านบรรทัดทอง', latitude: 13.7441, longitude: 100.5233, image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?w=400' },
    { id: 6, name: 'ถนนเยาวราช', latitude: 13.7410, longitude: 100.5080, image: 'https://images.unsplash.com/photo-1555138122-38379f828751?w=400' },
    { id: 7, name: 'เอเชียทีค (Asiatique)', latitude: 13.7042, longitude: 100.5042, image: 'https://images.unsplash.com/photo-1596402184320-417d7178b2cd?w=400' },
    { id: 8, name: 'สะพานพุทธ (Memorial Bridge)', latitude: 13.7401, longitude: 100.4984, image: 'https://images.unsplash.com/photo-1590059535805-728b1855e985?w=400' },
    { id: 9, name: 'สวนหลวง ร.9', latitude: 13.6866, longitude: 100.6625, image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400' },
    { id: 10, name: 'เสาชิงช้า', latitude: 13.7517, longitude: 100.5012, image: 'https://images.unsplash.com/photo-1583491584857-79753c168285?w=400' },
    { id: 11, name: 'วัดอรุณฯ', latitude: 13.7437, longitude: 100.4883, image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400' },
    { id: 12, name: 'ตลาดจ๊อดแฟร์ (Jodd Fairs)', latitude: 13.7562, longitude: 100.5663, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400' },
    { id: 13, name: 'ไปรษณีย์กลาง บางรัก', latitude: 13.7276, longitude: 100.5152, image: 'https://images.unsplash.com/photo-1562612470-4a87796d88f6?w=400' },
    { id: 14, name: 'ท่ามหาราช', latitude: 13.7551, longitude: 100.4889, image: 'https://images.unsplash.com/photo-1590483734724-388185c6bc36?w=400' },
    { id: 15, name: 'สวนลุมพินี', latitude: 13.7313, longitude: 100.5417, image: 'https://images.unsplash.com/photo-1549414001-7243958e9939?w=400' },
    { id: 16, name: 'Chocolate Ville', latitude: 13.8117, longitude: 100.6644, image: 'https://images.unsplash.com/photo-1518116242379-0553750058e1?w=400' },
    { id: 17, name: 'ช่างชุ่ย (ChangChui)', latitude: 13.7885, longitude: 100.4876, image: 'https://images.unsplash.com/photo-1577935402511-73898801d0a5?w=400' },
    { id: 18, name: 'ปากคลองตลาด', latitude: 13.7420, longitude: 100.4950, image: 'https://images.unsplash.com/photo-1518116242379-0553750058e1?w=400' },
    { id: 19, name: 'BACC หอศิลป์กรุงเทพฯ', latitude: 13.7468, longitude: 100.5303, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400' },
    { id: 20, name: 'สะพานเขียว (สวนลุม-เบญจกิติ)', latitude: 13.7345, longitude: 100.5480, image: 'https://images.unsplash.com/photo-1590483734724-388185c6bc36?w=400' },
];