import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Alert } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🚀 Import ข้อมูลจากไฟล์ utils
import { hotSpots } from '../../utils/gps';

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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const handleSelectLocation = async (spotName: string) => {
    await AsyncStorage.setItem('@selected_location', spotName);
    Alert.alert("บันทึกสำเร็จ", `เลือก ${spotName} แล้ว`);
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView style={styles.map} initialRegion={location} provider={PROVIDER_GOOGLE}>
          {hotSpots.map((spot) => (
            <Marker 
              key={spot.id}
              coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
              // 💡 สำคัญ: ใช้ onCalloutPress สำหรับ Android
              onCalloutPress={() => handleSelectLocation(spot.name)}
            >
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Image 
                    source={{ uri: spot.image }} 
                    style={styles.calloutImage}
                    // บังคับขนาดให้ชัดเจนเพื่อให้ Android วาดรูปได้
                  />
                  <Text style={styles.calloutTitle}>{spot.name}</Text>
                  <View style={styles.btn}>
                    <Text style={{color: 'white', fontSize: 10}}>แตะเพื่อเลือกสถานที่</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
          <Marker coordinate={location} title="You" pinColor="blue" />
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={{flex:1}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  calloutContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  calloutImage: { width: 130, height: 80, borderRadius: 5, marginBottom: 5 },
  calloutTitle: { fontWeight: 'bold', fontSize: 13, textAlign: 'center' },
  btn: { backgroundColor: '#FF4757', padding: 5, borderRadius: 5, marginTop: 5 }
});