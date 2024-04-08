import { View, Text, Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { styles } from "./SheetStyles";
import CardAddress from "../address/CardAddress";
import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import StartPoint from "../address/StartPoint";
import { theme } from "@/app/theme";
import React from "react";

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


export default function LocationSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={styles.sheetStyle}>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={[styles.pressableMenu, { marginTop: 4 }]}
      >
        <View style={[styles.closeButton, { marginTop: 0, marginRight: 12 }]}>
          <Image
            source={require("@/assets/icons/school.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <Text style={[styles.textDisplay, { fontSize: 20 }]}>School</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </TouchableOpacity>
      <View style={styles.divLine} />
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
                  source={require("@/assets/icons/location.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Location</Text>
              </View>
              <CardAddress />
              <StartPoint />
              <View style={styles.divLine} />
              <View style={menuStyle.caution}>
                <Image
                  source={require("@/assets/icons/alert-circle.png")}
                  style={{ width: 16, height: 16 }}
                />
                <Text style={menuStyle.cautionMessage}>
                  Choosing other locations may affect the ML Calculations.
                </Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </Portal>
    </GestureHandlerRootView>
  );
}

const menuStyle = StyleSheet.create({
  caution: {
    paddingVertical: 8,
    flexDirection: "row",
    gap: 12,
  },
  cautionMessage: {
    fontFamily: "dm-sans-regular",
    color: theme.colors.textCaption,
  },
});
