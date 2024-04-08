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
  
//   const goToPin = () => {
//     //complete this animation in 3 seconds
//     mapRef.current.animateToRegion(pin, 3 * 1000);
//   };

  const onMarkerDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    const validLatitude = Math.min(Math.max(latitude, -90), 90).toFixed(16);
    const validLongitude = Math.min(Math.max(longitude, -180), 180).toFixed(16);

    setPin(prevPin => ({ ...prevPin, validLatitude, validLongitude }));
    console.log("End", pin);
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
      <Button onPress={handleSubmit} title="Submit" />
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
});








// import { View, Text, StyleSheet, Image, StatusBar, Button } from "react-native";
// import React, {useState, useEffect} from "react";
// import { theme } from "../theme";
// import { useFonts } from "expo-font";
// import CardNoSchedule from "@/components/CardNoSchedule";
// import CardUpcomingSchedule from "@/components/CardUpcomingSchedule";
// import { PortalProvider } from "@gorhom/portal";

// interface ScheduleItem {
//   event_id: number;
//   event_name: string;
//   date: string;
//   start_time: string;
//   end_time: string;
//   transportation_mode: string;
//   extra_prep_time: Int16Array;
//   note: string;
// }

// export default function Home() {
//   const [fontsLoaded] = useFonts({
//     "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
//     "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
//     "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
//     "dm-sans-regular": require("@/assets/fonts/DMSans-Regular.ttf"),
//     "dm-sans-bold": require("@/assets/fonts/DMSans-Bold.ttf"),
//   });
//   if (!fontsLoaded) {
//     return <Text>Loading...</Text>;
//   }

//   const [schedule, setSchedule] = useState<ScheduleItem| null>(null)
//   const [scheduleNumber, setScheduleNumber] = useState(0)

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/app/schedule/recent/");
//         if (!response.ok) {
//           throw new Error("Failed to fetch schedule");
//         }
//         const data = await response.json();
//         setScheduleNumber(data.length);
//         setSchedule(data);
//       } catch (error) {
//         console.error("Error fetching schedule:", error);
//       }
//     };
  
//     fetchSchedule();
//   }, []);

//   return (
//     <View style={styles.background}>
//       <StatusBar barStyle="light-content" />
//       <View style={styles.containerHome}>
//         <Text style={styles.textTitle}>Hello, User</Text>
//         <Text style={styles.textCaption}>Let's see what is up next!</Text>
//       </View>
     
//       <View>
//         { scheduleNumber === 0 ? (
//           <CardNoSchedule />
//         ) : (
//           <View style={styles.container}>
//             <Text style={styles.textHeader}>Upcoming Schedule</Text>
//             {schedule && (
//               <CardUpcomingSchedule
//                 event_name={schedule.event_name}
//                 date={schedule.date}
//                 start_time={schedule.start_time}
//                 end_time={schedule.end_time}
//                 transportation_mode={schedule.transportation_mode}
//                 extra_prep_time={schedule.extra_prep_time}
//                 note={schedule.note}
//               />
//             )}
//               {/* {schedule.map((scheduleItem) => (
//                 <CardUpcomingSchedule
//                   key={scheduleItem.event_id}
//                   event_name={scheduleItem.event_name}
//                   date={scheduleItem.date}
//                   start_time={scheduleItem.start_time}
//                   end_time={scheduleItem.end_time}
//                   transportation_mode={scheduleItem.transportation_mode}
//                   extra_prep_time={scheduleItem.extra_prep_time}
//                   note={scheduleItem.note}
//                 />
//               ))} */}
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     backgroundColor: theme.colors.bluePrimary,
//     color: theme.colors.textPrimary,
//   },
//   container: {
//     marginLeft: 24,
//     marginRight: 24,
//     marginTop: 50,
//   },
//   containerHome: {
//     marginLeft: 24,
//     marginRight: 24,
//     marginTop: 100,
//   },
//   textTitle: {
//     color: theme.colors.textPrimary,
//     fontFamily: "dm-sans-extrabold",
//     fontSize: 36,
//     paddingLeft: 8,
//   },
//   textCaption: {
//     color: theme.colors.textCaption,
//     fontFamily: "dm-sans-regular",
//     fontSize: 16,
//     paddingLeft: 8,
//   },
//   textHeader: {
//     color: theme.colors.textPrimary,
//     fontFamily: "dm-sans-semibold",
//     fontSize: 20,
//     paddingLeft: 8,
//     paddingBottom: 24,
//   },
// });
