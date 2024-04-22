import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  Button,
  Image,
  Dimensions,
} from "react-native";
import { theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import { isAbsolute } from "path";
import CardCountDownTimer from "@/components/cards/CardCountDownTimer";
import { useNavigation } from "expo-router";
import { useAuth } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PopUpCountdownTimer = () => {
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("../../assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("../../assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("../../assets/fonts/DMSans-SemiBold.ttf"),
    "dm-sans-regular": require("../../assets/fonts/DMSans-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const [MLTime, setMLTime] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [exceed, setExceed] = useState(false);

  // const [actualPrepTime, setActualPrepTime] = useState<number | null>(null);

  const navigation = useNavigation();
  const auth = useAuth();
  const access = auth.authData?.access;

  // const req = {
  //   // uid: 1,
  //   prep_time: actualPrepTime,
  // }

  useEffect(() => {
    AsyncStorage.getItem("CalculatedPrepTime").then((value) => {
      if (value !== null) {
        // setMLTime(parseInt(value, 10) * 60); // Parse string to integer
        // setTime(parseInt(value, 10) * 60); // Parse string to integer
        setTime(25 * 60);
        // Now, prepTime is a number
      } else {
        // Handle the case where the value is null (e.g., set a default value)
        console.error("Value is null");
      }
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (time !== null && time > 0 && !exceed) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime ?? time) - 1);
        setRemainingTime(time);
      }, 1000);
    }
    if (time !== null && time === 0 && !exceed) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime ?? time) + 1);
        setRemainingTime(time);
      }, 1000);
      setExceed(true);
    } else if (time !== null && time >= 0 && exceed) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime ?? time) + 1);
        setRemainingTime(time);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const stopCountdown = async () => {
    setModalVisible(false);
    console.log("MLTime: ", MLTime);
    console.log("time:", time);
    console.log("remainingTime: ", remainingTime);

    let actualPrepTime = null;

    if (exceed && remainingTime && MLTime) {
      actualPrepTime = MLTime + remainingTime;
      if (actualPrepTime) {
        console.log("actual prep time exceed: ", actualPrepTime);
      } else {
        console.log("actual prep time is null");
      }
    } else if (!exceed && remainingTime && MLTime) {
      console.log(MLTime, "and", remainingTime);
      actualPrepTime = MLTime - remainingTime;
      if (actualPrepTime) {
        console.log("actual prep time not exceed: ", actualPrepTime);
      } else {
        console.log("actual prep time is null");
      }
    }

    setTime(null);
    setMLTime(null);

    if (actualPrepTime) {
      const baseUrl = process.env.BASE_URL;
      let response = await fetch(`${baseUrl}/preptime/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
        body: JSON.stringify({
          prep_time: Math.round(actualPrepTime / 60),
        }),
      });
      // console.log(req)
      let result = await response.json();

      if (response.ok) {
        console.log("Create Total Prep Time Success");
        // navigation.goBack();
      } else {
        console.error("Create Total Prep Time Failed: ", result);
      }
    } else {
      console.error("Create Total Prep Time Failed: actual prep time is null");
    }
  };

  return (
    <View style={styles.container}>
      {time === null ? (
        <CardCountDownTimer time={time} exceed={exceed} />
      ) : (
        <Pressable onPress={() => setModalVisible(true)}>
          <CardCountDownTimer time={time} exceed={exceed} />
        </Pressable>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                style={{ width: 32, resizeMode: "contain" }}
                source={require("../../assets/icons/button-close.png")}
              />
            </Pressable>

            {exceed ? (
              <Text style={styles.modalHeader}>Departure time started</Text>
            ) : (
              <Text style={styles.modalHeader}>Departure time begins in</Text>
            )}

            <Text style={styles.timer}>
              {time !== null ? formatTime(time) : "00:00"}
            </Text>

            {exceed ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  style={{
                    marginTop: -16,
                    marginRight: -5,
                    width: 16,
                    resizeMode: "contain",
                  }}
                  source={require("../../assets/icons/alert-circle-yellow.png")}
                />
                <Text style={styles.modalYellowText}>
                  Departure time passed. You may be late.
                </Text>
              </View>
            ) : null}

            <Pressable
              onPress={stopCountdown}
              style={[styles.buttonContainer, styles.shadowProp]}
            >
              <LinearGradient
                colors={["#CF7B04", "#EDA33C"]}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>Stop Countdown</Text>
              </LinearGradient>
            </Pressable>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Image
                style={{
                  marginTop: 5,
                  marginRight: 5,
                  width: 16,
                  resizeMode: "contain",
                }}
                source={require("../../assets/icons/alert-circle.png")}
              />
              <Text style={styles.modalText}>
                Press this button after leaving your home to stop the countdown.
                The timer will continue until manually turned off.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  timer: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#283752",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  modalHeader: {
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom: 15,
    textAlign: "center",
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 20,
  },
  modalText: {
    paddingTop: 20,
    marginBottom: 15,
    textAlign: "left",
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-regular",
    fontSize: 12,
    width: "85%",
  },
  modalYellowText: {
    // marginBottom: 15,
    textAlign: "center",
    color: theme.colors.yellow,
    fontFamily: "dm-sans-regular",
    fontSize: 12,
    width: "85%",
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonStyle: {
    width: screenWidth - 112, // Adjusting width considering left and right margin of 32
    height: 48,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "dm-sans-extrabold",
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default PopUpCountdownTimer;
