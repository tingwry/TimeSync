import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../theme";
import React, { useState } from "react";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { useRouter } from "expo-router";
import { TimerPicker } from "react-native-timer-picker";

export default function SetPreparationTime() {
  const router = useRouter();
  const [selectedMinutes, setSelectedMinutes] = useState("45");

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelView}>
          <Image
            source={require("@/assets/icons/clock-start.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <Text style={styles.textHeader}>Set Morning Preparation Time</Text>
      </View>
      <Text style={styles.textCaption}>
        Measure the time since you wake up until the time you have left your
        home.
      </Text>
      <View style={styles.contentView}>
        <TimerPicker
          padWithNItems={1}
          minuteLabel="mins"
          hideSeconds={true}
          hideHours={true}
          LinearGradient={LinearGradient}
          initialMinutes={parseInt(selectedMinutes)}
          onDurationChange={(time) => {
            setSelectedMinutes(time.minutes.toString());
          }}
          styles={{
            backgroundColor: "#FFFFFF00",
            pickerItem: {
              fontSize: 40,
              color: theme.colors.textPrimary,
              fontFamily: "dm-sans-medium",
            },
            pickerLabel: {
              fontSize: 24,
              marginTop: 0,
              color: theme.colors.textPrimary,
              fontFamily: "dm-sans-medium",
            },
            pickerContainer: {
              marginRight: 0,
            },
            pickerItemContainer: {
              marginHorizontal: -16,
            },
            pickerLabelContainer: {
              right: -36,
              top: 0,
              bottom: -12,
              width: 56,
              alignItems: "center",
            },
          }}
        />
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.push("/SetDestinationLocation")}>
          <Text style={styles.cancelButton}>I'm not sure</Text>
        </Pressable>
        <View style={styles.indicatorContainer}>
          <Pressable
            style={styles.indicatorFocus}
            onPress={() => router.push("/SetHomeLocation")}
          />
          <View style={styles.indicatorFocus} />
          <Pressable
            style={styles.indicator}
            onPress={() => router.push("/SetDestinationLocation")}
          />
        </View>
        <ButtonPrimary
          text="Continue"
          press={() => router.push("/SetDestinationLocation")}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexGrow: 1,
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 28,
    marginTop: 28,
    marginBottom: 24,
    textAlign: "center",
  },
  contentView: {
    width: "100%",
    paddingHorizontal: 32,
    alignItems: "center",
    marginLeft: -48,
    justifyContent: "center",
    marginTop: 64,
  },
  labelView: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: theme.colors.textPlaceholder,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 136,
    paddingHorizontal: 64,
  },
  mapButton: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 24,
    paddingLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 20,
  },
  mapLabel: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.textPlaceholder,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textMap: {
    fontFamily: "dm-sans-semibold",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1,
    bottom: 44,
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginBottom: 24,
    justifyContent: "center",
  },
  indicator: {
    width: 42,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textPlaceholder,
  },
  indicatorFocus: {
    width: 42,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textPrimary,
  },
  textCaption: {
    fontFamily: "dm-sans-regular",
    fontSize: 16,
    color: theme.colors.textCaption,
    textAlign: "center",
    marginHorizontal: 48,
  },
  cancelButton: {
    padding: 8,
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-semibold",
    marginTop: 4,
    textDecorationLine: "underline",
    marginBottom: 16
  },
});
