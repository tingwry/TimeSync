import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { theme } from "@/app/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";

interface ScheduleDetailProps {
  event_name: string;
  date: string;
  start_time: string;
  end_time: string;
}

const CardSchedule: React.FC<ScheduleDetailProps> = ({
  event_name,
  date,
  start_time,
  end_time,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.background}>
        <View>
          <Text style={styles.textCaption}>
            {start_time} - {end_time}
          </Text>
          <Text style={styles.textTitle}>{event_name}</Text>
          <Image
            source={require("@/assets/icons/icon=book.png")}
            style={{ width: 20, height: 20, marginTop: 10, marginBottom: 10 }}
          />
          <Text style={styles.textCaption}>at Location</Text>
        </View>
      </View>
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
    paddingHorizontal: 80, // Add some horizontal padding for spacing
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
});

export default CardSchedule;
