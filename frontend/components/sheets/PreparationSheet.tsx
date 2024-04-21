import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { styles } from "./SheetStyles";
import React from "react";
import { theme } from "@/app/theme";
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function PreparationSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["33%", "61%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleExpandModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand();
  }, []);

  const handleCollapseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.collapse();
  }, []);

  const [isMorningTimeEnabled, setIsMorningTimeEnabled] = useState(true);
  const toggleMorningTimeSwitch = () =>
    setIsMorningTimeEnabled((previousState) => !previousState);

  const [isExtraTimeEnabled, setIsExtraTimeEnabled] = useState(false);
  const toggleExtraTimeSwitch = () => {
    setIsExtraTimeEnabled((previousState) => !previousState);
  };

  if (isExtraTimeEnabled === true) {
    handleExpandModalPress();
  } else if (isExtraTimeEnabled === false) {
    handleCollapseModalPress();
  }

  const [selectedMinutes, setSelectedMinutes] = useState("30");

  return (
    <GestureHandlerRootView style={styles.sheetStyle}>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.pressableMenu}
      >
        <Text style={[styles.textDisplay, { fontSize: 16 }]}>
          Preparation Time
        </Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <Portal>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={isExtraTimeEnabled ? 1 : 0}
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
                  source={require("@/assets/icons/option.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Preparation Time</Text>
              </View>
              <View style={{ marginTop: 16 }}>
                <View style={menuStyles.menu}>
                  <Text style={menuStyles.textMenu}>
                    Morning Preparation Time
                  </Text>
                  <View style={menuStyles.switch}>
                    <Switch
                      trackColor={{
                        false: theme.colors.textPrimary,
                        true: theme.colors.green,
                      }}
                      ios_backgroundColor={theme.colors.textCaption}
                      onValueChange={toggleMorningTimeSwitch}
                      value={isMorningTimeEnabled}
                    />
                  </View>
                </View>
                <View style={menuStyles.divLine} />

                <View style={menuStyles.menu}>
                  <Text style={menuStyles.textMenu}>
                    Extra Preparation Time
                  </Text>
                  <View style={menuStyles.switch}>
                    <Switch
                      trackColor={{
                        false: theme.colors.textPrimary,
                        true: theme.colors.green,
                      }}
                      ios_backgroundColor={theme.colors.textCaption}
                      onValueChange={toggleExtraTimeSwitch}
                      value={isExtraTimeEnabled}
                    />
                  </View>
                </View>
                <View style={menuStyles.divLine} />

                <View>
                  {isExtraTimeEnabled ? (
                    <>
                      <Text style={[menuStyles.textMenu, {marginTop: 16}]}>
                        Extra time required
                      </Text>
                      <View
                        style={{
                          alignItems: "center",
                          marginVertical: 24,
                          marginLeft: -48,
                        }}
                      >
                        <TimerPicker
                          padWithNItems={1}
                          minuteLabel="mins"
                          hideSeconds={true}
                          hideHours={true}
                          LinearGradient={LinearGradient}
                          initialMinutes={parseInt(selectedMinutes)}
                          onDurationChange={(time) => {
                            setSelectedMinutes(time.minutes.toString());
                          }}
                          styles={{
                            backgroundColor: "#FFFFFF00",
                            pickerItem: {
                              fontSize: 40,
                              color: theme.colors.textPrimary,
                              fontFamily: "dm-sans-medium",
                            },
                            pickerLabel: {
                              fontSize: 24,
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
                              right: -36,
                              top: 0,
                              bottom: -12,
                              width: 56,
                              alignItems: "center",
                            },
                          }}
                        />
                      </View>

                      <View style={menuStyles.divLine} />

                      <View style={menuStyles.caution}>
                        <Image
                          source={require("@/assets/icons/alert-circle.png")}
                          style={{ width: 16, height: 16 }}
                        />
                        <Text style={menuStyles.cautionMessage}>
                          Disable “Morning Preparation Time” will shorten the
                          “Countdown Timer”.
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View style={menuStyles.caution}>
                      <Image
                        source={require("@/assets/icons/alert-circle.png")}
                        style={{ width: 16, height: 16 }}
                      />
                      <Text style={menuStyles.cautionMessage}>
                        Disable “Morning Preparation Time” will shorten the
                        “Countdown Timer”.
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </Portal>
    </GestureHandlerRootView>
  );
}

const menuStyles = StyleSheet.create({
  divLine: {
    height: 1,
    backgroundColor: theme.colors.divLine,
    justifyContent: "flex-end",
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
  },
  textMenu: {
    fontFamily: "dm-sans-medium",
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  switch: {
    backgroundColor: theme.colors.textPrimary,
    padding: 1,
    borderRadius: 20,
  },
  caution: {
    paddingVertical: 12,
    gap: 8,
    flexDirection: "row",
    marginLeft: -2,
  },
  cautionMessage: {
    fontFamily: "dm-sans-regular",
    color: theme.colors.textCaption,
  },
});
