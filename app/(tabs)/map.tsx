import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'; // เพิ่มเพื่อบันทึกสถานที่

const hotSpots = [
  { 
    id: 1, 
    name: 'สยามสแควร์ (Siam Square)', 
    latitude: 13.7443, 
    longitude: 100.5326, 
    image: 'https://images.unsplash.com/photo-1588418012920-92854976ca88?q=80&w=200' 
  },
  { 
    id: 2, 
    name: 'ลิโด้ คอนเน็คท์ (Lido Connect)', 
    latitude: 13.7448, 
    longitude: 100.5332, 
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=200' 
  },
  { 
    id: 3, 
    name: 'ตลาดนัดจตุจักร (Chatuchak Market)', 
    latitude: 13.7999, 
    longitude: 100.5505, 
    image: 'https://images.unsplash.com/photo-1563911136181-e28989c9bc11?q=80&w=200' 
  },
  { 
    id: 4, 
    name: 'สวนป่าเบญจกิติ (Benchakitti Park)', 
    latitude: 13.7314, 
    longitude: 100.5583, 
    image: 'https://images.unsplash.com/photo-1589308454676-963f458e0be2?q=80&w=200' 
  },
  { 
    id: 5, 
    name: 'ย่านบรรทัดทอง (Ban Tad Thong)', 
    latitude: 13.7441, 
    longitude: 100.5233, 
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?q=80&w=200' 
  },
];

export default function MapScreen() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let userLoc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLoc.coords.latitude,
        longitude: userLoc.coords.longitude,
        latitudeDelta: 0.05, // ปรับ Delta ให้กว้างขึ้นเพื่อให้เห็นหมุดอื่นในโซนเดียวกัน
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // ฟังก์ชันสำหรับบันทึกสถานที่ที่เลือก
  const handleSelectLocation = async (spotName: string) => {
    try {
      await AsyncStorage.setItem('@selected_location', spotName);
      Alert.alert("เลือกสถานที่สำเร็จ", `คุณได้เลือก ${spotName} สำหรับนัดหมายแล้ว`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView 
          style={styles.map} 
          initialRegion={location} 
          provider={PROVIDER_GOOGLE}
        >
          <Marker 
            coordinate={location} 
            title="คุณอยู่ที่นี่" 
            pinColor="blue" 
          />
          
            {hotSpots.map(spot => (
  <Marker 
    key={spot.id}
    coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
    // 🚀 ย้ายการบันทึกสถานที่มาไว้ที่นี่เพื่อให้แน่ใจว่าค่าถูกเก็บ
    onCalloutPress={() => handleSelectLocation(spot.name)}
  >
    {/* ลบ tooltip ออกชั่วคราวเพื่อเช็คว่าหน้าต่างมาตรฐานขึ้นไหม 
        ถ้าขึ้นแล้วค่อยใส่กลับเพื่อตกแต่งครับ */}
    <Callout>
      <View style={styles.calloutContainer}>
        {/* สำหรับ Android: ต้องใส่พารามิเตอร์เพื่อให้รู้ว่ามีรูปภาพ */}
        <Image 
          source={{ uri: spot.image }} 
          style={{ width: 140, height: 80, borderRadius: 5 }}
          // 💡 เทคนิคสำคัญ: บังคับให้โหลดใหม่
          key={`${spot.id}_img`} 
        />
        <Text style={styles.calloutTitle}>{spot.name}</Text>
        <Text style={styles.selectBtnText}>แตะที่นี่เพื่อเลือกสถานที่</Text>
      </View>
    </Callout>
  </Marker>
))}
        </MapView>
      ) : (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF4757" />
          <Text>กำลังโหลดพิกัด...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // สไตล์สำหรับ Callout (ป๊อปอัพบนหมุด)
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    width: 180,
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
  },
  imageWrapper: {
    width: 160,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  calloutImage: {
    width: 160,
    height: 100,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2F3542',
    textAlign: 'center',
    marginBottom: 5,
  },
  selectBtn: {
    backgroundColor: '#FF4757',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  selectBtnText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  }
});