import {
    Button,
    Pressable,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
  } from "react-native";
  import { theme } from "../theme";
  import React, { useMemo, useRef, useState } from "react";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import BottomSheet from "@gorhom/bottom-sheet";
  import { styles } from "@/components/sheets/SheetStyles";
  import { router, useNavigation } from "expo-router";
  import { useFonts } from "expo-font";
  import ButtonPrimary from "@/components/buttons/ButtonPrimary";
  import MapView from "react-native-maps";
  import { Marker, Callout } from "react-native-maps";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  
  export default function MapHome() {
    const searchSnapPoints = useMemo(() => ["30%"], []);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleCollapseSearchPress = () => bottomSheetRef.current?.collapse();
    //   const handleCloseSearchPress = () => bottomSheetRef.current?.close();
    const handleExpandSearchPress = () => bottomSheetRef.current?.expand();
  
    const [focus, setFocus] = useState(false);
    const searchContainerStyle = focus
      ? styles.searchContainerFocus
      : styles.searchContainer;
  
    //   const handleSearchFocus = () => {
    //     handleExpandSearchPress();
    //     setFocus(true);
    //   };
  
    const handleSearchCollapse = () => {
      handleCollapseSearchPress();
      setFocus(false);
    };
  
    const navigation = useNavigation();
  
    const [pin, setPin] = useState({
      latitude: 13.736834400006273,
      longitude: 100.53314465311604,
    });
  
    const mapRef = useRef(null);
  
    const onMarkerDragEnd = (e: any) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;
  
      const validLatitude = parseFloat(
        Math.min(Math.max(latitude, -90), 90).toFixed(16)
      );
      const validLongitude = parseFloat(
        Math.min(Math.max(longitude, -180), 180).toFixed(16)
      );
  
      setPin({ latitude: validLatitude, longitude: validLongitude });
      console.log("End", { latitude: validLatitude, longitude: validLongitude });
    };
  
    const handleSubmit = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/app/location/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              loc_name: "School",
              latitude: pin.latitude,
              longitude: pin.longitude,
              default_home: false,
              default_dest: true,
              uid: 1,
            }),
          }
        );
        if (response.ok) {
          console.log("Success");
          navigation.goBack()
        } else {
          console.error("Failed to post");
          console.log(response.status)
        }
      } catch (error) {
        console.error("Error submitting:", error);
      }
    };
  
    return (
      <GestureHandlerRootView style={menuStyles.background}>
        <View style={menuStyles.headerView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={menuStyles.backButton}
          >
            <Image
              source={require("@/assets/icons/chevron-left.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={menuStyles.textButton}>Back</Text>
          </TouchableOpacity>
          <Text style={menuStyles.textHeader}>Choose Location</Text>
        </View>
        <View style={menuStyles.container}>
  
          <MapView
            // provider="google"
            ref={mapRef}
            style={{ width: "100%", height: "100%", marginTop: 20 }}
            initialRegion={{
              latitude: 13.736834400006273,
              longitude: 100.53314465311604,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* <Button onPress={handleSubmit} title="Submit" /> */}
            <Marker coordinate={pin} draggable={true} onDragEnd={onMarkerDragEnd}>
              <Callout>
                <Text>My Destination</Text>
              </Callout>
            </Marker>
          </MapView>
  
          {/* <Button onPress={() => goToPin()} title="Go Home" /> */}
        </View>
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
          <View style={menuStyles.header}>
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
            <View style={styles.sheetView}>
              <Text style={menuStyles.textLocation}>Choose Location</Text>
            </View>
          </View>
          <View style={menuStyles.footer}>
            <ButtonPrimary text="Set as Destination" press={handleSubmit} />
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
  
  const menuStyles = StyleSheet.create({
    background: {
      flexGrow: 1,
      backgroundColor: theme.colors.bluePrimary,
    },
    header: {
      marginTop: 8,
      paddingLeft: 0,
      paddingRight: 0,
    },
    headerView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      marginTop: 68,
      backgroundColor: theme.colors.bluePrimary,
    },
    textHeader: {
      fontFamily: "dm-sans-bold",
      fontSize: 20,
      color: theme.colors.textPrimary,
      justifyContent: "center",
    },
    backButton: {
      position: "absolute",
      paddingRight: 8,
      paddingVertical: 8,
      alignItems: "center",
      left: 0,
      flexDirection: "row",
      gap: 4,
      marginLeft: 24,
    },
    textButton: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontFamily: "dm-sans-medium",
    },
    footer: {
      justifyContent: "flex-end",
      flex: 1,
      bottom: 44,
    },
    textLocation: {
      fontFamily: "dm-sans-regular",
      fontSize: 16,
      color: theme.colors.textCaption,
      marginHorizontal: 8,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      marginTop: 100,
      flex: 1,
      // justifyContent: "flex-end",
      // alignItems: "center",
    }
  });