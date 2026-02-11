import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '../utils/supabase'; //

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบสถานะ Auth ตลอดเวลา
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.replace('/login'); // ถ้าไม่มี Session ให้ไปหน้า Login
      } else {
        router.replace('/(tabs)'); // ถ้ามีให้ไปหน้าแอปหลัก
      }
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}