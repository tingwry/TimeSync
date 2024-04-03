import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { theme } from "@/app/theme";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { styles } from "../sheets/SheetStyles";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback } from "react";
import { Portal } from "@gorhom/portal";
import CardAddressSmall from "./CardAddressSmall";
import ChooseLocation from "./ChooseLocationSheet";

export default function CardAddress() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["38%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <GestureHandlerRootView>
      <Pressable style={cardStyles.cardStyle} onPress={handlePresentModalPress}>
        <View style={cardStyles.label}>
          <Image
            source={require("@/assets/icons/school.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View style={cardStyles.addressDetail}>
          <Text style={cardStyles.addressName}>School</Text>
          <Text style={cardStyles.addressLocation}>
            Faculty of Engineering, Chulalongkorn University
          </Text>
        </View>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={{ width: 24, height: 24 }}
        />
      </Pressable>
      <Portal>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.modalBackgroundStyle}
          enablePanDownToClose={true}
          stackBehavior="push"
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
            <View style={cardStyles.header}>
              <View style={[styles.sheetItem, { marginLeft: 32 }]}>
                <Image
                  source={require("@/assets/icons/location.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Destination Location</Text>
              </View>
              <ScrollView
                horizontal={true}
                style={cardStyles.horizontalCardScroll}
                showsHorizontalScrollIndicator={false}
                contentInset={{ right: 64, left: 0, bottom: 0, top: 0 }}
              >
                <CardAddressSmall
                  locationName="Home"
                  locationDetail="123 ABC Road"
                  labelIcon={require("@/assets/icons/home.png")}
                />
                <CardAddressSmall
                  locationName="School"
                  locationDetail="Faculty of Engineering, Chulalongkorn Uni..."
                  labelIcon={require("@/assets/icons/school.png")}
                />
                <CardAddressSmall
                  locationName="School"
                  locationDetail="Faculty of Engineering, Chulalongkorn Uni..."
                  labelIcon={require("@/assets/icons/school.png")}
                />
              </ScrollView>
              <ChooseLocation />
              <View style={[styles.divLine, { marginHorizontal: 32 }]} />
              <View style={cardStyles.caution}>
                <Image
                  source={require("@/assets/icons/alert-circle.png")}
                  style={{ width: 16, height: 16 }}
                />
                <Text style={cardStyles.cautionMessage}>
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

const cardStyles = StyleSheet.create({
  cardStyle: {
    width: "100%",
    height: 96,
    backgroundColor: theme.colors.blueSecondary,
    marginTop: 16,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  label: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.textPlaceholder,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addressDetail: {
    width: "72%",
    flexDirection: "column",
  },
  addressName: {
    fontFamily: "dm-sans-medium",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  addressLocation: {
    fontFamily: "dm-sans-regular",
    fontSize: 12,
    color: theme.colors.textCaption,
    marginTop: 4,
  },
  subMenu: {
    paddingVertical: 8,
    marginTop: 12,
    flexDirection: "row",
    gap: 16,
    marginHorizontal: 32,
  },
  horizontalCardScroll: {
    paddingLeft: 32,
  },
  header: {
    marginTop: 8,
    paddingLeft: 0,
    paddingRight: 0,
  },
  caution: {
    paddingVertical: 8,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 32,
  },
  cautionMessage: {
    fontFamily: "dm-sans-regular",
    color: theme.colors.textCaption,
  },
});