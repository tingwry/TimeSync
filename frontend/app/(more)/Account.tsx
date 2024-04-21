import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { theme } from "../theme";
import { router } from "expo-router";
import { AuthContext, useAuth } from "../context/authContext";
import { useIsFocused } from "@react-navigation/native";

export default function AccountPage() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const auth = useAuth();
  const access = auth.authData?.access;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, isLoading] = useState(false);
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);

  let getData = async () => {
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(`${baseUrl}/auth/get-user/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
        },
    });

    const data = await response.json();
    if (response.ok) {
        setName(data.name);
        setUsername(data.username);
        setPhone(data.phone_number);
        setEmail(data.email);
    } else {
      console.log("Something went wrong on more - account page");
      console.log(data);
    }
    
  };

  const signOutAlert = async () => {
    setSignOutModalVisible(true);
  }

  const signOutConfirm = async () => {
    await auth.signOut();
    router.dismissAll();
    router.push({
      pathname: '/SignIn',
    });
  }
  
  useEffect(() => {
    if (isFocused) {
      // Perform actions you want when the screen is focused.
      // This could be fetching data, re-rendering components, or any other refresh logic.
      getData();
    }
  }, [isFocused]);

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

      <Modal
        animationType="none"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={signOutModalVisible}
        onRequestClose={() => setSignOutModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.signOutModalView}>
            <Text style={styles.signOutModalTextTitle}>
              Do you want to sign out?
            </Text>
            <Text style={styles.signOutModalText}>
              You can sign in back at anytime. Your information will not be lost.
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable 
                style={styles.buttonCancel}
                onPress={() => setSignOutModalVisible(false)}
              >
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable 
                style={styles.buttonYes}
                onPress={signOutConfirm}
              >
                <Text style={styles.buttonText}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <TouchableOpacity style={styles.sectionInfo} onPress={() => {router.push('/(more)/EditAccount')}}>
          <Text style={styles.textTitle}>Name</Text>
          <Text style={styles.textInfo}>{name}</Text>
        </TouchableOpacity>
        <View style={styles.divLine} />

        <TouchableOpacity style={styles.sectionInfo} onPress={() => {router.push('/(more)/EditUsername')}}>
          <Text style={styles.textTitle}>Username</Text>
          <Text style={styles.textInfo}>{username}</Text>
        </TouchableOpacity>
        <View style={styles.divLine} />

        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Phone</Text>
          <Text style={styles.textInfo}>{phone}</Text>
        </View>
        <View style={styles.divLine} />

        <View style={styles.sectionInfo}>
          <Text style={styles.textTitle}>Email</Text>
          <Text style={styles.textInfo}>{email}</Text>
        </View>
        <View style={styles.divLine} />

        <TouchableOpacity style={styles.menu} onPress={() => {router.push('/(more)/ResetPassword')}}>
          <Text style={styles.textMenu}>Reset Password</Text>
          <Image
            source={require("@/assets/icons/chevron-right.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <View style={styles.divLine} />

        <TouchableOpacity style={styles.menu} onPress={signOutAlert}>
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
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000080',
  },
  signOutModalView: {
    backgroundColor: theme.colors.blueSecondary,
    // height: 176,
    borderRadius: 20,
    alignItems: 'center',
    padding: 24,
    paddingHorizontal: 32,
    margin: 24,
    width: 342,
  },
  signOutModalTextTitle: {
    fontFamily: "dm-sans-bold",
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: theme.colors.textPrimary,
  },
  signOutModalText: {
    // marginBottom: 15,
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.textCaption,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  buttonCancel: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,

    width: 128,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',    
  },
  buttonYes: {
    backgroundColor: theme.colors.red,
    borderRadius: 20,

    width: 128,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',  
  },
  buttonText : {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
  },
});