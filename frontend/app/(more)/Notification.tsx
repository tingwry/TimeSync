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
import { router } from "expo-router";

export default function NotificationPage() {
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);
  const toggleReminderSwitch = () =>
    setIsReminderEnabled((previousState) => !previousState);

  const [isDepartTimeEnabled, setIsDepartTimeEnabled] = useState(true);
  const toggleDepartTimeSwitch = () =>
    setIsDepartTimeEnabled((previousState) => !previousState);

  const [isFollowUpEnabled, setIsFollowUpEnabled] = useState(true);
  const toggleFollowUpSwitch = () =>
    setIsFollowUpEnabled((previousState) => !previousState);

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
        <Text style={styles.textHeader}>Notifications</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.menu}>
          <Text style={styles.textMenu}>Schedule Reminder</Text>
          <View style={styles.switch}>
            <Switch
              trackColor={{
                false: theme.colors.textPrimary,
                true: theme.colors.green,
              }}
              ios_backgroundColor={theme.colors.textCaption}
              onValueChange={toggleReminderSwitch}
              value={isReminderEnabled}
            />
          </View>
        </View>
        <View style={styles.divLine} />

        <View style={styles.menu}>
          <Text style={styles.textMenu}>Departure Time</Text>
          <View style={styles.switch}>
            <Switch
              trackColor={{
                false: theme.colors.textPrimary,
                true: theme.colors.green,
              }}
              ios_backgroundColor={theme.colors.textCaption}
              onValueChange={toggleDepartTimeSwitch}
              value={isDepartTimeEnabled}
            />
          </View>
        </View>

        <View style={styles.divLine} />
        <View style={styles.menu}>
          <Text style={styles.textMenu}>Follow Up</Text>
          <View style={styles.switch}>
            <Switch
              trackColor={{
                false: theme.colors.textPrimary,
                true: theme.colors.green,
              }}
              ios_backgroundColor={theme.colors.textCaption}
              onValueChange={toggleFollowUpSwitch}
              value={isFollowUpEnabled}
            />
          </View>
        </View>
        <View style={styles.divLine} />
        <View style={styles.caution}>
          <Text style={styles.cautionMessage}>
            "Follow Up" notification will notify you if the Countdown Timer is not stopped.
          </Text>
        </View>
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
    paddingHorizontal: 8,
    flexDirection: "column",
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
  switch: {
    backgroundColor: theme.colors.textPrimary,
    padding: 1,
    borderRadius: 20,
  },
  caution: {
    paddingVertical: 12,
    gap: 8,
  },
  cautionMessage: {
    fontFamily: "dm-sans-regular",
    color: theme.colors.textCaption,
  },
});
