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

export default function AlarmNotiSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["33%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
  const toggleAlarmSwitch = () =>
    setIsAlarmEnabled((previousState) => !previousState);

  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const toggleNotificationSwitch = () =>
    setIsNotificationEnabled((previousState) => !previousState);

  return (
    <GestureHandlerRootView style={styles.sheetStyle}>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.pressableMenu}
      >
        <Text style={[styles.textDisplay, { fontSize: 16 }]}>
          Alarm & Notifications
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
          index={0}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.modalBackgroundStyle}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <View style={styles.handleModalIndicatorStyle} />
            <Pressable
              onPress={handleCloseModalPress}
              style={{ position: "absolute", right: 16, marginTop: 4 }}
            >
              <View style={styles.modalCloseButton}>
                <Image
                  source={require("@/assets/icons/close.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
            </Pressable>
            <View style={styles.modalSheetView}>
              <View style={styles.sheetItem}>
                <Image
                  source={require("@/assets/icons/option.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Alarm & Notification</Text>
              </View>
              <View style={{ marginTop: 16 }}>
                <View style={menuStyles.menu}>
                  <Text style={menuStyles.textMenu}>Turn on Alarm</Text>
                  <View style={menuStyles.switch}>
                    <Switch
                      trackColor={{
                        false: theme.colors.textPrimary,
                        true: theme.colors.green,
                      }}
                      ios_backgroundColor={theme.colors.textCaption}
                      onValueChange={toggleAlarmSwitch}
                      value={isAlarmEnabled}
                    />
                  </View>
                </View>
              </View>
              <View style={menuStyles.divLine} />

              <View style={menuStyles.menu}>
                <Text style={menuStyles.textMenu}>Follow-up Notification</Text>
                <View style={menuStyles.switch}>
                  <Switch
                    trackColor={{
                      false: theme.colors.textPrimary,
                      true: theme.colors.green,
                    }}
                    ios_backgroundColor={theme.colors.textCaption}
                    onValueChange={toggleAlarmSwitch}
                    value={isAlarmEnabled}
                  />
                </View>
              </View>
              <View style={menuStyles.divLine} />
              <View style={menuStyles.caution}>
                <Image
                  source={require("@/assets/icons/alert-circle.png")}
                  style={{ width: 16, height: 16 }}
                />
                <Text style={menuStyles.cautionMessage}>
                  "Follow-up Notification" will notify you when the "Departure Time" is less than 10 minutes away.
                </Text>
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
    marginLeft: -2
  },
  cautionMessage: {
    fontFamily: "dm-sans-regular",
    color: theme.colors.textCaption,
  },
});
