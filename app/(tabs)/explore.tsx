import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const tips = [
  { id: '1', title: 'การใช้กฎสามส่วน (Rule of Thirds)', icon: 'camera' },
  { id: '2', title: 'การเลือกโลเคชั่นช่วง Golden Hour', icon: 'sun-o' },
  { id: '3', title: 'เทคนิคการโพสต์ท่านางแบบมือใหม่', icon: 'user' },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Photographer Tips</Text>
      <FlatList
        data={tips}
        renderItem={({ item }) => (
          <View style={styles.tipCard}>
            <FontAwesome name={item.icon as any} size={24} color="#FF4757" />
            <Text style={styles.tipText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
  tipCard: { flexDirection: 'row', backgroundColor: '#f9f9f9', padding: 20, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  tipText: { marginLeft: 15, fontSize: 16 }
});