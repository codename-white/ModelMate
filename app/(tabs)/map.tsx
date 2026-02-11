import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocation, hotSpots } from "@/utils/gps"; //

export default function MapScreen() {
    const [location, setLocation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const onLoad = async () => {
        let loc = await getLocation(); //
        if (loc) {
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.12, // ขยายให้เห็นหลายจุดพร้อมกัน
                longitudeDelta: 0.12,
            });
        }
        setLoading(false);
    };

    const handleSelectPlace = async (placeName: string) => {
        await AsyncStorage.setItem('@selected_location', placeName); //
        Alert.alert("บันทึกสำเร็จ", `เลือก ${placeName} สำหรับนัดงานแล้ว`);
    };

    useEffect(() => {
        onLoad();
    }, []);

    if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color="#FF4757" /></View>;

    return (
        <View style={styles.container}>
            <View style={styles.infoBar}>
                <Text style={styles.infoText}>เลือกสถานที่ถ่ายรูป (20 จุดยอดนิยม)</Text>
            </View>

            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={location}
            >
                {hotSpots.map((spot) => (
                    <Marker
                        key={spot.id}
                        coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
                        onCalloutPress={() => handleSelectPlace(spot.name)} //
                    >
                        <View style={styles.markerContainer}>
                            <View style={styles.markerIcon}>
                                <FontAwesome name="camera" size={14} color="white" />
                            </View>
                            <View style={styles.markerArrow} />
                        </View>

                        <Callout tooltip>
                            <View style={styles.calloutBox}>
                                <Image source={{ uri: spot.image }} style={styles.calloutImage} />
                                <Text style={styles.calloutTitle}>{spot.name}</Text>
                                <View style={styles.selectBtn}>
                                    <Text style={styles.btnText}>แตะเพื่อเลือกที่นี่</Text>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    map: { width: '100%', height: '100%' },
    infoBar: { height: 80, backgroundColor: "#FF4757", justifyContent: 'center', alignItems: 'center', paddingTop: 25 },
    infoText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    markerContainer: { alignItems: 'center' },
    markerIcon: { backgroundColor: '#FF4757', padding: 6, borderRadius: 15, borderWidth: 1, borderColor: 'white' },
    markerArrow: { width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 8, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#FF4757', marginTop: -1 },
    calloutBox: { width: 160, backgroundColor: 'white', borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' },
    calloutImage: { width: 140, height: 90, borderRadius: 5, marginBottom: 5 },
    calloutTitle: { fontWeight: 'bold', fontSize: 13, textAlign: 'center', marginBottom: 5 },
    selectBtn: { backgroundColor: '#2ecc71', padding: 5, borderRadius: 5 },
    btnText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});