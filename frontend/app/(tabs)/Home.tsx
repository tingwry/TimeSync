import { View, Text, StyleSheet, Image, StatusBar, Button } from "react-native";
import React, {useState, useEffect} from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import CardNewSchedule from "@/components/CardNewSchedule";
import CardScheduleDetail from "@/components/CardScheduleDetail";
import { PortalProvider } from "@gorhom/portal";

interface ScheduleItem {
  event_id: number;
  event_name: string;
  date: string;
  start_time: string;
  end_time: string;
  transportation_mode: string;
  extra_prep_time: Int16Array;
  note: string;
  // Add other properties as needed
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

  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [scheduleNumber, setScheduleNumber] = useState(0)

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/app/schedule/view/");
        const data = await response.json();
        setScheduleNumber(data.length)
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.containerHome}>
        <Text style={styles.textTitle}>Hello, User</Text>
        <Text style={styles.textCaption}>Let's see what is up next!</Text>
      </View>
     
      <View>
        { scheduleNumber === 0 ? (
          <CardNewSchedule />
        ) : (
          <View style={styles.container}>
            <Text style={styles.textHeader}>Upcoming Schedule</Text>
              {schedule.map((scheduleItem) => (
                <CardScheduleDetail
                  key={scheduleItem.event_id}
                  event_name={scheduleItem.event_name}
                  date={scheduleItem.date}
                  start_time={scheduleItem.start_time}
                  end_time={scheduleItem.end_time}
                  transportation_mode={scheduleItem.transportation_mode}
                  extra_prep_time={scheduleItem.extra_prep_time}
                  note={scheduleItem.note}
                />
              ))}
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
  },
});
