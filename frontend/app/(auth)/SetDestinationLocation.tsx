import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../theme";
import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { Link, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker, Callout } from "react-native-maps";

export default function SetDestinationLocation() {
  const router = useRouter();
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  const { latitude, longitude } = useLocalSearchParams<{
    latitude: string;
    longitude: string;
  }>();

  useEffect(() => {
    if (latitude && longitude) {
      setLat(Number(latitude));
      setLong(Number(longitude));
    }
  }, [latitude, longitude]);

  console.log(lat, long);

  const isLatLngValid = lat !== 0 && long !== 0;
  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelView}>
          <Image
            source={require("@/assets/icons/home-location.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <Text style={styles.textHeader}>Set Default Destination</Text>
      </View>

      <View style={styles.contentView}>
        <Pressable
          style={styles.mapButton}
          onPress={() => router.push("/MapDestination")}
        >
          <View style={styles.mapLabel}>
            <Image
              source={require("@/assets/icons/location.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <Text style={styles.textMap}>Choose Location</Text>
        </Pressable>
        {isLatLngValid && (
          <MapView
            // provider={PROVIDER_GOOGLE}
            style={{
              width: "100%",
              height: 350,
              marginTop: 30,
              borderRadius: 20,
            }}
            initialRegion={{
              latitude: lat,
              longitude: long,
              // latitude: 13.736834400006273,
              // longitude: 100.53314465311604,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.000421,
            }}
          >
            <Marker
              coordinate={{ latitude: lat, longitude: long }}
              image={require("@/assets/icons/map-marker.png")}
            />
          </MapView>
        )}
      </View>

      <View style={styles.footer}>
        {/* <Link href="/Home">Next</Link> */}
        <View style={styles.indicatorContainer}>
          <Pressable
            style={styles.indicatorFocus}
            onPress={() => router.push("/SetHomeLocation")}
          />

          <Pressable
            style={styles.indicatorFocus}
            onPress={() => router.push("/SetPreparationTime")}
          />
          <View style={styles.indicatorFocus} />
        </View>
        <ButtonPrimary
          text={isLatLngValid ? "Finish Setting Up" : "Choose Location"}
          press={() => {
            if (isLatLngValid) {
              router.push("/onboarding/Loading");
            } else {
              router.push("/MapDestination");
            }
          }}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexGrow: 1,
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 28,
    marginTop: 28,
    marginBottom: 24,
  },
  contentView: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 32,
  },
  labelView: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: theme.colors.textPlaceholder,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 136,
  },
  mapButton: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 24,
    paddingLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 20,
  },
  mapLabel: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.textPlaceholder,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textMap: {
    fontFamily: "dm-sans-semibold",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
    bottom: 44,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginBottom: 24,
    justifyContent: "center",
  },
  indicator: {
    width: 42,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textPlaceholder,
  },
  indicatorFocus: {
    width: 42,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textPrimary,
  },
});
