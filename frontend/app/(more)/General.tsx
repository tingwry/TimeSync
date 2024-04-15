import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
  Switch,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Link, useNavigation } from "expo-router";
import { theme } from "../theme";
import PasswordInput from "@/components/textinputs/PasswordInput";
import TextInputPrimary from "@/components/textinputs/TextInputPrimary";
import { useAuth } from "../context/authContext";

export default function GeneralPage() {
  const navigation = useNavigation();
  const auth = useAuth();
  const access = auth.authData?.access;

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletePasswordModalVisible, setDeletePasswordModalVisible] = useState(false);

  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
  });

  const validateForm = () => {
    let e = {
        password: '',
    };
    if (password === '') {
        e.password = 'Password is required';
    } 

    setErrors(e);
    return Object.values(e).every(x => x === '')
  }

  const submit = async () => {
    if (validateForm()) {
      console.log('delete account');
      const response = await fetch('http://127.0.0.1:8000/app/auth/delete-account/', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + access
          },
          body: JSON.stringify({ 
              'password' : password,
          }),
      });

      if (response.ok) {
          alert('Account deleted successfully');
          auth.signOut();
      } else {
          const errorData = await response.json();
          const errorMessage = errorData.password ? errorData.password[0] : "Unknown error occurred" 
          setErrors({
              password: errorMessage,
          });
      }
    }
  }

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

      <Modal
        animationType="none"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(false);
          setDeletePasswordModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.deleteModalView}>
            { deletePasswordModalVisible ? ( <>
              <Text style={styles.deleteModalTextTitle}>
                Please enter your password to confirm the account deletion
              </Text>
              <Text style={styles.deleteModalText}>
                All of your information will be permanently deleted once proceeded.
              </Text>

              <PasswordInput 
                // label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                errorText={errors.password}
                password
                style={styles.passwordInput}
              />

              <View style={styles.buttonContainer}>
                <Pressable 
                  style={styles.buttonCancel}
                  onPress={() => {
                    setDeleteModalVisible(false);
                    setDeletePasswordModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>
                    Discard
                  </Text>
                </Pressable>
                <Pressable 
                  style={styles.buttonYes}
                  onPress={submit}
                >
                  <Text style={styles.buttonText}>
                    Delete my account
                  </Text>
                </Pressable>
              </View>
            </> ) : ( <>
              <Text style={styles.deleteModalTextTitle}>
                Are you sure you would like to delete your account?
              </Text>
              <Text style={styles.deleteModalText}>
                All of your information will be permanently deleted once proceeded.
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={styles.buttonCancel}
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text style={styles.buttonText}>
                    Keep my account
                  </Text>
                </Pressable>
                <Pressable 
                  style={styles.buttonYes}
                  onPress={() => setDeletePasswordModalVisible(true)}
                >
                  <Text style={styles.buttonText}>
                    Yes, Delete my account
                  </Text>
                </Pressable>
              </View>
            </> )}
            
          </View>
        </View>
      </Modal>

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
        <TouchableOpacity style={styles.menu} onPress={() => {setDeleteModalVisible(true)}}>
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000080',
  },
  deleteModalView: {
    backgroundColor: theme.colors.blueSecondary,
    // height: 176,
    borderRadius: 20,
    alignItems: 'center',
    padding: 24,
    paddingHorizontal: 32,
    margin: 24,
    width: 342,
  },
  deleteModalTextTitle: {
    fontFamily: "dm-sans-bold",
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: theme.colors.textPrimary,
  },
  deleteModalText: {
    // marginBottom: 15,
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.textCaption,
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: theme.colors.orange,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    gap: 16,
  },
  buttonCancel: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,

    width: '100%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',    
  },
  buttonYes: {
    backgroundColor: theme.colors.red,
    borderRadius: 20,

    width: '100%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',  
  },
  buttonText : {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
  },

});
