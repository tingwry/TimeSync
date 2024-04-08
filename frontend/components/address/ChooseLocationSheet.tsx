import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import { theme } from "@/app/theme";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { styles } from "../sheets/SheetStyles";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback, useState } from "react";
import { Portal } from "@gorhom/portal";
import React from "react";
import { ButtonPrimaryProps } from "../buttons/ButtonPrimary";

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function ChooseLocation() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["93%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const searchSnapPoints = useMemo(() => ["25%", "75%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleCollapseSearchPress = () => bottomSheetRef.current?.collapse();
  const handleCloseSearchPress = () => bottomSheetRef.current?.close();
  const handleExpandSearchPress = () => bottomSheetRef.current?.expand();

  const handleCloseSheet = () => {
    handleCloseModalPress();
    handleCloseSearchPress();
  };

  const [focus, setFocus] = useState(false);
  const searchContainerStyle = focus
    ? styles.searchContainerFocus
    : styles.searchContainer;

  const handleSearchFocus = () => {
    handleExpandSearchPress();
    setFocus(true);
  };

  const handleSearchCollapse = () => {
    handleCollapseSearchPress();
    setFocus(false);
  };

  // map part
  const [pin, setPin] = useState({
    latitude: 13.736834400006273,
    longitude: 100.53314465311604,
  });
  
  const mapRef = useRef(null);

  const onMarkerDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    const validLatitude = parseFloat(Math.min(Math.max(latitude, -90), 90).toFixed(16));
    const validLongitude = parseFloat(Math.min(Math.max(longitude, -180), 180).toFixed(16));

    setPin({ latitude: validLatitude, longitude: validLongitude });
    console.log("End", { latitude: validLatitude, longitude: validLongitude });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/app/location/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loc_name: "Home",
          latitude: pin.latitude,
          longitude: pin.longitude,
          default_home: false,
          default_dest: false,
          user_id: 1,
        }),
      });
      if (response.ok) {
        console.log("Success");
      } else {
        console.error("Failed to post");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <GestureHandlerRootView>
      <Pressable style={menuStyle.subMenu} onPress={handlePresentModalPress}>
        <Image
          source={require("@/assets/icons/location.png")}
          style={{ width: 20, height: 20 }}
        />
        <Text style={[styles.textDisplay, { fontSize: 16 }]}>
          Choose other location
        </Text>
        <Image
          source={require("@/assets/icons/chevron-right.png")}
          style={[styles.chevronStyle, { marginTop: 8 }]}
        />
      </Pressable>

      <Portal>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={0}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.modalLocationBackgroundStyle}
          enablePanDownToClose={true}
          stackBehavior="push"
        >
          <BottomSheetView>
            <View style={[styles.handleModalIndicatorStyle, { flexGrow: 1 }]} />

            <TouchableOpacity
              style={[styles.modalCloseButton, { marginRight: 16 }]}
              onPress={handleCloseSheet}
              hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} // Adjust hitSlop as needed
            >
              <Image
                source={require("@/assets/icons/close.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            <View style={menuStyle.header}>
              <View style={[styles.sheetItem, { marginLeft: 32 }]}>
                <Image
                  source={require("@/assets/icons/location.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.textHeader}>Choose Location</Text>
              </View>
            </View>

            <MapView
              // provider="google"
              ref={mapRef}
              style={{ width: "100%", height: "100%", marginTop: 20}}
              initialRegion={{
                latitude: 13.736834400006273,
                longitude: 100.53314465311604,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={pin}
                draggable={true}
                
                onDragEnd={onMarkerDragEnd}
              >
                <Callout>
                  <Text>My Destination</Text>
                </Callout>
              </Marker>
            </MapView>

            {/* Search Bottom Sheet */}

            <Portal>
              <BottomSheet
                ref={bottomSheetRef}
                snapPoints={searchSnapPoints}
                index={0}
                handleIndicatorStyle={styles.handleIndicator}
                backgroundStyle={styles.modalBackgroundStyle}
                enablePanDownToClose={false}
                keyboardBehavior="fillParent"
              >
                <View style={styles.handleModalIndicatorStyle} />
                <Pressable
                  onPress={handleSearchCollapse}
                  style={{ position: "absolute", right: 16, marginTop: 4 }}
                >
                  <View style={styles.modalCloseButton}>
                    <Image
                      source={require("@/assets/icons/close.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                </Pressable>
                <View style={menuStyle.header}>
                  <View style={[styles.sheetItem, { marginLeft: 32 }]}>
                    <Image
                      source={require("@/assets/icons/location.png")}
                      style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.textHeader}>Location</Text>
                    {/* <View>
                      <Text style={styles.textTitle}>{pin.latitude}{pin.longitude}</Text>
                    </View> */}
                  </View>
                  <View style={menuStyle.header}>
                    <Button title="Done" onPress={handleCloseSheet} />
                  </View>
                  {/* <View style={searchContainerStyle}>
                    <Image
                      source={require("@/assets/icons/search.png")}
                      style={{ width: 20, height: 20 }}
                    />
                    <BottomSheetTextInput
                      style={styles.searchInput}
                      placeholder="Search for Location"
                      placeholderTextColor={theme.colors.textPlaceholder}
                      onFocus={handleSearchFocus}
                    />
                 </View> */}
                </View>
              </BottomSheet>
            </Portal> 
          </BottomSheetView>
        </BottomSheetModal>
      </Portal>
    </GestureHandlerRootView>
  );
}

const menuStyle = StyleSheet.create({
  startPoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    right: 0,
  },
  menu: {
    alignItems: "center",
    paddingTop: 16,
    // paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
    flexDirection: "row",
    gap: 16,
    marginHorizontal: 32,
    paddingTop: 8,
    marginTop: 12,
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
