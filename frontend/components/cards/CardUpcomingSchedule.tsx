import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import { theme } from "@/app/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker, Callout } from "react-native-maps";

interface ScheduleDetailProps {
  event_name: string;
  date: string;
  start_time: string;
  end_time: string;
  transportation_mode: string;
  extra_prep_time: Int16Array;
  note: string;
  latitude: number;
  longitude: number;
  loc_name: string;
  wakeup_time: string;
  departure_time: string;
}

const CardScheduleDetail: React.FC<ScheduleDetailProps> = ({
  event_name,
  date,
  start_time,
  end_time,
  transportation_mode,
  latitude,
  longitude,
  loc_name,
  wakeup_time,
  departure_time,
}) => {
  const navigation = useNavigation();
  const router = useRouter();

  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  useEffect(() => {
    if (latitude && longitude) {
      setLat(Number(latitude));
      setLong(Number(longitude));
    }
  }, [latitude, longitude]);

  // console.log(lat, long)

  const handlePress = () => {
    router.push("/ViewAllSchedule");
  };

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <View style={styles.alarmContainer}>
        <View style={{ gap: 4 }}>
          <Text style={styles.alarmCaption}>Alarm for</Text>
          <Text style={styles.alarmDate}>Next Schedule</Text>
        </View>

        <View>
          <Text style={styles.textTime}>{wakeup_time}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItems}>
          <Text style={styles.detailsCaption}>{date}'s schedule</Text>
          <View style={{ flexDirection: "column", gap: 0 }}>
            <Text style={styles.detailName}>{event_name}</Text>
            {/* <Text style={styles.detailsCaption}> */}
            {end_time != null ? (
              <Text style={styles.detailsCaption}>
                {start_time.substring(0, 5)} - {end_time.substring(0, 5)}
              </Text>
            ) : (
              <Text style={styles.detailsCaption}>{start_time}</Text>
            )}
            {/* </Text> */}
          </View>

          <View style={styles.detailsLocation}>
            <Image
              source={require("@/assets/icons/location.png")}
              style={{ width: 16, height: 16 }}
            />
            <Text style={styles.textLocation}>{loc_name}</Text>
          </View>
          <View>
            <View style={styles.detailsDepart}>
              <Image
                source={require("@/assets/icons/clock.png")}
                style={{ width: 16, height: 16 }}
              />
              <Text style={styles.textLocation}>Depart by</Text>
            </View>

            <Text style={styles.textDepart}>{departure_time}</Text>
          </View>
        </View>
        {/* <MapView
          // provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: lat,
            longitude: long,
            // latitude: 13.736834400006273,
            // longitude: 100.53314465311604,
            latitudeDelta: 0.000000922,
            longitudeDelta: 0.0000000421,
          }}
          style={{
            width: "45%",
            height: "100%",
            // backgroundColor: "white",
            borderRadius: 4,
          }}
        >
          <Marker
            coordinate={{ latitude: lat, longitude: long }}
            image={require("@/assets/icons/map-marker.png")}
          />
        </MapView> */}
        <View
          style={{
            width: "45%",
            height: 160,
            // backgroundColor: "white",
            borderRadius: 8,
          }}
        >
          <Image
            source={require("@/assets/images/map-mini.png")}
            style={{ height: 172, width: 150, borderRadius: 8, marginTop: -4 }}
          ></Image>
        </View>
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
    // marginBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row", // This ensures items are placed in a row
    justifyContent: "space-between", // This evenly distributes items along the row
  },
  alarmContainer: {
    backgroundColor: theme.colors.blueSecondary,
    borderRadius: 20,
    marginBottom: 16,
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
    marginBottom: 16,
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
  },
});

export default CardScheduleDetail;
