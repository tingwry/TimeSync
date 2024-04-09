import { theme } from "@/app/theme";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRouter } from "expo-router";
// import CountDownTimer from "./CountDownTimer";

interface CountdownTimerProps {
  time: number | null;
  exceed: boolean;
  // event_name: string;
  // date: string;
  // start_time: string;
  // end_time: string;
  // transportation_mode: string;
  // extra_prep_time: Int16Array;
  // note: string;
}

const CardCountDownTimer: React.FC<CountdownTimerProps> = ({
  time,
  exceed,
  // event_name,
  // date,
  // start_time,
  // end_time,
  // transportation_mode,
}) => {
  // const CardCountDownTimer = () => {

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const navigation = useNavigation();
  const router = useRouter();

  const handlePress = () => {
    console.warn("View all schedules");
    // navigation.navigate("(viewschedules)");
    router.push("/ViewAllSchedule");
  };

  return (
    <View>
      <View>
        {time !== null ? (
          <View>
            {exceed ? (
              <View style={styles.addScheduleTab}>
                <Text style={styles.textCaption}>Departure time started</Text>
                <Text style={styles.textTitleYellow}>{formatTime(time)}</Text>
              </View>
            ) : (
              <View style={styles.addScheduleTab}>
                <Text style={styles.textCaption}>Departure time begins in</Text>
                <Text style={styles.textTitle}>{formatTime(time)}</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.addScheduleTab}>
            <Text style={styles.textCaptionStop}>
              You have started your journey. Have a good day!
            </Text>
          </View>
        )}
      </View>
      {/* <View style={styles.detailsContainer}>
        <View style={styles.detailItems}>
          <Text style={styles.detailsCaption}>Tomorrow's schedule</Text>
          <View style={{ flexDirection: "column", gap: 0 }}>
            <Text style={styles.detailName}>{event_name}</Text>
            <Text style={styles.detailsCaption}>
              {start_time} - {end_time}
            </Text>
          </View>

          <View style={styles.detailsLocation}>
            <Image
              source={require("@/assets/icons/location.png")}
              style={{ width: 16, height: 16 }}
            />
            <Text style={styles.textLocation}>School</Text>
          </View>
          <View>
            <View style={styles.detailsDepart}>
              <Image
                source={require("@/assets/icons/clock.png")}
                style={{ width: 16, height: 16 }}
              />
              <Text style={styles.textLocation}>Depart by</Text>
            </View>

            <Text style={styles.textDepart}>08:00</Text>
          </View>
        </View>
        <View
          style={{
            width: "45%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: 4,
          }}
        />
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}> View All Schedules</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  addScheduleTab: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 24,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    height: 112,
    marginHorizontal: 24,
    marginBottom: 24
  },
  textCaption: {
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    color: theme.colors.textPrimary,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginLeft: 20,
  },
  textTitle: {
    fontFamily: "dm-sans-bold",
    fontSize: 48,
    color: theme.colors.textPrimary,

    flex: 1,
    minWidth: "45%",
    maxWidth: "50%",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    position: "absolute",
    marginRight: 20,
  },
  textTitleYellow: {
    fontFamily: "dm-sans-bold",
    fontSize: 48,
    color: theme.colors.yellow,

    flex: 1,
    minWidth: "45%",
    maxWidth: "50%",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    position: "absolute",
    marginRight: 20,
  },
  textCaptionStop: {
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    color: theme.colors.textPrimary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  detailsContainer: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 184,
    alignItems: "center",
    marginHorizontal: 24,
  },
  detailItems: {
    flexDirection: "column",
    gap: 16,
    width: "50%",
  },
  detailName: {
    fontFamily: "dm-sans-semibold",
    fontSize: 20,
    color: theme.colors.textPrimary,
  },
  detailsCaption: {
    fontFamily: "dm-sans-regular",
    fontSize: 14,
    color: theme.colors.textCaption,
  },
  detailsLocation: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  detailsDepart: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  textLocation: {
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  textDepart: {
    fontFamily: "dm-sans-semibold",
    fontSize: 18,
    color: theme.colors.textPrimary,
    marginLeft: 24,
  },
  button: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 56,
    paddingHorizontal: 20,
    marginHorizontal: 24,
  },
  buttonText: {
    fontFamily: "dm-sans-semibold",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  textTime: {
    fontFamily: "dm-sans-bold",
    fontSize: 48,
    color: theme.colors.textPrimary,
    textAlign: "right",
  },
});

export default CardCountDownTimer;
