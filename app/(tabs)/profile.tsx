import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import * as Linking from 'expo-linking';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useFocusEffect(useCallback(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('@fav_models');
      if (data) setFavorites(JSON.parse(data));
    };
    load();
  }, []));

  const handleBooking = async (name: string) => {
    const place = await AsyncStorage.getItem('@selected_location') || 'สถานที่ยังไม่ระบุ';
    const msg = `สวัสดีครับคุณ ${name}, สนใจนัดถ่ายภาพที่ ${place} ครับ`;
    Linking.openURL(`https://line.me/R/msg/text/?${encodeURIComponent(msg)}`);
  };

  const removeOne = async (id: any) => {
    const filtered = favorites.filter(item => item.id !== id);
    setFavorites(filtered);
    await AsyncStorage.setItem('@fav_models', JSON.stringify(filtered));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>รายการนัดหมาย</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.img} />
            <View style={{flex:1, marginLeft: 15}}>
              <Text style={{fontWeight:'bold'}}>{item.name}</Text>
              <TouchableOpacity style={styles.bookBtn} onPress={() => handleBooking(item.name)}>
                <Text style={{color:'white', fontSize: 12}}>นัดงาน (Line)</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeOne(item.id)}>
              <FontAwesome name="trash" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 20 },
  card: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  img: { width: 60, height: 60, borderRadius: 30 },
  bookBtn: { backgroundColor: '#2ecc71', padding: 6, borderRadius: 5, marginTop: 5, alignSelf: 'flex-start' }
});