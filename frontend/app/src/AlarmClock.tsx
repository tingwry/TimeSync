import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  LogBox,
  Button,
  Modal,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { Asset } from "expo-asset";
import { useAuth } from "../context/authContext";
// import AlarmPageModal from "./AlarmPage";
import { LinearGradient } from "expo-linear-gradient";

LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface AlarmClockProps {
  wakeupTime: string;
  departureTime: string;
  setWakeupTime: (value: string) => void;
  setDepartureTime: (value: string) => void;
}


export default function AlarmClock({
  wakeupTime,
  departureTime,
  setWakeupTime,
  setDepartureTime,
}: AlarmClockProps) {
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  //   const responseListener = useRef();
  // const [hourr, setHour] = useState("");
  // const [minutee, setMinute] = useState("");
  // const [ampm, setAmpm] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [notificationId, setNotificationId] = useState("none");

  const [alarmCreated, setAlarmCreated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [calculatedPrepTime, setCalculatedPrepTime] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Sound | null>(null);

  // const [wakeupTime, setWakeupTime] = useState<string>("");
  // const [departureTime, setDepartureTime] = useState<string>("");

  const auth = useAuth();
  const access = auth.authData?.access;

  const [scheduleIds, setScheduleIds] = useState<number[]>([]);

  // let date = new Date();
  // date.setSeconds(date.getSeconds() + 5);

  // let dateFromDB = "2024-04-21";
  // // let date = new Date(dateFromDB);

  // let timeFromML = "17:42:00";
  // let dateTimeString = dateFromDB + " " + timeFromML;
  // let date = new Date(dateTimeString);

  const predictMLTime = async (arriving_time: string) => {
    const baseUrl = process.env.BASE_URL;
    let response = await fetch(`${baseUrl}/ML/predict/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access,
      },
      body: JSON.stringify({
        arriving_time: arriving_time,
      }),
    });
    let result = await response.json();

    if (response.ok) {
      console.log("Predict Success");
      console.log(result);
      // console.log(result.wake_up_time);
      // console.log(result.departure_time);
      setWakeupTime(result.wake_up_time);
      setDepartureTime(result.departure_time);
      return result;
    } else {
      console.error(result);
    }
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const baseUrl = process.env.BASE_URL;
        const response = await fetch(`${baseUrl}/schedule/view/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access,
          },
        });

        const data = await response.json();
        console.log(scheduleIds);

        if (response.ok) {
          for (const event of data) {
            console.log(event);
            if (!scheduleIds.includes(event.event_id)) {
              setScheduleIds((prevScheduleIds) => [
                ...prevScheduleIds,
                event.event_id,
              ]);
            }

            console.log(scheduleIds);
            // let date = new Date();
            // date.setSeconds(date.getSeconds() + 5);

            // let dateFromDB = "2024-04-21";
            let dateFromDB = event.date;
            // let timeFromML = "09:19:00";
            // console.log(event.start_time.Type)
            const timeFromMLResponse = await predictMLTime(event.start_time);
            const timeFromML = timeFromMLResponse.wake_up_time;
            let dateTimeString = dateFromDB + " " + timeFromML;

            let fullDate = new Date(dateTimeString);
            setDate(fullDate);
            console.log(date);

            const departTimeML = timeFromMLResponse.departure_time;
            let departDateTimeString = dateFromDB + " " + departTimeML;
            let fullDepartDate = new Date(departDateTimeString);

            const durationInMillis =
              fullDepartDate.getTime() - fullDate.getTime();
            const durationInMinutes = Math.floor(
              durationInMillis / (1000 * 60)
            );

            setCalculatedPrepTime(durationInMinutes);

            scheduleNotificationsHandler();
            playAudio();
            // }
          }
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error("AlarmClock - Error fetching schedule:", error);
      }
    };

    

    fetchSchedule();
  }, []);

  // Prepare the audio
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Trigger the audio
  const playAudio = async () => {
    // Get the current time
    const currentTime = new Date();

    // Calculate the delay in milliseconds until the scheduled time
    if (date) {
      const delayInMillis = date.getTime() - currentTime.getTime();

      if (delayInMillis <= 0) {
        console.error("Scheduled time is in the past.");
        // turnOffAlarm();
        return;
      }

      setTimeout(async () => {
        // Load the sound file from the assets directory
        const sound = Asset.fromModule(
          require("../../assets/sounds/Sound2.mp3")
        );

        await sound.downloadAsync(); // Download the file if it hasn't been downloaded yet

        // Get the local URI of the downloaded file (or null if it failed to download)
        const localUri = sound.localUri;

        if (localUri) {
          // Create a new sound object
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: localUri } // Use the local URI of the downloaded file
          );

          // Set the sound and play it
          setSound(newSound);
          setIsPlaying(true);
          await newSound.playAsync();

          // Set a playback status update listener
          newSound.setOnPlaybackStatusUpdate((status) => {
            if ("didJustFinish" in status && status.didJustFinish) {
              setIsPlaying(false);
            }
          });
        } else {
          // Handle the case where localUri is null (e.g., download failed)
          console.error("Failed to download the sound file.");
        }
      }, delayInMillis);
    } else {
      console.error("Play Audio: date is null");
    }

    // const soundObject = new Audio.Sound();
    // try {
    //   await soundObject.loadAsync(require("../../assets/sounds/Sound2.mp3"));
    //   await soundObject.playAsync();
    //   // Your sound is playing

    //   // Set a playback status update listener
    //   soundObject.setOnPlaybackStatusUpdate((status) => {
    //     if (
    //       status.isLoaded &&
    //       status.durationMillis !== undefined &&
    //       status.positionMillis >= status.durationMillis
    //     ) {
    //       // Restart the sound when it finishes playing
    //       soundObject.replayAsync();
    //       // soundObject.playAsync();
    //     }
    //   });
    // } catch (error) {
    //   console.log("Error playing sound:", error);
    // }
  };

  // notification
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    getData();
    notificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  // useEffect(() => {
  //   scheduleNotificationsHandler();
  //   playAudio();
  // }, []);

  useEffect(() => {
    // Ensure date is not null and alarm is not already created
    if (date && notificationId === "none" && !alarmCreated) {
      // Schedule the notification and play the audio
      scheduleNotificationsHandler();
      playAudio();

      // Set alarmCreated to true to prevent re-triggering
      setAlarmCreated(true);
    }
  }, [date, notificationId, alarmCreated]);

  async function scheduleNotificationsHandler() {
    console.log(notificationId);
    // Get the current time
    const currentTime = new Date();

    if (date) {
      // Calculate the delay in milliseconds until the scheduled time
      const delayInMillis = date.getTime() - currentTime.getTime();

      if (notificationId === "none" && delayInMillis > 0) {
        //   var newHour = parseInt(hourr);
        //   if (ampm === "pm") {
        //     newHour = newHour + 12;
        //   }
        const identifier = await Notifications.scheduleNotificationAsync({
          content: {
            title: "TimeSync",
            body: "Alarm! It's time to wake up.",
            data: { url: "/src/AlarmPage" },
            // sound: "alarm-sound.mp4",
          },
          trigger: {
            // hour: newHour,
            // minute: parseInt(minutee),
            // repeats: true,
            date: date,
          },
        });
        console.log("created an alarm");
        // setAmpm("");
        // setHour("");
        // setMinute("");
        console.log(date);
        console.log(identifier);
        setNotificationId(identifier);
        storeData(identifier);

        setAlarmCreated(true);
      }
      // } else {
      //   alert("Turn off alarm before starting a new one");
      //   // setAmpm("");
      //   // setHour("");
      //   // setMinute("");
      //   console.log(notificationId);
      //   console.log("not working");
      // }
    } else {
      console.error("date is null");
    }
  }

  async function turnOffAlarm() {
    console.log(notificationId);
    if (notificationId !== "none") {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      const resetValue = "none";
      await setNotificationId(resetValue);
      storeData(resetValue);
    } else {
      console.log("Alarm already turned off");
      console.log(notificationId);
    }
  }
  async function storeData(id: string) {
    try {
      const savedValues = id;
      const jsonValue = await AsyncStorage.setItem(
        "currentAlarmId",
        JSON.stringify(savedValues)
      );
      return jsonValue;
    } catch (e) {
      alert(e);
    }
  }

  async function getData() {
    try {
      const jasonValue = await AsyncStorage.getItem("currentAlarmId");
      if (jasonValue !== null) {
        const jasonValue2 = JSON.parse(jasonValue);
        setNotificationId(jasonValue2);
      } else {
        console.log("No data found in AsyncStorage");
      }
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        // router.push(url);
        setShowModal(true);
        console.log(url);

        subscription.remove();
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  // AlarmPage Modal
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect to update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle Stop button click
  const handleClickStop = () => {
    // Close the modal
    setShowModal(false);

    turnOffAlarm();

    // Store a flag indicating that the countdown should start in the Home screen
    AsyncStorage.setItem("startCountdown", "true");

    AsyncStorage.setItem("CalculatedPrepTime", calculatedPrepTime.toString());
  };

  // Format the current time
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to false for 24-hour format
  });

  return (
    <View>
      {/* <Pressable onPress={scheduleNotificationsHandler}>
        <Text>Turn on Alarm</Text>
      </Pressable> */}
      {/* <Pressable onPress={turnOffAlarm}>
        <Text>Turn off Alarm</Text>
      </Pressable> */}
      {/* <AlarmPageModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      /> */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        // onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={["rgba(24, 38, 64, 1)", "rgba(38, 61, 102, 1)"]}
            style={styles.background}
          >
            <Text style={styles.textTitle}>Alarm</Text>
            <Text style={styles.timer}>{formattedTime}</Text>
            <Pressable onPress={handleClickStop}>
              <LinearGradient
                colors={["#CF7B04", "#EDA33C"]}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </LinearGradient>
            </Pressable>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  textTitle: {
    color: "#FFFFFF",
    fontFamily: "dm-sans-regular",
    fontSize: 36,
    marginBottom: 30,
  },
  timer: {
    fontSize: 84,
    fontWeight: "bold",
    color: "#FEFEFE",
    marginBottom: 30,
  },
  buttonStyle: {
    width: screenWidth - 160,
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "dm-sans-extrabold",
    color: "#FFFFFF",
    fontSize: 24,
  },
});
