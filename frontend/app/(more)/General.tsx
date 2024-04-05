import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { theme } from "../theme";
import { router } from "expo-router";

export default function AccountPage() {
  const [isLocationSharingEnabled, setLocationSharingEnabled] = useState(false);

  const toggleLocationSharing = () => {
    setLocationSharingEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity
        onPress={() => router.push("(more)")}
        style={styles.btnOutline}
      >
        <Image
          source={require("@/assets/icons/chevron-left.png")}
          style={styles.btnIconArrowLeft}
        />
        <Text style={styles.smallmore}>More</Text>
      </TouchableOpacity>
      <Text style={styles.general}>General</Text>
      <Text style={styles.privacy}>Privacy</Text>
      {/* //for prfile section */}
      <View>
        {/* <Text style={styles.btnText}>Account</Text> */}
        <View style={{ bottom: 55, right: 7 }}>
          <View
            style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
          />
          <View style={styles.btnOutline}>
            <Text style={styles.btnText}>Location Sharing</Text>
            <TouchableOpacity onPress={toggleLocationSharing}>
              <Image
                source={
                  isLocationSharingEnabled
                    ? require("@/assets/icons/butt-on.png")
                    : require("@/assets/icons/butt-off.png")
                }
                style={styles.btntoggle}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
          />
          <Text style={styles.acc}>Account Management</Text>
          {/* <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} /> */}
          <View style={{ bottom: 40 }}>
            <View
              style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
            />
            <TouchableOpacity style={styles.btnOutline}>
              <Text style={styles.btnSignout}>Delete Account</Text>
              <Image
                source={require("@/assets/icons/chevron-right.png")}
                style={styles.btnIconArrow}
              />
            </TouchableOpacity>
            <View
              style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 90,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: theme.colors.bluePrimary,
    gap: 16,
  },
  btnOutline: {
    backgroundColor: theme.colors.bluePrimary,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 90,
    fontFamily: "dm-sans-regular",
  },
  normalText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-regular",
    right: 80,
  },
  btn: {
    backgroundColor: theme.colors.red,
    height: 48,
    width: 326,
    borderRadius: 6,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  btntoggle: {
    left: 55,
  },
  btnText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-regular",
    right: 80,
  },
  smallmore: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-regular",
    right: 65,
  },
  btnSignout: {
    color: theme.colors.red,
    fontSize: 16,
    fontFamily: "dm-sans-regular",
    right: 80,
  },
  btnIcon: {
    position: "absolute",
    left: 1,
    height: 20,
    width: 20,
  },
  btnIconArrow: {
    position: "absolute",
    right: 1,
    height: 20,
    width: 20,
  },
  btnIconArrowLeft: {
    position: "absolute",
    left: 1,
    height: 20,
    width: 20,
  },
  general: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontFamily: "dm-sans-extrabold",
    left: 130,
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    color: theme.colors.textPrimary,
    fontSize: 19,
    fontFamily: "dm-sans-semibold",
    paddingTop: 4,
    paddingBottom: 7,
  },
  alarm: {
    position: "relative",
    color: theme.colors.textPrimary,
    fontSize: 19,
    fontFamily: "dm-sans-semibold",
    top: 40,
    paddingBottom: 7,
  },
  privacy: {
    marginTop: 20,
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontFamily: "dm-sans-extrabold",
    left: 4,
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  acc: {
    marginTop: 80,
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontFamily: "dm-sans-extrabold",
    left: 4,
    bottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
