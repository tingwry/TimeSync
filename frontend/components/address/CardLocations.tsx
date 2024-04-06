import { theme } from "@/app/theme";
import React from "react";
import { Text, Image, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";

export interface CardLocationsProps {
  locationName: string;
  locationDetail: string;
    labelIcon: any;
    navigateTo: any
}

export default function CardLocations(props: CardLocationsProps) {
  return (
    <TouchableOpacity style={cardStyles.cardStyle} onPress={props.navigateTo}>
      <View style={cardStyles.label}>
        <Image source={props.labelIcon} style={{ width: 20, height: 20 }} />
      </View>
      <View style={cardStyles.addressDetail}>
        <Text style={cardStyles.addressName}>{props.locationName}</Text>
        <Text style={cardStyles.addressLocation}>{props.locationDetail}</Text>
          </View>
          <Image source={require("@/assets/icons/chevron-right.png")} style={{width: 24, height: 24}} />
    </TouchableOpacity>
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
