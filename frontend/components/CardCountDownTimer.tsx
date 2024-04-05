import { theme } from "@/app/theme";
import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
// import CountDownTimer from "./CountDownTimer";

interface Props {
  time: number | null;
  exceed: boolean;
}

const CardCountDownTimer: React.FC<Props> = ({ time, exceed }) => {
  // const CardCountDownTimer = () => {

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
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
    margin: 24,
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
});

export default CardCountDownTimer;
