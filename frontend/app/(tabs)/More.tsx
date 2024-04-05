import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { router, useNavigation, useRouter } from "expo-router";
import { Link } from "expo-router";
import { theme } from "../theme";

export default function ListPage() {
  const router = useRouter();

  return (
    <View style={styles.background}>
      <Text style={styles.textTitle}>More</Text>
      <Text style={styles.sectionTitle}>Profile</Text>

      <View style={styles.divLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => router.navigate("Account")}>
        <Image
          source={require("@/assets/icons/user-nav.png")}
          style={{width: 20, height: 20}}
        />
        <Text style={styles.menuText}>Account</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => router.navigate("Location")}>
        <Image
          source={require("@/assets/icons/location.png")}
          style={{width: 20, height: 20}}
        />
        <Text style={styles.menuText}>Locations</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => router.navigate("Account")}>
        <Image
          source={require("@/assets/icons/preparation.png")}
          style={{width: 20, height: 20}}
        />
        <Text style={styles.menuText}>Preparation Time</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />

      <Text style={styles.sectionTitle}>Alarm</Text>
      <View style={styles.divLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => router.navigate("Alarm")}>
        <Image
          source={require("@/assets/icons/alarm-clock.png")}
          style={{width: 20, height: 20}}
        />
        <Text style={styles.menuText}>Alarm Settings</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />

      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.divLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => router.navigate("General")}>
        <Image
          source={require("@/assets/icons/setting.png")}
          style={{width: 20, height: 20}}
        />
        <Text style={styles.menuText}>General</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />
      <TouchableOpacity style={styles.menuButton} onPress={() => router.navigate("Notification")}>
        <Image
          source={require("@/assets/icons/notifications.png")}
          style={{width: 20, height: 20}}
        />
        <Text style={styles.menuText}>Notifications</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />

    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.bluePrimary,
    color: theme.colors.textPrimary,
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  textTitle: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-extrabold",
    fontSize: 36,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontFamily: "dm-sans-bold",
    marginTop: 32,
    marginBottom: 16,
  },
  divLine: {
    height: 1,
    backgroundColor: theme.colors.divLine,
    justifyContent: "flex-end",
  },
  menuButton: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-medium",
  },
  chevronStyle: {
    width: 24,
    height: 24,
    right: 0,
    position: "absolute",
  },
});
