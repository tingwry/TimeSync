import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { theme } from "@/app/theme";

export default function CardAddress() {

    
  return (
    <Pressable style={styles.cardStyle}>
      <View style={styles.label}>
        <Image
          source={require("@/assets/icons/school.png")}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <View style={styles.addressDetail}>
        <Text style={styles.addressName}>School</Text>
        <Text style={styles.addressLocation}>Faculty of Engineering, Chulalongkorn University</Text>
      </View>
      <Image
        source={require("@/assets/icons/chevron-right.png")}
        style={{ width: 24, height: 24 }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  }
});
