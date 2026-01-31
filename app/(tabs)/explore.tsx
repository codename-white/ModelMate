import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// ข้อมูลบทความความรู้สำหรับตากล้อง
const tips = [
  { id: '1', title: 'การตั้งค่า ISO สำหรับถ่าย Portrait', icon: 'camera' },
  { id: '2', title: '5 สถานที่ถ่ายรูปในกรุงเทพฯ ที่แสงสวยที่สุด', icon: 'map' },
  { id: '3', title: 'เทคนิคการจัดองค์ประกอบภาพแบบกฎสามส่วน', icon: 'image' },
  { id: '4', title: 'วิธีการคุยกับนางแบบสำหรับมือใหม่', icon: 'comments' },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Photographer Tips </Text>
      <FlatList
        data={tips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemCard}>
            <FontAwesome name={item.icon as any} size={24} color="#FF4757" />
            <Text style={styles.itemText}>{item.title}</Text>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40, color: '#2F3542' },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 2,
  },
  itemText: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: '500', color: '#2F3542' }
});