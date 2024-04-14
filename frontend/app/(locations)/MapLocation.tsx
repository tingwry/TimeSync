import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function MapLocation() {
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
            loc_name: "Home",
            latitude: pin.latitude,
            longitude: pin.longitude,
            default_home: false,
            default_dest: false,
            uid: 1,
          }),
        }
      );
      if (response.ok) {
        console.log("Success");
      } else {
        console.error("Failed to post");
        console.log(response.status)
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyD7Q9Q1J9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9',
          language: 'en',
          components: 'country:th',
          types: 'address',
          radius: 100000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
          container: {flex: 0, position: 'absolute', width: '100%', zIndex: 1},
          listView: {backgroundColor: 'white'},
        }}
      /> */}
      {/* <Button onPress={handleSubmit} title="Submit" /> */}

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
        <Button onPress={handleSubmit} title="Submit" />
        <Marker coordinate={pin} draggable={true} onDragEnd={onMarkerDragEnd}>
          <Callout>
            <Text>My Destination</Text>
          </Callout>
        </Marker>
      </MapView>
      
      {/* <Button onPress={() => goToPin()} title="Go Home" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 50,
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 20,
    backgroundColor: "lightblue",
  },
  textUpcoming: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 20,
    paddingLeft: 8,
    marginTop: 48,
    marginBottom: 24,
  },
});
