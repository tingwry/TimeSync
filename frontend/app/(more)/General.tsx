import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { Link, useNavigation } from "expo-router";
import { theme } from "../theme";

export default function GeneralPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();

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
        <Text style={styles.textHeader}>General</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.textTitle}>Privacy</Text>

        <View style={styles.divLine} />
        <View style={styles.menu}>
          <Text style={styles.textMenu}>Location Service</Text>
          <View style={styles.switch}>
            <Switch
              trackColor={{
                false: theme.colors.textPrimary,
                true: theme.colors.green,
              }}
              ios_backgroundColor={theme.colors.textCaption}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={styles.divLine} />

        <Text style={styles.textTitle}>Account Management</Text>

        <View style={styles.divLine} />
        <TouchableOpacity style={styles.menu}>
          <Text style={styles.textMenuRed}>Delete Account</Text>
          <Image
            source={require("@/assets/icons/chevron-right.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <View style={styles.divLine} />

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
    marginBottom: 0,
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
    paddingHorizontal: 8,
    flexDirection: "column",
  },
  textTitle: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    color: theme.colors.textPrimary,
    marginBottom: 16,
    marginTop: 32,
  },
  divLine: {
    height: 1,
    backgroundColor: theme.colors.divLine,
    justifyContent: "flex-end",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
  },
  textMenu: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  textMenuRed: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.red,
    fontSize: 16,
  },
  switch: {
    backgroundColor: theme.colors.textPrimary,
    padding: 1,
    borderRadius: 20,
  },
});
