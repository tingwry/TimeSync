import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Pressable,
  Button,
} from "react-native";
import { theme } from "../theme";
import React from "react";
import { useRouter, useNavigation } from "expo-router";
import CardLocations from "@/components/address/CardLocations";
import { useAuth } from "../context/authContext";

export default function LocationsPage() {
  const navigation = useNavigation();
  const router = useRouter();
  const auth = useAuth();
  const access = auth.authData?.access;

  const fetchLocation = async () => {
    try {
      const baseUrl = process.env.BASE_URL;
      const response = await fetch(`${baseUrl}/location/view/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('location data');
        console.log(data);
      } else {
        console.error(data);

      }
    } catch (error) {
      console.error("Home - Error fetching schedule:", error);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("@/assets/icons/chevron-left.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.textButton}>More</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Locations</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Home Location</Text>
        <CardLocations
          locationName="Home"
          locationDetail="RHYTHM Rangnam"
          labelIcon={require("@/assets/icons/home.png")}
          navigateTo={() => router.push("/LocationHome")}
        />

        <Text style={[styles.textTitle, { marginTop: 24 }]}>
          Saved Location
        </Text>
        <Button onPress={fetchLocation} title="Fetch all Location" />
        <CardLocations
          locationName="Add new Location"
          locationDetail="go to nextttt"
          labelIcon={require("@/assets/icons/school.png")}
          navigateTo={() => router.push("/MapLocation")} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    backgroundColor: theme.colors.bluePrimary,
    gap: 16,
    paddingTop: 68,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  textHeader: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    color: theme.colors.textPrimary,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    paddingRight: 8,
    paddingVertical: 8,
    alignItems: "center",
    left: 0,
    flexDirection: "row",
    gap: 4,
  },
  textButton: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-medium",
  },
  container: {
    // paddingHorizontal: 8,
    flexDirection: "column",
  },
  textTitle: {
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginLeft: 8,
    marginTop: 8,
  },
  cardLocation: {
    flexDirection: "row",
    padding: 20,
    gap: 16,
    height: 96,
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    marginBottom: 16,
  },
});
