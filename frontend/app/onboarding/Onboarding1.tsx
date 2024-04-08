import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { theme } from "../theme";
import ButtonPrimary from "@/components/buttons/ButtonPrimaryLink";
import React from "react";

export default function Onboard1() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
    "dm-sans-regular": require("@/assets/fonts/DMSans-Regular.ttf"),
    "dm-sans-bold": require("@/assets/fonts/DMSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.navigationTop}>
        <TouchableOpacity
          onPress={() => router.push("/onboarding/Onboarding3")}
          style={styles.backButton}
        >
          <Text style={styles.textButton}>Skip</Text>
          <Image
            source={require("@/assets/icons/chevron-right.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentView}>
        <Image
          source={require("@/assets/images/onboard-pic-1.png")}
          style={{ width: 342, height: 342, marginBottom: 32 }}
        />
        <Text style={styles.textHeader}>Wake up with personalized alarm</Text>
        <Text style={styles.textDescription}>
          Maximize your sleep time with our intelligent ML that will calculate
          the best wake up time for you.
        </Text>
      </View>

      <View style={styles.indicatorContainer}>
          <View style={styles.indicatorFocus} />
          <Pressable
            style={styles.indicator}
            onPress={() => router.push("/onboarding/Onboarding2")}
          />

          <Pressable
            style={styles.indicator}
            onPress={() => router.push("/onboarding/Onboarding3")}
          />
        </View>

      <View style={styles.footer}>
        
        <ButtonPrimary text="Next" linkName={"/onboarding/Onboarding2"} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.bluePrimary,
    gap: 16,
    paddingTop: 68,
    paddingHorizontal: 24,
  },
  backButton: {
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
  navigationTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentView: {
    flexDirection: "column",
    justifyContent: "center",
  },
  textHeader: {
    fontFamily: "dm-sans-bold",
    fontSize: 32,
    color: theme.colors.textPrimary,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 48,
  },
  textDescription: {
    fontFamily: "dm-sans-regular",
    textAlign: "center",
    color: theme.colors.textCaption,
    paddingHorizontal: 24,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 24,
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
});
