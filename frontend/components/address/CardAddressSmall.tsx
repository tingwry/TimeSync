import { theme } from "@/app/theme";
import React, { useRef, useCallback } from "react";
import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";

interface CardAddressSmallProps {
  loc_id: number;
  locationName: string;
  locationLat: number; // Add locationLat to the interface
  locationLong: number;
  labelIcon: any;
  onPress: (loc_id: number) => void;
}

export default function CardAddressSmall(props: CardAddressSmallProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { onPress, loc_id } = props;

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => onPress(props.loc_id)}
      style={cardStyles.cardStyle}
    >
      <View style={cardStyles.label}>
        <Image source={props.labelIcon} style={{ width: 20, height: 20 }} />
      </View>
      <Text style={cardStyles.addressName}>{props.locationName}</Text>
      <View style={cardStyles.addressDetail}>
        {/* <Text style={cardStyles.addressLocation}>{props.locationLat}</Text>
        <Text style={cardStyles.addressLocation}>{props.locationLong}</Text> */}
      </View>
    </TouchableOpacity>
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
    gap: 8,
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
