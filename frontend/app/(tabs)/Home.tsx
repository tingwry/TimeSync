import { View, Text, StyleSheet, Image, StatusBar, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import CardNoSchedule from "@/components/cards/CardNoSchedule";
import CardUpcomingSchedule from "@/components/cards/CardUpcomingSchedule";
import CardCountDownTimer from "@/components/cards/CardCountDownTimer";
import PopUpCountdownTimer from "../src/PopUpCountDownTimer";
import AlarmClock from "../src/AlarmClock";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/authContext";
import { useIsFocused } from "@react-navigation/native";

interface ScheduleItem {
  event_id: number;
  event_name: string;
  date: string;
  start_time: string;
  end_time: string;
  transportation_mode: string;
  extra_prep_time: Int16Array;
  note: string;
}

export default function Home() {
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
    "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
    "dm-sans-regular": require("@/assets/fonts/DMSans-Regular.ttf"),
    "dm-sans-bold": require("@/assets/fonts/DMSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const isFocused = useIsFocused();

  const auth = useAuth();
  const access = auth.authData?.access;
  const user = auth.authData?.username;

  const [schedule, setSchedule] = useState<ScheduleItem | null>(null);
  const [scheduleNumber, setScheduleNumber] = useState(0);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const fetchSchedule = async () => {
    try {
      const baseUrl = process.env.BASE_URL;
      const response = await fetch(`${baseUrl}/schedule/recent/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('schedule data');
        console.log(data);
        setLocation(data.sched_destination)
        // console.log("sched location", location)
        setScheduleNumber(data.length);
        setSchedule(data);
      } else {
        console.error(data);
        // throw new Error("Failed to fetch schedule");
      }
    } catch (error) {
      console.error("Home - Error fetching schedule:", error);
    }
  };

  const fetchLocation = async () => {
    try {
      const baseUrl = process.env.BASE_URL;
      const response = await fetch(`${baseUrl}/location/viewsinglee/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access,
          'Location-ID': location
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('location data');
        console.log(data);
        setLat(data.latitude);
        setLong(data.longitude);
        console.log("lat, long", lat, long);

      } else {
        console.error(data);

      }
    } catch (error) {
      console.error("Home - Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Perform actions you want when the screen is focused.
      // This could be fetching data, re-rendering components, or any other refresh logic.
      fetchSchedule();
    }
  }, [isFocused]);

  const [startCountdown, setStartCountdown] = useState(false);

  // useEffect(() => {
  //   // Check if the flag or state indicating to start the countdown is set
  //   AsyncStorage.getItem("startCountdown").then((value) => {
  //     // if (value) {
  //     if (value === "true") {
  //       setStartCountdown(true);
  //       // Clear the flag or state after reading it
  //       AsyncStorage.removeItem("startCountdown");
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      AsyncStorage.getItem("startCountdown").then((value) => {
        if (value === "true") {
          setStartCountdown(true);
          // Clear the flag or state after reading it
          AsyncStorage.removeItem("startCountdown");
        }
      });
    }, 1000); // Run every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (location) {
      fetchLocation();
      // fetchSchedule();
    }
  }, [location]);


  // useEffect(() => {
  //   // Check if location is available
  //   if (location) {
  //     const fetchSchedule = async () => {
  //       try {
  //         const response2 = await fetch(
  //           `http://127.0.0.1:8000/app/location/view/${location}/`
  //         );
  //         if (!response2.ok) {
  //           throw new Error("Failed to fetch location");
  //         }
  //         const data2 = await response2.json();
  //         // console.log(data2);
  //         setLat(data2.latitude);
  //         setLong(data2.longitude);
  //         console.log("lat, long", lat, long);
  //       } catch (error) {
  //         console.error("Error fetching schedule:", error);
  //       }
  //     };

  //     fetchSchedule();
  //   }
  // }, [location]); // Add location as a dependency

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerHome}>
        <Text style={styles.textTitle}>Hello, {user}</Text>
        {/* <Button title="fetch schedule" onPress={() => fetchSchedule} />
        <Button title="fetch location" onPress={() => fetchLocation} /> */}
        <Text style={styles.textCaption}>Let's see what is up next!</Text>
        <Text style={styles.textHeader}>Upcoming Schedule</Text>
      </View>

      <View>
        <AlarmClock />
        {startCountdown ? <PopUpCountdownTimer /> : null}
      </View>

      <View>
        {scheduleNumber === 0 ? (
          <CardNoSchedule />
        ) : (
          <View>
            {schedule && (
              <CardUpcomingSchedule
                event_name={schedule.event_name}
                date={schedule.date}
                start_time={schedule.start_time}
                end_time={schedule.end_time}
                transportation_mode={schedule.transportation_mode}
                extra_prep_time={schedule.extra_prep_time}
                note={schedule.note}
                latitude={lat}
                longitude={long}
              />
            )}

          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.bluePrimary,
    color: theme.colors.textPrimary,
  },
  container: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 50,
  },
  containerHome: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 100,
  },
  textTitle: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-extrabold",
    fontSize: 36,
    paddingLeft: 8,
  },
  textCaption: {
    color: theme.colors.textCaption,
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    paddingLeft: 8,
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 24,
    marginTop: 48,
  },
});
