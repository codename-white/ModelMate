import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import * as Linking from 'expo-linking'; 
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavs = async () => {
    const data = await AsyncStorage.getItem('@fav_models');
    if (data) setFavorites(JSON.parse(data));
  };

  useFocusEffect(
    useCallback(() => {
      loadFavs();
    }, [])
  );

  const removeOne = async (id: string) => {
    const updatedFavs = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavs);
    await AsyncStorage.setItem('@fav_models', JSON.stringify(updatedFavs));
  };

  const clearFavs = async () => {
    Alert.alert("ยืนยัน", "ต้องการล้างรายการทั้งหมดใช่หรือไม่?", [
      { text: "ยกเลิก" },
      { text: "ตกลง", onPress: async () => {
          await AsyncStorage.removeItem('@fav_models');
          setFavorites([]);
        } 
      }
    ]);
  };

  // 🔥 แก้ไขฟังก์ชันนัดงานให้ดึงสถานที่และส่งแชท
  const handleBooking = async (name: string) => {
    // 1. ดึงสถานที่ที่บันทึกไว้จากหน้า Map
    const selectedPlace = await AsyncStorage.getItem('@selected_location');
    
    // 2. สร้างข้อความนัดหมาย
    const placeText = selectedPlace ? `ที่ ${selectedPlace}` : 'สถานที่นัดหมาย (ยังไม่ได้ระบุ)';
    const message = `สวัสดีครับคุณ ${name}, ผมสนใจนัดถ่ายภาพ ${placeText} ไม่ทราบว่าคุณสะดวกไหมครับ?`;

    Alert.alert(
      "ส่งข้อความนัดหมาย",
      `นัดหมายคุณ ${name}\n${placeText}`,
      [
        { 
          text: "ส่งข้อความ (Line)", 
          onPress: () => {
            // 3. เปิดแอป Line พร้อมส่งข้อความ (ใช้ encode เพื่อรองรับภาษาไทย)
            const url = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
            Linking.openURL(url);
          } 
        },
        { text: "ยกเลิก", style: "cancel" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>รายการที่สนใจ</Text>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={clearFavs}>
            <Text style={{color: 'red'}}>ล้างข้อมูล</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item: any) => item.id}
        ListEmptyComponent={<View style={styles.empty}><Text>ยังไม่มีรายการที่บันทึกไว้</Text></View>}
        renderItem={({ item }: any) => (
          <View style={styles.favCard}>
            <Image source={{ uri: item.thumbnail }} style={styles.smallImg} />
            <View style={{ flex: 1, marginLeft: 15 }}>
               <Text style={styles.favName}>{item.name}</Text>
               <Text style={{ fontSize: 12, color: 'gray' }}>{item.city}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                  style={styles.bookBtn} 
                  onPress={() => handleBooking(item.name)}
                >
                  <Text style={styles.btnText}>นัดงาน</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{ marginLeft: 15 }} 
                  onPress={() => removeOne(item.id)}
                >
                  <FontAwesome name="trash" size={22} color="#ff4757" />
                </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', marginTop: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  favCard: { flexDirection: 'row', padding: 15, marginHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  smallImg: { width: 55, height: 55, borderRadius: 27.5 },
  favName: { fontSize: 16, fontWeight: '600', color: '#2f3542' },
  bookBtn: { backgroundColor: '#2ecc71', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  empty: { flex: 1, alignItems: 'center', marginTop: 100 }
});