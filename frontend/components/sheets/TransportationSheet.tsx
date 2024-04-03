import { View, Text, Image, Pressable } from "react-native";
import { useCallback, useMemo, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { styles } from "./SheetStyles";

export default function TransportationSheet() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView style={styles.sheetStyle}>
      <Pressable
        onPress={handlePresentModalPress}
        style={[styles.pressableMenu, { marginTop: 4 }]}
      >
        <View style={[styles.closeButton, { marginTop: 0, marginRight: 12 }]}>
          <Image
            source={require("@/assets/icons/car.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <Text style={[styles.textDisplay, { fontSize: 20 }]}>Car</Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={styles.chevronStyle}
        />
      </Pressable>
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
                  source={require("@/assets/icons/car.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Transportation Mode</Text>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </Portal>
    </GestureHandlerRootView>
  );
}