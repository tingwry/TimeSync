import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { theme } from "@/app/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";

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

  const handlePress = () => {
    console.warn("View all schedules");
    navigation.navigate("(viewschedules)");
  };
  return (
    <View>
      <View style={styles.background}>
        <View>
          <Text style={styles.textCaption}>Alarm for</Text>
          <Text style={styles.textTitle}>Tomorrow</Text>
        </View>

        <View>
          <Text style={styles.textTime}>07:00</Text>
        </View>
      </View>

      <View style={styles.background}>
        <View>
          <Text style={styles.textCaption}>Tomorrow's schedule</Text>
          <Text style={styles.textTitle}>{event_name}</Text>
          <Text style={styles.textCaption}>
            {start_time} - {end_time}
          </Text>
          <View>
            <Image
              source={require("@/assets/icons/location.png")}
              style={{ width: 20, height: 20, marginTop: 10, marginBottom: 10 }}
            />
          </View>
          <Image
            source={require("@/assets/icons/icon=clock.png")}
            style={{ width: 20, height: 20, marginBottom: 10, marginTop: 10 }}
          />
        </View>
      </View>

      <Pressable onPress={handlePress}>
        <View style={styles.background}>
          <View>
            <Text style={styles.textTitle}> View All Schedules</Text>
          </View>
          <View>
            <Image
              source={require("@/assets/icons/right-sign.png")}
              style={{ width: 32, height: 32 }}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 24,
    padding: 10,
    marginTop: 5,
    marginBottom: 25,
    paddingLeft: 25,
    flexDirection: "row", // This ensures items are placed in a row
    justifyContent: "space-between", // This evenly distributes items along the row
    paddingHorizontal: 15, // Add some horizontal padding for spacing
  },
  textCaption: {
    fontFamily: "dm-sans-regular",
    fontSize: 12,
    color: theme.colors.textCaption,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 10,
  },
  textTitle: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    color: theme.colors.textPrimary,
    textAlign: "left",
  },
  textTime: {
    fontFamily: "dm-sans-bold",
    fontSize: 48,
    color: theme.colors.textPrimary,
    textAlign: "right",
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.textPlaceholder,
    borderRadius: 20,
    marginTop: 18,
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardScheduleDetail;
