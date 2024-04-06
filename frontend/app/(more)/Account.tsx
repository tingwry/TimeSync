import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { theme } from "../theme";
import { router } from "expo-router";

export default function AccountPage() {
  const navigation = useNavigation();

  const [name, setName] = useState("Amy");
  const [username, setUsername] = useState("@amychampagne");
  const [phone, setPhone] = useState("+ 66 89 888 9999");
  const [email, setEmail] = useState("amy.champagne@gmail.com");

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
        <Text style={styles.textHeader}>Account</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Name</Text>
          <TextInput
            style={styles.textInfo}
            onChangeText={(name) => setName(name)}
            value={name}
          />
        </View>
        <View style={styles.divLine} />

        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Username</Text>
          <TextInput
            style={styles.textInfo}
            onChangeText={(username) => setUsername(username)}
            value={username}
          />
        </View>
        <View style={styles.divLine} />

        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Phone</Text>
          <TextInput
            style={styles.textInfo}
            onChangeText={(phone) => setPhone(phone)}
            value={phone}
          />
        </View>
        <View style={styles.divLine} />

        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Email</Text>
          <TextInput
            style={styles.textInfo}
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        <View style={styles.divLine} />

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.textMenu}>Reset Password</Text>
          <Image
            source={require("@/assets/icons/chevron-right.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <View style={styles.divLine} />

        <TouchableOpacity style={styles.menu}>
          <Text style={styles.textMenuRed}>Sign out</Text>
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
    marginBottom: 16,
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
  sectionInfo: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
  },
  textTitle: {
    fontFamily: "dm-sans-regular",
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  textInfo: {
    position: "absolute",
    left: 106,
    fontFamily: "dm-sans-medium",
    color: theme.colors.textPrimary,
    fontSize: 16,
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
});
