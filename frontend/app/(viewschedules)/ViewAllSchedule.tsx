import { View, Text, Image, Pressable, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { theme } from "../theme";
import { styles } from "@/components/sheets/SheetStyles";

export default function AllSchedule() {


  return (
    <View >
      <View >
        <Text style={styles.textHeader}>Hello, User</Text>
        <Text style={styles.textHeader}>Let's see what is up next!</Text>
      </View>
     
    </View>
  );
}
