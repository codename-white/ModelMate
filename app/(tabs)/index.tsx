import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Model {
  id: string;
  name: string;
  thumbnail: string;
  city: string;
}

export default function FeedScreen() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=15');
      const data = await response.json();
      const formattedData = data.results.map((item: any) => ({
        id: item.login.uuid,
        name: `${item.name.first} ${item.name.last}`,
        thumbnail: item.picture.large,
        city: item.location.city,
      }));
      setModels(formattedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveFavorite = async (model: Model) => {
    try {
      const existing = await AsyncStorage.getItem('@fav_models');
      let favs = existing ? JSON.parse(existing) : [];
      
      // ตรวจสอบว่ามีอยู่แล้วหรือยัง
      if (!favs.some((f: Model) => f.id === model.id)) {
        favs.push(model);
        await AsyncStorage.setItem('@fav_models', JSON.stringify(favs));
        alert('บันทึกเรียบร้อย!');
      } else {
        alert('มีในรายการโปรดแล้ว');
      }
    } catch (e) { console.error(e); }
  };

  if (loading) return <ActivityIndicator size="large" color="#FF4757" style={styles.centered} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>ModelMate Explore</Text>
      <FlatList
        data={models}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.city}>{item.city}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => saveFavorite(item)}>
                <Text style={styles.btnText}>สนใจร่วมงาน</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', padding: 20, color: '#2F3542' },
  centered: { flex: 1, justifyContent: 'center' },
  card: { 
    flexDirection: 'row', 
    padding: 16, 
    marginHorizontal: 16, 
    marginVertical: 8, 
    backgroundColor: 'white', 
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center'
  },
  image: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#FF4757' },
  info: { marginLeft: 16, flex: 1 }, // ทำให้ขนาดกล่องข้อความขยายเท่ากันทุกใบ
  name: { fontSize: 18, fontWeight: 'bold', color: '#2F3542' },
  city: { fontSize: 14, color: '#747D8C', marginBottom: 8 },
  btn: { backgroundColor: '#FF4757', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, alignSelf: 'flex-start' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 13 }
});