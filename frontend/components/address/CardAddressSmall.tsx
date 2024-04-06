import React from "react";
import { theme } from "@/app/theme";
import { Text, Image, View, StyleSheet, Pressable } from "react-native";

export interface CardAddressSmallProps {
  locationName: string;
  locationDetail: string;
  labelIcon: any;
}

export default function CardAddressSmall(props: CardAddressSmallProps) {
  return (
    <Pressable style={cardStyles.cardStyle}>
      <View style={cardStyles.label}>
        <Image source={props.labelIcon} style={{ width: 20, height: 20 }} />
      </View>
      <View style={cardStyles.addressDetail}>
        <Text style={cardStyles.addressName}>{props.locationName}</Text>
        <Text style={cardStyles.addressLocation}>{props.locationDetail}</Text>
      </View>
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  cardStyle: {
    width: 216,
    height: 80,
    backgroundColor: theme.colors.blueSecondary,
    marginTop: 16,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
    marginRight: 8,
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
    width: "75%",
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
