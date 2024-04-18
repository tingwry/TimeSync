import { View, Text, StyleSheet, Image, StatusBar, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import CardNoSchedule from "@/components/cards/CardNoSchedule";
import CardUpcomingSchedule from "@/components/cards/CardUpcomingSchedule";
import CardCountDownTimer from "@/components/cards/CardCountDownTimer";
import { useAuth } from "../context/authContext";

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

  const auth = useAuth();
  const access = auth.authData?.access;
  const user = auth.authData?.username;

  const [schedule, setSchedule] = useState<ScheduleItem | null>(null);
  const [scheduleNumber, setScheduleNumber] = useState(0);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/schedule/recent/`, {
        // const response = await fetch("http://127.0.0.1:8000/app/schedule/recent/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + access
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch schedule");
        }

        const data = await response.json();
        setLocation(data.sched_destination)
        // console.log("sched location", location)
        setScheduleNumber(data.length);
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  useEffect(() => {
    // Check if location is available
    if (location) {
      const fetchSchedule = async () => {
        try {
          const response2 = await fetch(
            `http://127.0.0.1:8000/app/location/view/${location}/`
          );
          if (!response2.ok) {
            throw new Error("Failed to fetch location");
          }
          const data2 = await response2.json();
          // console.log(data2);
          setLat(data2.latitude);
          setLong(data2.longitude);
          console.log("lat, long", lat, long);
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      };
  
      fetchSchedule();
    }
  }, [location]); // Add location as a dependency

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerHome}>
        <Text style={styles.textTitle}>Hello, {user}</Text>
        <Text style={styles.textCaption}>Let's see what is up next!</Text>
        <Text style={styles.textHeader}>Upcoming Schedule</Text>
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
            {/* {schedule.map((scheduleItem) => (
                <CardUpcomingSchedule
                  key={scheduleItem.event_id}
                  event_name={scheduleItem.event_name}
                  date={scheduleItem.date}
                  start_time={scheduleItem.start_time}
                  end_time={scheduleItem.end_time}
                  transportation_mode={scheduleItem.transportation_mode}
                  extra_prep_time={scheduleItem.extra_prep_time}
                  note={scheduleItem.note}
                />
              ))} */}
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
