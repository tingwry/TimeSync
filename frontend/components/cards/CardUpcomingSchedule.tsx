import { StyleSheet, Text, View, Image, Pressable, Button, TouchableOpacity } from "react-native";
import { theme } from "@/app/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useRouter } from "expo-router";

interface ScheduleDetailProps {
  event_name: string;
  date: string;
  start_time: string;
  end_time: string;
  transportation_mode: string;
  extra_prep_time: Int16Array;
  note: string;
}

const CardScheduleDetail: React.FC<ScheduleDetailProps> = ({
  event_name,
  date,
  start_time,
  end_time,
  transportation_mode,
}) => {
  const navigation = useNavigation();
  const router = useRouter();

  const handlePress = () => {
    console.warn("View all schedules");
    // navigation.navigate("(viewschedules)");
    router.push("/ViewAllSchedule");
  };
  return (
    <View style={{ paddingHorizontal: 24 }}>
      <View style={styles.alarmContainer}>
        <View style={{ gap: 4 }}>
          <Text style={styles.alarmCaption}>Alarm for</Text>
          <Text style={styles.alarmDate}>Tomorrow</Text>
        </View>

        <View>
          <Text style={styles.textTime}>07:00</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 24,
    padding: 10,
    marginBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row", // This ensures items are placed in a row
    justifyContent: "space-between", // This evenly distributes items along the row
  },
  alarmContainer: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 112,
    alignItems: "center",
  },
  alarmCaption: {
    fontFamily: "dm-sans-regular",
    fontSize: 14,
    color: theme.colors.textCaption,
    textAlign: "left",
  },
  alarmDate: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    color: theme.colors.textPrimary,
    textAlign: "left",
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
  }
});

export default CardScheduleDetail;
