import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { theme } from "../theme";
import React, { useRef, useState } from "react";
import { useRouter, useNavigation } from "expo-router";
import CardLocations from "@/components/address/CardLocations";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

export default function LocationHome() {
  const navigation = useNavigation();
  const router = useRouter();

  const [locationName, setLocationName] = useState("Home");

  const [isSelected, setSelected] = useState("Home");
  const [loactionChosen, setLocationChosen] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const inputContainerStyle = isFocused
    ? styles.inputContainerFocus
    : styles.inputContainerDefault;

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require("@/assets/icons/chevron-left.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.textButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Home Location</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Location Name</Text>
        <View style={inputContainerStyle}>
          <TextInput
            placeholder="Other (Default)"
            placeholderTextColor={theme.colors.textPlaceholder}
            style={styles.textInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(locationName) => setLocationName(locationName)}
            value={locationName}
          />
        </View>

        <Text style={styles.textTitle}>Location</Text>
        <CardLocations
          locationName="Home"
          locationDetail="RHYTHM Rangnam"
          labelIcon={require("@/assets/icons/home.png")}
          navigateTo={() => router.push("/MapLocation")}
        />

        <Text style={[styles.textTitle, {marginTop: 24}]}>Set Location as</Text>
        <ScrollView
          horizontal={true}
          style={labelStyles.horizontalCardScroll}
          showsHorizontalScrollIndicator={false}
          contentInset={{ right: 64, left: 0, bottom: 0, top: 0 }}
        >
          <TouchableOpacity
            style={
              isSelected === "Home"
                ? [labelStyles.backgroundFocus, { width: 108 }]
                : [labelStyles.backgroundDefault, { width: 108 }]
            }
            onPress={() => setSelected("Home")}
          >
            <View style={labelStyles.detail}>
              <View style={labelStyles.label}>
                <Image
                  source={require("@/assets/icons/home.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <Text style={labelStyles.textLabel}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              isSelected === "School"
                ? [labelStyles.backgroundFocus, { width: 116 }]
                : [labelStyles.backgroundDefault, { width: 116 }]
            }
            onPress={() => setSelected("School")}
          >
            <View style={labelStyles.detail}>
              <View style={labelStyles.label}>
                <Image
                  source={require("@/assets/icons/school.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <Text style={labelStyles.textLabel}>School</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              isSelected === "Workplace"
                ? [labelStyles.backgroundFocus, { width: 145 }]
                : [labelStyles.backgroundDefault, { width: 145 }]
            }
            onPress={() => {
              setSelected("Workplace");
              console.log("selected!");
            }}
          >
            <View style={labelStyles.detail}>
              <View style={labelStyles.label}>
                <Image
                  source={require("@/assets/icons/workplace.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <Text style={labelStyles.textLabel}>Workplace</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              isSelected === "Other"
                ? [labelStyles.backgroundFocus, { width: 108 }]
                : [labelStyles.backgroundDefault, { width: 108 }]
            }
            onPress={() => setSelected("Other")}
          >
            <View style={labelStyles.detail}>
              <View style={labelStyles.label}>
                <Image
                  source={require("@/assets/icons/location.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <Text style={labelStyles.textLabel}>Other</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <ButtonPrimary text="Save Changes" press={() => navigation.goBack()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    backgroundColor: theme.colors.bluePrimary,
    gap: 16,
    paddingTop: 68,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
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
  },
  textButton: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-medium",
  },
  container: {
    // paddingHorizontal: 8,
    flexDirection: "column",
  },
  textTitle: {
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginLeft: 8,
    marginTop: 8,
  },
  inputContainerDefault: {
    backgroundColor: theme.colors.blueSecondary,
    height: 48,
    paddingLeft: 18,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 20,
    marginTop: 16,
    justifyContent: "center",
    marginBottom: 24,
  },
  inputContainerFocus: {
    backgroundColor: theme.colors.blueSecondary,
    height: 48,
    paddingLeft: 18,
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 20,
    marginTop: 16,
    justifyContent: "center",
    marginBottom: 24,
  },
  textInput: {
    alignItems: "center",
    fontSize: 16,
    fontFamily: "dm-sans-regular",
    color: theme.colors.textPrimary,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
    bottom: 44,
    alignItems: "center",
  },
  cancelButton: {
    padding: 8,
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-semibold",
    marginTop: 4,
    textDecorationLine: "underline",
  },
});

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
    marginBottom: 24,
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
    width: "70%",
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
});

const labelStyles = StyleSheet.create({
  header: {
    marginTop: 8,
    paddingLeft: 0,
    paddingRight: 0,
  },
  backgroundDefault: {
    backgroundColor: theme.colors.blueSecondary,
    height: 48,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 16,
    // marginBottom: 8,
    marginRight: 8,
  },
  backgroundFocus: {
    backgroundColor: theme.colors.labelOrange,
    height: 48,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 16,
    marginRight: 8,
  },
  detail: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  label: {
    width: 32,
    height: 32,
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
  horizontalCardScroll: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    marginHorizontal: -32,
    paddingBottom: 16
  },
});
