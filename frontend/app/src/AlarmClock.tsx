import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  LogBox,
  Button,
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

LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AlarmClock() {
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<any>();
  // const [hourr, setHour] = useState("");
  // const [minutee, setMinute] = useState("");
  // const [ampm, setAmpm] = useState("");
  // const [date, setDate] = useState<Date | null>(null);
  const [notificationId, setNotificationId] = useState("none");
  const [alarmCreated, setAlarmCreated] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Sound | null>(null);

  const auth = useAuth();
  const access = auth.authData?.access;

  const [scheduleIds, setScheduleIds] = useState<number[]>([]);

  // const predictMLTime = async (arriving_time: string) => {
  //   const baseUrl = process.env.BASE_URL;
  //   let response = await fetch(`${baseUrl}/ML/predict/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + access,
  //     },
  //     body: JSON.stringify({
  //       arriving_time: arriving_time,
  //     }),
  //   });
  //   let result = await response.json();

  //   if (response.ok) {
  //     console.log("Predict Success");
  //     return result;
  //   } else {
  //     console.error(result);
  //   }
  // };

  // useEffect(() => {
  //   const fetchSchedule = async () => {
  //     try {
  //       const baseUrl = process.env.BASE_URL;
  //       const response = await fetch(`${baseUrl}/schedule/view/`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + access,
  //         },
  //       });

  //       const data = await response.json();
  //       console.log(scheduleIds)

  //       if (response.ok) {
  //         for (const event of data) {
  //           console.log(event);
  //           if (!scheduleIds.includes(event.event_id)) {
  //             setScheduleIds((prevScheduleIds) => [
  //               ...prevScheduleIds,
  //               event.event_id,
  //             ]);

  //           }

  //             console.log(scheduleIds);
  //             // let date = new Date();
  //             // date.setSeconds(date.getSeconds() + 5);

  //             // let dateFromDB = "2024-04-21";
  //             let dateFromDB = event.date;
  //             // let timeFromML = "09:19:00";
  //             // console.log(event.start_time.Type)
  //             const timeFromMLResponse = await predictMLTime(event.start_time);
  //             const timeFromML = timeFromMLResponse.wake_up_time;
  //             let dateTimeString = dateFromDB + " " + timeFromML;

  //             let fullDate = new Date(dateTimeString);
  //             setDate(fullDate);
  //             console.log(date);

  //             scheduleNotificationsHandler();
  //             playAudio();
  //           // }
  //         }
  //       } else {
  //         console.error(data);
  //       }
  //     } catch (error) {
  //       console.error("AlarmClock - Error fetching schedule:", error);
  //     }
  //   };

  //   fetchSchedule();
  // }, []);

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

  let dateFromDB = "2024-04-21";
  let timeFromML = "13:57:00";
  let dateTimeString = dateFromDB + " " + timeFromML;

  // let fullDate = new Date(dateTimeString);
  // setDate(fullDate);
  let date = new Date(dateTimeString);

  // Trigger the audio
  const playAudio = async () => {
    // Get the current time
    const currentTime = new Date();

    // Calculate the delay in milliseconds until the scheduled time
    if (date) {
      const delayInMillis = date.getTime() - currentTime.getTime();

      if (delayInMillis <= 0) {
        console.error("PlayAudio: Scheduled time is in the past.");
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
          console.error("Play Audio: Failed to download the sound file.");
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

  useEffect(() => {

    scheduleNotificationsHandler();
    playAudio();
  }, []);
  // useEffect(() => {
  //   // Ensure date is not null and alarm is not already created
  //   if (date && notificationId === "none" && !alarmCreated) {
  //     // Schedule the notification and play the audio
  //     scheduleNotificationsHandler();
  //     playAudio();

  //     // Set alarmCreated to true to prevent re-triggering
  //     setAlarmCreated(true);
  //   }
  // }, [date, notificationId, alarmCreated]);

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

        // setDate(null);
      } else {
        alert("Turn off alarm before starting a new one");
        // setAmpm("");
        // setHour("");
        // setMinute("");
        console.log(notificationId);
        console.log("not working");
      }
    } else {
      console.error("date is null");
    }
  }

  // useEffect(() => {
  //   const checkTurnOffAlarm = async () => {
  //     // Check if the flag to turn off the alarm is set
  //     const turnOff = await AsyncStorage.getItem("turnOff");
  //     if (turnOff === "true") {
  //       // Call the function to turn off the alarm
  //       turnOffAlarm();
  //       // Clear the flag from AsyncStorage
  //       await AsyncStorage.removeItem("turnOff");
  //     }
  //   };

  //   // Call the function to check if alarm should be turned off
  //   checkTurnOffAlarm();
  // }, []);

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
        console.log("getData: No data found in AsyncStorage");
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
        router.push(url);
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

  return (
    <View>
      {/* <Pressable onPress={turnOffAlarm}>
        <Text>Turn off Alarm</Text>
      </Pressable> */}
    </View>
  );
}
