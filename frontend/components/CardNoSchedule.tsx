import { theme } from "@/app/theme";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { Children } from "react";
import { Tabs } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";
import ButtonNewSchedule from "@/components/buttons/ButtonNewSchedule";

export default function CardNewSchedule() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  const handlePress = () => {
    navigation.navigate("NewScheduleSheet");
  };

  return (
    <View>
      <Text style={styles.textUpcoming}>Upcoming Schedule</Text>
      <Pressable onPress={handlePress}>
        <View style={styles.addScheduleTab}>
          <Text style={styles.textCaption}>No Upcoming Schedule</Text>
          <Text style={styles.textTitle}>Add Schedule</Text>
          <View style={styles.addButton}>
          <Image
            source={require("@/assets/icons/plus.png")}
            style={{ width: 32, height: 32 }}
          />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addScheduleTab: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 24,
    padding: 10,
    marginLeft: 24,
    marginRight: 24,
    // marginTop: 20,
    justifyContent: "center",
    alignItems: "center",    
  },
  textCaption: {
    fontFamily: "dm-sans-regular",
    fontSize: 12,
    color: theme.colors.textPrimary,
    marginTop: 24,
    marginBottom: 24,
  },
  textUpcoming: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    marginLeft: 32,
    marginTop: 50,
    marginBottom: 24,
    color: theme.colors.textPrimary,
  },
  textTitle: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    color: theme.colors.textPrimary,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.textPlaceholder,
    borderRadius: 20,
    marginTop: 18,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
