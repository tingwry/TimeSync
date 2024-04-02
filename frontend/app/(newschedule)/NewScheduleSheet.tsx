import { View, Text, Image, Pressable, ScrollView, Button } from "react-native";
import React, { useState } from "react";
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
import TimeSheet from "@/components/sheets/TimeSheet";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import TransportationSheet from "@/components/sheets/TransportationSheet";
import PreparationSheet from "@/components/sheets/PreparationSheet";
import AlarmNotiSheet from "@/components/sheets/AlarmNotiSheet";
import axios from "axios";

export default function NewSchedule() {
  const navigation = useNavigation();

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [transportationMode, setTransportationMode] = useState("");
  const [extraPrepTime, setExtraPrepTime] = useState(0);
  const [note, setNote] = useState("");

  const handleClickPress = async () => {
    // console.warn(eventName, note);

    const url = "http://127.0.0.1:8000/app/schedule/create/"
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_name: eventName,
        date: "2022-12-12",
        start_time: "09:00:00",
        end_time: "10:00:00",
        transportation_mode: "walk",
        extra_prep_time: 0,
        note: note,
        user_id: 1,
        sched_start: 2,
        sched_destination: 2,
        wake_up_aids: 1
      })
    });
    let result = await response.json();

    if (result) {
      console.warn("Success");
      // console.log(result);
    }

    // navigation.goBack();
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
                  <CalendarSheet />
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
                  <TimeSheet time={"09:00"} title="Start Time" />
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
                  <TimeSheet time={"10:00"} title="End Time" />
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
                  <TransportationSheet />
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
            <Button 
              title="Add Schedule"
              onPress={handleClickPress}  
              color="white"
            />
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
