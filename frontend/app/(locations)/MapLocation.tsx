import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


export default function App() {
  const [pin, setPin] = useState({ 
    latitude: 13.736834400006273,
    longitude: 100.53314465311604, 
});
  const [region, setRegion] = useState({ 
      latitude: 13.736834400006273,
      longitude: 100.53314465311604, });
  const mapRef = useRef(null);
  
  const goToPin = () => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(pin, 3 * 1000);
  };

  const onMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPin(prevPin => ({ ...prevPin, latitude, longitude }));
    console.log("End", pin);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
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
      />
      <Button onPress={() => goToPin()} title="Go Home" />

      <MapView
        // provider="google"
        ref={mapRef}
        style={styles.map}
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
          onDragStart={(e) => 
            console.log("Start", e.nativeEvent.coordinate
          )}
          onDragEnd={onMarkerDragEnd} 
        >
          <Callout>
            <Text>My Location</Text>
          </Callout>
        </Marker>
      </MapView>
      <Button onPress={() => goToPin()} title="Go Home" />
      {/* <Text style={styles.text}>Current latitude{region.latitude}</Text>
      <Text style={styles.text}>Current longitude{region.longitude}</Text>  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 50,
    flex: 1,
    // justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 20,
    backgroundColor: "lightblue",
  },
});