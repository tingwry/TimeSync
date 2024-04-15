import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { styles } from "./SheetStyles";
import React from "react";
import { theme } from "@/app/theme";

export interface TransportationSheetProps {
  onTransportationModeSelect: (mode: string) => void;
}

export default function TransportationSheet({ onTransportationModeSelect }: TransportationSheetProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["54%"], []);

  const [isSelected, setSelected] = useState("Car");
  const [selectedTransportationMode, setSelectedTransportationMode] = useState("car");

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback((mode: string) => {
    onTransportationModeSelect(mode); // Pass the selected transportation mode
    bottomSheetModalRef.current?.close();
  }, [onTransportationModeSelect]);


  const labelIcons = [
    require("@/assets/icons/car.png"),
    require("@/assets/icons/motorcycle.png"),
    require("@/assets/icons/bus.png"),
    require("@/assets/icons/metro.png"),
    require("@/assets/icons/walk.png"),
  ];

  const [label, setLabel] = useState(labelIcons[0]);

  return (
    <GestureHandlerRootView style={styles.sheetStyle}>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={[styles.pressableMenu, { marginTop: 4 }]}
      >
        <View style={[styles.closeButton, { marginTop: 0, marginRight: 12 }]}>
          <Image source={label} style={{ width: 20, height: 20 }} />
        </View>
        <Text style={[styles.textDisplay, { fontSize: 20 }]}>{isSelected}</Text>
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
              onPress={() => handleCloseModalPress(selectedTransportationMode)}

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
                  source={require("@/assets/icons/car.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Transportation Mode</Text>
              </View>
              <View style={cardStyles.cardView}>
                <TouchableOpacity
                  style={
                    isSelected === "Car"
                      ? cardStyles.backgroundFocus
                      : cardStyles.backgroundDefault
                  }
                  onPress={() => {
                    setSelected("Car");
                    setLabel(labelIcons[0]);
                    handleCloseModalPress("car");
                  }}
                >
                  <View style={cardStyles.detail}>
                    <View style={cardStyles.label}>
                      <Image
                        source={require("@/assets/icons/car.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </View>
                    <Text style={cardStyles.textLabel}>Car</Text>
                  </View>
                  <Text style={cardStyles.textTime}>20-22 min</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    isSelected === "Motorcycle"
                      ? cardStyles.backgroundFocus
                      : cardStyles.backgroundDefault
                  }
                  onPress={() => {
                    setSelected("Motorcycle");
                    setLabel(labelIcons[1]);
                    handleCloseModalPress("motorcycle");
                  }}
                >
                  <View style={cardStyles.detail}>
                    <View style={cardStyles.label}>
                      <Image
                        source={require("@/assets/icons/motorcycle.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </View>
                    <Text style={cardStyles.textLabel}>Motorcycle</Text>
                  </View>
                  <Text style={cardStyles.textTime}>16-18 min</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    isSelected === "Bus"
                      ? cardStyles.backgroundFocus
                      : cardStyles.backgroundDefault
                  }
                  onPress={() => {
                    setSelected("Bus");
                    setLabel(labelIcons[2]);
                    handleCloseModalPress("bus");
                  }}
                >
                  <View style={cardStyles.detail}>
                    <View style={cardStyles.label}>
                      <Image
                        source={require("@/assets/icons/bus.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </View>
                    <Text style={cardStyles.textLabel}>Bus</Text>
                  </View>
                  <Text style={cardStyles.textTime}>45-48 min</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    isSelected === "Metro"
                      ? cardStyles.backgroundFocus
                      : cardStyles.backgroundDefault
                  }
                  onPress={() => {
                    setSelected("Metro");
                    setLabel(labelIcons[3]);
                    handleCloseModalPress("metro");
                  }}
                >
                  <View style={cardStyles.detail}>
                    <View style={cardStyles.label}>
                      <Image
                        source={require("@/assets/icons/metro.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </View>
                    <Text style={cardStyles.textLabel}>Metro</Text>
                  </View>
                  <Text style={cardStyles.textTime}>24-33 min</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    isSelected === "Walk"
                      ? cardStyles.backgroundFocus
                      : cardStyles.backgroundDefault
                  }
                  onPress={() => {
                    setSelected("Walk");
                    setLabel(labelIcons[4]);
                    handleCloseModalPress("walk");
                  }}
                >
                  <View style={cardStyles.detail}>
                    <View style={cardStyles.label}>
                      <Image
                        source={require("@/assets/icons/walk.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </View>
                    <Text style={cardStyles.textLabel}>Walk</Text>
                  </View>
                  <Text style={cardStyles.textTime}>45-48 min</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </Portal>
    </GestureHandlerRootView>
  );
}

const cardStyles = StyleSheet.create({
  cardView: {
    marginTop: 16,
    marginHorizontal: -8,
  },
  backgroundDefault: {
    backgroundColor: theme.colors.blueSecondary,
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 20,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backgroundFocus: {
    backgroundColor: theme.colors.labelOrange,
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 20,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detail: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  label: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.textPlaceholder,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textLabel: {
    fontFamily: "dm-sans-semibold",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  textTime: {
    fontFamily: "dm-sans-regular",
    fontSize: 14,
    color: theme.colors.textCaption,
  },
});
