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
  //   const responseListener = useRef();
  // const [hourr, setHour] = useState("");
  // const [minutee, setMinute] = useState("");
  // const [ampm, setAmpm] = useState("");
  const [notificationId, setNotificationId] = useState("none");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Sound | null>(null);

  // let date = new Date();
  // date.setSeconds(date.getSeconds() + 5);

  let dateFromDB = "2024-04-21";
  // let date = new Date(dateFromDB);

  let timeFromML = "09:19:00";
  let dateTimeString = dateFromDB + " " + timeFromML;
  let date = new Date(dateTimeString);

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
    const delayInMillis = date.getTime() - currentTime.getTime();

    if (delayInMillis <= 0) {
      console.error("Scheduled time is in the past.");
      // turnOffAlarm();
      return;
    }

    setTimeout(async () => {
      // Load the sound file from the assets directory
      const sound = Asset.fromModule(require("../../assets/sounds/Sound2.mp3"));

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

  async function scheduleNotificationsHandler() {
    console.log(notificationId);
    // Get the current time
    const currentTime = new Date();

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
      // setAmpm("");
      // setHour("");
      // setMinute("");
      console.log(date);
      console.log(identifier);
      setNotificationId(identifier);
      storeData(identifier);
    }
    // } else {
    //   alert("Turn off alarm before starting a new one");
    //   // setAmpm("");
    //   // setHour("");
    //   // setMinute("");
    //   console.log(notificationId);
    //   console.log("not working");
    // }
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

  return <View>{/* <Text>Alarm</Text> */}</View>;
}
