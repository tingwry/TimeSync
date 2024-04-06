import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Button,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import CardSchedule from "@/components/cards/CardSchedule";
import { PortalProvider } from "@gorhom/portal";
// import API_URL from "@env";

interface ScheduleItem {
  event_id: number;
  event_name: string;
  date: string;
  start_time: string;
  end_time: string;
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

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [scheduleNumber, setScheduleNumber] = useState(0);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          `http://172.20.10.12:8000/app/schedule/view/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch schedule");
        }
        const data = await response.json();
        setScheduleNumber(data.length);
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
        <View>
          <Text style={styles.textTop}>Schedules</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>March, 2024</Text>
          <Image
            source={require("@/assets/icons/icon=down.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {schedule.map((item) => (
            <View style={styles.scheduleRow}>
              <View style={styles.circle}>
                <Text style={styles.textCircle}>{item.date.slice(-2)}</Text>
              </View>
              <View style={styles.containerSchedule}>
                <CardSchedule
                  event_name={item.event_name}
                  date={item.date}
                  start_time={item.start_time}
                  end_time={item.end_time}
                />
              </View>
            </View>
          ))}
        </ScrollView>
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
    marginLeft: 32,
    marginRight: 24,
  },
  containerSchedule: {
    marginLeft: 32,
  },
  containerHome: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
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
  textTop: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-extrabold",
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 20,
    paddingBottom: 30,
  },
  circle: {
    backgroundColor: theme.colors.blueSecondary,
    width: 50,
    height: 50,
    borderRadius: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  textCircle: {
    color: theme.colors.textCaption,
    fontFamily: "dm-sans-semibold",
    fontSize: 20,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 200, // Adjust as needed
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
