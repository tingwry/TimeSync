import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { styles } from "./SheetStyles";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { TimerPicker, TimerPickerRef } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/app/theme";
import React from "react";

export default function StartTimeSheet(this: any) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let currentHour = parseInt(formattedTime.substring(0, 2)) + 1;
  let initialHours = (currentDate.getHours() + 1).toString();
  const initialMinutes = "00";

  if (currentHour === 24) {
    initialHours = "00";
  } else if (currentHour < 10) {
    initialHours = currentHour.toString();
  }

  const initialTime = `${initialHours.padStart(2, "0")}:${initialMinutes}`;

  const timerPickerRef = useRef<TimerPickerRef>(null);
  const [selectedHours, setSelectedHours] = useState(initialHours);
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);

  return (
    <GestureHandlerRootView style={styles.sheetStyle}>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.pressableMenu}
      >
        <Text style={[styles.textDisplay, { fontSize: 24 }]}>
          {initialTime}
        </Text>
      </TouchableOpacity>

      <Portal>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.modalBackgroundStyle}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <View style={styles.handleModalIndicatorStyle} />
            <TouchableOpacity
              style={[styles.modalCloseButton, { marginRight: 16 }]}
              onPress={handleCloseModalPress}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} // Adjust hitSlop as needed
            >
              <Image
                source={require("@/assets/icons/close.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <View style={styles.modalSheetView}>
              <View style={styles.sheetItem}>
                <Image
                  source={require("@/assets/icons/clock.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Start Time</Text>
              </View>
              <View style={timeStyle.timePicker}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 32,
                    marginBottom: 24,
                  }}
                >
                  <TimerPicker
                    padWithNItems={2}
                    hourLabel=":"
                    minuteLabel=""
                    hideSeconds={true}
                    LinearGradient={LinearGradient}
                    initialHours={parseInt(initialHours)}
                    styles={{
                      backgroundColor: theme.colors.modalBackground,
                      pickerItem: {
                        fontSize: 40,
                        color: theme.colors.textPrimary,
                        fontFamily: "dm-sans-medium",
                      },
                      pickerLabel: {
                        fontSize: 40,
                        marginTop: 0,
                        color: theme.colors.textPrimary,
                        fontFamily: "dm-sans-medium",
                      },
                      pickerContainer: {
                        marginRight: 0,
                      },
                      pickerItemContainer: {
                        marginHorizontal: -16,
                      },
                      pickerLabelContainer: {
                        right: -20,
                        top: 0,
                        bottom: 6,
                        width: 40,
                        alignItems: "center",
                      },
                    }}
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <ButtonPrimary
                  text="Select Time"
                  press={() => {
                    handleCloseModalPress();
                    setSelectedHours()
                  }}
                />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </Portal>
    </GestureHandlerRootView>
  );
}

const TimePickerView = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32,
        marginBottom: 24,
      }}
    >
      <TimerPicker
        padWithNItems={2}
        hourLabel=":"
        minuteLabel=""
        hideSeconds={true}
        LinearGradient={LinearGradient}
        initialHours={9}
        styles={{
          backgroundColor: theme.colors.modalBackground,
          pickerItem: {
            fontSize: 40,
            color: theme.colors.textPrimary,
            fontFamily: "dm-sans-medium",
          },
          pickerLabel: {
            fontSize: 40,
            marginTop: 0,
            color: theme.colors.textPrimary,
            fontFamily: "dm-sans-medium",
          },
          pickerContainer: {
            marginRight: 0,
          },
          pickerItemContainer: {
            marginHorizontal: -16,
          },
          pickerLabelContainer: {
            right: -20,
            top: 0,
            bottom: 6,
            width: 40,
            alignItems: "center",
          },
        }}
      />
    </View>
  );
};

const timeStyle = StyleSheet.create({
  timePicker: {
    marginTop: 16,
    alignItems: "center",
  },
});
