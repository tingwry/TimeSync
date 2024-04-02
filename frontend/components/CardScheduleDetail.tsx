import { StyleSheet, Text, View, Image } from "react-native";
import { theme } from "@/app/theme";

interface ScheduleDetailProps {
    event_name: string;
    date: string;
    start_time: string;
    end_time: string;
    transportation_mode: string;
    extra_prep_time: Int16Array;
    note: string;
  }

const CardScheduleDetail: React.FC<ScheduleDetailProps> = ({ event_name, date, start_time, end_time, transportation_mode }) => {
    return (
        <View>
            <View style={styles.scheduleTab}>
                <Text style={styles.textCaption}>Alarm for</Text>
                <Text style={styles.textTitle}>Tomorrow</Text>
                <Text style={styles.textTime}>07:00</Text>
            </View>

            <View style={styles.scheduleTab}>
                <Text style={styles.textCaption}>Tomorrow's schedule</Text>
                <Text style={styles.textTitle}>{event_name}</Text>
                <Text style={styles.textCaption}>{start_time} - {end_time}</Text>
                {/* <Text style={styles.textCaption}>Date: {date}</Text> */}
                <Image
                  source={require("@/assets/icons/icon=location.png")}
                  style={{width: 16, height: 16}}
                />
                <Image
                  source={require("@/assets/icons/icon=clock.png")}
                  style={{width: 16, height: 16}}
                />
                <Text style={styles.textCaption}>Transportation Mode: {transportation_mode}</Text>
            </View>

            <View style={styles.scheduleTab}>
                <Text style={styles.textTitle}> View All Schedules</Text>
                <Image
                  source={require("@/assets/icons/right-sign.png")}
                  style={{width: 32, height: 32}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scheduleTab: {
        backgroundColor: theme.colors.blueSecondary,
        borderRadius: 24,
        padding: 10,
        marginTop: 5,
        marginBottom: 25,
        paddingLeft: 25, 
        // justifyContent: "center",
        // alignItems: "center",
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