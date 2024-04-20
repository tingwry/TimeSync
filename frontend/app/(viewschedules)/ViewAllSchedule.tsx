import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../theme";
import { useFonts } from "expo-font";
import CardSchedule from "@/components/cards/CardSchedule";
import { PortalProvider } from "@gorhom/portal";
import { router, useNavigation } from "expo-router";
import { useAuth } from "../context/authContext";
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

  const navigation = useNavigation();
  const auth = useAuth();
  const access = auth.authData?.access;

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [scheduleNumber, setScheduleNumber] = useState(0);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const baseUrl = process.env.BASE_URL;
        const response = await fetch(`${baseUrl}/schedule/view/`, {
        // const response = await fetch("http://127.0.0.1:8000/app/schedule/recent/", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access
          },
        });
        
        const data = await response.json();
        if (response.ok) {
          setScheduleNumber(data.length);
          setSchedule(data);
        } else {
          console.error(data);
        }
        
      } catch (error) {
        console.error("View all schedule - Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("@/assets/icons/chevron-left.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.textButton}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Schedules</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.monthContainer}>
          <Text style={styles.textMonth}>March 2024</Text>
          <Image
            source={require("@/assets/icons/chevron-down.png")}
            style={{ width: 24, height: 24 }}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {schedule.map((item) => (
            <View style={styles.scheduleContainer}>
              <View style={styles.dateContainer}>
                <Text style={styles.textDay}>WED</Text>
                <View style={styles.circle}>
                  <Text style={styles.textCircle}>{item.date.slice(-2)}</Text>
                </View>
              </View>

              <View style={styles.detailContainer}>
                <View style={styles.detailView}>
                  <Text style={styles.textTime}>
                    {item.start_time} - {item.end_time}
                  </Text>
                  <Text style={styles.textTitle}>{item.event_name}</Text>
                  <Text style={styles.textLocation}>at School</Text>
                </View>

                <View style={styles.label}>
                  <Image
                    source={require("@/assets/icons/school.png")}
                    style={{ width: 24, height: 24 }}
                  />
                </View>

                {/* <CardSchedule
                  event_name={item.event_name}
                  date={item.date}
                  start_time={item.start_time}
                  end_time={item.end_time}
                /> */}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

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
    marginBottom: 16,
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
  textMonth: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-medium",
    fontSize: 20,
  },
  circle: {
    backgroundColor: theme.colors.blueSecondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textCircle: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-regular",
    fontSize: 16,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    height: "100%"
  },
  monthContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  scheduleContainer: {
    flexDirection: "row",
    gap: 32,
    alignItems: "center",
    marginBottom: 24,
    // justifyContent: "space-between"
  },
  dateContainer: {
    flexDirection: "column",
    gap: 6,
    justifyContent: "center",
  },
  textDay: {
    fontFamily: "dm-sans-medium",
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  detailContainer: {
    height: 96,
    width: screenWidth - 128,
    // marginRight: 24,
    flexDirection: "row",
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTime: {
    color: theme.colors.textCaption,
    fontFamily: "dm-sans-regular",
    fontSize: 14,
    marginBottom: 4,
  },
  textTitle: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 18,
    marginBottom: 4,
  },
  textLocation: {
    color: theme.colors.textCaption,
    fontFamily: "dm-sans-regular",
    fontSize: 14,
  },
  detailView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    width: 36,
    height: 36,
    backgroundColor: theme.colors.textPlaceholder,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
