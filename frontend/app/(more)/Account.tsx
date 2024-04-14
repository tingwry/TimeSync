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
import React, { useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { theme } from "../theme";
import { router } from "expo-router";
import { authService } from "../context/authService";
import { AuthContext, useAuth } from "../context/authContext";

export default function AccountPage() {
  const navigation = useNavigation();
  const auth = useAuth();
  const access = auth.authData?.access;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  let getData = async () => {
    let response = await fetch('http://127.0.0.1:8000/app/auth/get-user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
        },
    });

    let data = await response.json();
    console.log(data);
    if (response.ok) {
        setName(data.name);
        setUsername(data.username);
        setPhone(data.phone_number);
        setEmail(data.email);
    } else {

    }
    
  };

  useEffect(() => {
    getData();
  }, []);

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
          <Text
            style={styles.textInfo}
            // onChangeText={(email) => setEmail(email)}
            // value={email}
          >
            {email}
            </Text>
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

        <TouchableOpacity style={styles.menu} onPress={auth.signOut}>
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
