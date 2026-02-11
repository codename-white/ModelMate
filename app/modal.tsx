import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalScreen() {
  const router = useRouter();
  const { id, name, image_url, city, bio } = useLocalSearchParams();

  const saveToFav = async () => {
    const existing = await AsyncStorage.getItem('@fav_models');
    let favs = existing ? JSON.parse(existing) : [];
    if (!favs.some((f: any) => f.id === id)) {
      favs.push({ id, name, image_url, city });
      await AsyncStorage.setItem('@fav_models', JSON.stringify(favs));
      alert('บันทึกเรียบร้อย! ไปนัดงานได้ที่หน้ารายการโปรดครับ');
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image_url as string }} style={styles.img} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.bioTitle}>รายละเอียด</Text>
        <Text style={styles.bioText}>{bio}</Text>
        
        <TouchableOpacity style={styles.btn} onPress={saveToFav}>
          <Text style={styles.btnText}>สนใจร่วมงานกับคนนี้</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  img: { width: '100%', height: 400 },
  content: { padding: 25 },
  name: { fontSize: 28, fontWeight: 'bold' },
  city: { fontSize: 16, color: 'gray', marginBottom: 20 },
  bioTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  bioText: { fontSize: 15, lineHeight: 22, color: '#444' },
  btn: { backgroundColor: '#FF4757', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 30 },
  btnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
