import { View, Text, Image, Pressable, ScrollView, Button } from "react-native";
import React, { useCallback, useState } from "react";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { theme } from "../theme";
import { styles } from "@/components/sheets/SheetStyles";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import { PortalProvider } from "@gorhom/portal";
import CalendarSheet from "@/components/sheets/CalendarSheet";
import LocationSheet from "@/components/sheets/LocationSheet";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import TransportationSheet from "@/components/sheets/TransportationSheet";
import PreparationSheet from "@/components/sheets/PreparationSheet";
import AlarmNotiSheet from "@/components/sheets/AlarmNotiSheet";
import StartTimeSheet from "@/components/sheets/StartTimeSheet";
import EndTimeSheet from "@/components/sheets/EndTimeSheet";
import { useAuth } from "../context/authContext";
// import { API_URL } from "@env";

export default function NewSchedule() {
  const navigation = useNavigation();
  const auth = useAuth();
  const access = auth.authData?.access;

  const currentDate = new Date();
  const defaultDate = currentDate.toISOString().split("T")[0];

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [transportationMode, setTransportationMode] = useState("car");
  const [extraPrepTime, setExtraPrepTime] = useState(0);
  const [note, setNote] = useState("");

  const handleClickPress = async () => {
    // console.log(startTime)
    // console.log(endTime)
    const req = {
      event_name: eventName,
      date: date,
      start_time: "05:21",
      end_time: "15:21",
      transportation_mode: transportationMode,
      extra_prep_time: 0,
      note: note,
      uid: 2,
      sched_start: 1,
      sched_destination: 1,
      wake_up_aids: 1,
    }
    
    // const url = `http://127.0.0.1:8000/app/schedule/create/`;
    

    let response = await fetch(`${process.env.BASE_URL}/schedule/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + access
      },
      body: JSON.stringify({
        event_name: eventName,
        date: date,
        start_time: "05:21",
        end_time: "15:21",
        transportation_mode: transportationMode,
        extra_prep_time: 0,
        note: note,
        uid: 2,
        sched_start: 1,
        sched_destination: 1,
        wake_up_aids: 1,
      }),
    });
    console.log(req)
    let result = await response.json();
    console.log("res")
    console.log(result);

    if (response.ok) {
      console.log("Success");
      console.log(result);
      navigation.goBack();
    } else {
      console.log("Failed");
      console.log(result);
    }
    
  };

  return (
    <GestureHandlerRootView style={styles.backdrop}>
      <PortalProvider>
        <BottomSheetModalProvider>
          <View style={styles.bottomSheet}>
            <View style={styles.header}>
              <View style={styles.handleIndicatorStyle} />
              <CloseButton />
            </View>

            <ScrollView style={styles.scrollViewContent}>
              <View style={styles.sheetView}>
                <Text style={[styles.textHeader, { paddingTop: 8 }]}>
                  Event's Name
                </Text>
                <TextInput
                  style={styles.eventNameInput}
                  placeholder="Title"
                  placeholderTextColor={theme.colors.textPlaceholder}
                  keyboardType="default"
                  value={eventName}
                  onChangeText={setEventName}
                />
                <View style={styles.sheetItem}>
                  <Image
                    source={require("@/assets/icons/calendar.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.textHeader}>Date</Text>
                </View>
                <ScrollView>
                  <CalendarSheet onDaySelect={setDate} />
                </ScrollView>
                <View style={styles.sheetItem}>
                  <Image
                    source={require("@/assets/icons/clock.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 72,
                    }}
                  >
                    <Text style={styles.textHeader}>Start Time</Text>
                    <Text style={styles.textHeader}>End Time</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: -24,
                    alignItems: "center",
                  }}
                >
                  {/* <TimeSheet title="Start Time" onTimeSelect={setStartTime}/>
                   */}
                  <StartTimeSheet />
                  <Text
                    style={[
                      styles.textDisplay,
                      {
                        fontSize: 16,
                        position: "absolute",
                        bottom: 8,
                        marginLeft: 138,
                      },
                    ]}
                  >
                    to
                  </Text>
                  <EndTimeSheet />
                </View>
                <View style={styles.divLine} />
                <View style={styles.sheetItem}>
                  <Image
                    source={require("@/assets/icons/location.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.textHeader}>Location</Text>
                </View>
                <ScrollView>
                  <LocationSheet />
                </ScrollView>
                <View style={styles.sheetItem}>
                  <Image
                    source={require("@/assets/icons/car.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.textHeader}>Transportation Mode</Text>
                </View>
                <ScrollView>
                  <TransportationSheet
                    onTransportationModeSelect={(mode: string) => {
                      setTransportationMode(mode);
                    }}
                  />
                </ScrollView>
                <View style={styles.sheetItem}>
                  <Image
                    source={require("@/assets/icons/option.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.textHeader}>Options</Text>
                </View>
                <ScrollView>
                  <PreparationSheet />
                  <AlarmNotiSheet />
                </ScrollView>
                <View style={styles.divLine} />
                <View style={styles.sheetItem}>
                  <Image
                    source={require("@/assets/icons/note.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.textHeader}>Note</Text>
                </View>
                <TextInput
                  style={styles.noteInput}
                  placeholder="Description"
                  placeholderTextColor={theme.colors.textPlaceholder}
                  keyboardType="default"
                  value={note}
                  onChangeText={setNote}
                />
              </View>
            </ScrollView>
          </View>
          <View style={styles.footer}>
            {/* <Button 
              title="Add Schedule"
              onPress={handleClickPress}  
              color="white"
            /> */}
            <ButtonPrimary text="Add Schedule" press={handleClickPress} />
            {/* <ButtonPrimary text="Add Schedule" onPress={handleClickPress}/> */}
            <Pressable>
              <Text style={styles.cancelButton}>Cancel</Text>
            </Pressable>
          </View>
        </BottomSheetModalProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

const CloseButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{ position: "absolute", right: 16, marginTop: 4 }}
    >
      <View style={styles.closeButton}>
        <Image
          source={require("@/assets/icons/close.png")}
          style={{ width: 20, height: 20 }}
        />
      </View>
    </Pressable>
  );
};
