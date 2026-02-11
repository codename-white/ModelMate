import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { supabase } from '../utils/supabase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ฟังก์ชันสมัครสมาชิกแล้วเข้าใช้งานทันที
  async function handleSignUp() {
    if (!email || !password) return Alert.alert("กรุณากรอกข้อมูลให้ครบ");
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("สมัครไม่สำเร็จ", error.message);
    } else {
      // เมื่อปิด Confirm email แล้ว data.session จะมีค่าทันที
      if (data.session) {
        router.replace('/(tabs)');
      } else {
        Alert.alert("สำเร็จ", "กรุณาลองกดเข้าสู่ระบบอีกครั้ง");
      }
    }
    setLoading(false);
  }

  // ฟังก์ชันเข้าสู่ระบบปกติ
  async function handleSignIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("เข้าสู่ระบบไม่สำเร็จ", "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1492691523567-62791245f63d?w=800' }} 
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.logoText}>ModelMate</Text>
        <Text style={styles.subText}>ล็อกอินเพื่อค้นหานางแบบและสถานที่</Text>

        <TextInput
          style={styles.input}
          placeholder="อีเมล (เช่น test@gmail.com)"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="รหัสผ่าน (6 ตัวขึ้นไป)"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#FF4757" />
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
              <Text style={styles.btnText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
              <Text style={styles.signUpText}>สมัครสมาชิกใหม่</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 30 },
  logoText: { fontSize: 45, fontWeight: 'bold', color: '#FF4757', textAlign: 'center' },
  subText: { color: 'white', textAlign: 'center', marginBottom: 40, fontSize: 14 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  buttonContainer: { marginTop: 10 },
  loginBtn: { backgroundColor: '#FF4757', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  signUpBtn: { borderWidth: 1, borderColor: 'white', padding: 15, borderRadius: 12, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  signUpText: { color: 'white', fontWeight: '600' }
});