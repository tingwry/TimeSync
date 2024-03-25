import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "@/app/theme";

interface ScheduleDetailProps {
    event_name: string;
    date: string;
    start_time: string;
    transportation_mode: string;
  }

const CardScheduleDetail: React.FC<ScheduleDetailProps> = ({ event_name, date, start_time, transportation_mode }) => {
    return (
        <View style={styles.addScheduleTab}>
            <Text style={styles.textCaption}>No Upcoming Schedule</Text>
            <Text style={styles.textTitle}>Add Schedule</Text>

            <View>
                <Text style={styles.textCaption}>Event: {event_name}</Text>
                <Text style={styles.textCaption}>Date: {date}</Text>
                <Text style={styles.textCaption}>Start Time: {start_time}</Text>
                <Text style={styles.textCaption}>Transportation Mode: {transportation_mode}</Text>
            </View>
            {/* <View style={styles.addButton}>
                <Image
                    source={require("@/assets/icons/plus.png")}
                    style={{width: 32, height: 32}}
                />
        </View> */}
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

export default CardScheduleDetail;