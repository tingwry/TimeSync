import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [hourr, setHour] = useState("");
  const [minutee, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");
  const [notificationId, setNotificationId] = useState("none");

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

  let date = new Date();
  date.setSeconds(date.getSeconds() + 5);

  async function scheduleNotificationsHandler() {
    console.log(notificationId);
    if (notificationId === "none") {
      var newHour = parseInt(hourr);
      if (ampm === "pm") {
        newHour = newHour + 12;
      }
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "TimeSync",
          body: "Alarm! It's time to wake up.",
          data: { data: "Your morning alarm data" },
          sound: "alarm-sound.mp4",
        },
        trigger: {
          hour: newHour,
          minute: parseInt(minutee),
          // seconds: 10,
          repeats: true,
        },
      });
      setAmpm("");
      setHour("");
      setMinute("");
      console.log(date);
      console.log(identifier);
      setNotificationId(identifier);
      storeData(identifier);
    } else {
      alert("Turn off alarm before starting a new one");
      setAmpm("");
      setHour("");
      setMinute("");
      console.log(notificationId);
      console.log("not working");
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
      alert("Alarm already turned off");
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

  return (
    <View>
      <Text>Alarm</Text>
      <TextInput
        placeholder="Enter hour"
        value={hourr}
        onChangeText={(text) => setHour(text)}
      />
      <TextInput
        placeholder="Enter minute"
        value={minutee}
        onChangeText={(text) => setMinute(text)}
      />
      <TextInput
        placeholder="Enter am or pm"
        value={ampm}
        onChangeText={(text) => setAmpm(text)}
      />
      <Pressable onPress={scheduleNotificationsHandler}>
        <Text>Turn on Alarm</Text>
      </Pressable>
      <Pressable onPress={turnOffAlarm}>
        <Text>Turn off Alarm</Text>
      </Pressable>
    </View>
  );
}
