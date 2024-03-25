import { theme } from "@/app/theme";
import { StyleSheet, Text, View, Image } from "react-native";

export default function CardNewSchedule() {  return (
    <View style={styles.addScheduleTab}>
      <Text style={styles.textCaption}>No Upcoming Schedule</Text>
      <Text style={styles.textTitle}>Add Schedule</Text>

      <View style={styles.addButton}>
        <Image
          source={require("@/assets/icons/plus.png")}
          style={{width: 32, height: 32}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addScheduleTab: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textCaption: {
    fontFamily: "dm-sans-regular",
    fontSize: 12,
    color: theme.colors.textPrimary,
    marginTop: 24,
    marginBottom: 18,
  },
  textTitle: {
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    color: theme.colors.textPrimary,
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
