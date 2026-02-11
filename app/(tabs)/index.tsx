import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase'; // ตรวจสอบว่าไฟล์นี้ใส่ URL/Key จริงแล้ว
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    const { data, error } = await supabase.from('models').select('*');
    if (!error) setModels(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color="#FF4757" /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ค้นหานางแบบไทย</Text>
      <FlatList
        data={models}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {setRefreshing(true); fetchData();}} />}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({ pathname: '/modal', params: { ...item } })}
          >
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.cityText}><FontAwesome name="map-marker" /> {item.city}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', marginTop: 60, marginBottom: 20, color: '#FF4757' },
  card: { flexDirection: 'row', padding: 15, marginBottom: 15, backgroundColor: '#fff', borderRadius: 15, alignItems: 'center', elevation: 3, shadowOpacity: 0.1 },
  image: { width: 70, height: 70, borderRadius: 35 },
  info: { flex: 1, marginLeft: 15 },
  nameText: { fontSize: 18, fontWeight: 'bold' },
  cityText: { fontSize: 13, color: '#747d8c', marginTop: 4 }
});