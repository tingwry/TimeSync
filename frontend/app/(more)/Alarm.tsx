import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { theme } from "../theme";
import Sound from "react-native-sound";

// const alarm = require("@/assets/sounds/Sound1.mp3");

const sounds = [
  "@/assets/sounds/Sound1.mp3",
  "@/assets/sounds/Sound2.mp3",
  "@/assets/sounds/Sound3.mp3",
];

export default function AlarmSetPage() {
  const [isSound1Enabled, setSound1Enabled] = useState(false);
  const [isSound2Enabled, setSound2Enabled] = useState(false);
  const [isSound3Enabled, setSound3Enabled] = useState(false);
  const [isSound4Enabled, setSound4Enabled] = useState(false);

  const toggleSound1 = () => {
    setSound1Enabled((prevState) => !prevState);
  };
  const toggleSound2 = () => {
    setSound2Enabled((prevState) => !prevState);
  };
  const toggleSound3 = () => {
    setSound3Enabled((prevState) => !prevState);
  };
  const toggleSound4 = () => {
    setSound4Enabled((prevState) => !prevState);
  };

  const navigation = useNavigation();

  const [select, setSelected] = useState(1);

  var Sound = require("react-native-sound");
  const [currentSoundIndex, setCurrentSoundIndex] = useState(null);

  const playSound = (index: any) => {
    // Stop any currently playing sound
    // Sound.stop();

    // Initialize the new sound
    const sound = new Sound(sounds[index], null, (error: any) => {
      if (error) {
        console.log("Failed to load the sound", error);
        return;
      }

      // Play the sound
      sound.play((success: any) => {
        if (success) {
          console.log("Sound played successfully");
        } else {
          console.log("Sound playback failed");
        }
      });
    });

    // Set the current sound index
    setCurrentSoundIndex(index);
  };

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
          <Text style={styles.textButton}>More</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Alarms</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setSelected(1);
            // playSound(0);
          }}
        >
          <View>
            {select === 1 ? (
              <View style={styles.radioActive}>
                <Image
                  source={require("@/assets/icons/radio-check.png")}
                  style={styles.radioCheckIcon}
                />
              </View>
            ) : (
              <View style={styles.radioDefault} />
            )}
          </View>
          <Text style={styles.textOption}>Sound 1</Text>
        </TouchableOpacity>

        <View style={styles.divLine} />

        <TouchableOpacity style={styles.option} onPress={() => setSelected(2)}>
          <View>
            {select === 2 ? (
              <View style={styles.radioActive}>
                <Image
                  source={require("@/assets/icons/radio-check.png")}
                  style={styles.radioCheckIcon}
                />
              </View>
            ) : (
              <View style={styles.radioDefault} />
            )}
          </View>
          <Text style={styles.textOption}>Sound 2</Text>
        </TouchableOpacity>

        <View style={styles.divLine} />

        <TouchableOpacity style={styles.option} onPress={() => setSelected(3)}>
          <View>
            {select === 3 ? (
              <View style={styles.radioActive}>
                <Image
                  source={require("@/assets/icons/radio-check.png")}
                  style={styles.radioCheckIcon}
                />
              </View>
            ) : (
              <View style={styles.radioDefault} />
            )}
          </View>
          <Text style={styles.textOption}>Sound 3</Text>
        </TouchableOpacity>

        <View style={styles.divLine} />

        <TouchableOpacity style={styles.option} onPress={() => setSelected(4)}>
          <View>
            {select === 4 ? (
              <View style={styles.radioActive}>
                <Image
                  source={require("@/assets/icons/radio-check.png")}
                  style={styles.radioCheckIcon}
                />
              </View>
            ) : (
              <View style={styles.radioDefault} />
            )}
          </View>
          <Text style={styles.textOption}>Sound 4</Text>
        </TouchableOpacity>

        <View style={styles.divLine} />
      </View>

      {/* <View> */}
      {/* <Text style={styles.btnText}>Account</Text> */}
      {/* <View style={{ bottom: 25, right: 7 }}>
          <View
            style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
          />
          <View style={styles.btnOutline}>
            <TouchableOpacity onPress={toggleSound1}>
              <Image
                source={
                  isSound1Enabled
                    ? require("@/assets/icons/checked.png")
                    : require("@/assets/icons/notcheck.png")
                }
                style={styles.btntoggle}
              />
            </TouchableOpacity>
            <View
              style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
            />
            <Text style={styles.btnText}>Sound 1</Text>
          </View>
          <View
            style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
          />
          <View style={styles.btnOutline}>
            <TouchableOpacity onPress={toggleSound2}>
              <Image
                source={
                  isSound2Enabled
                    ? require("@/assets/icons/checked.png")
                    : require("@/assets/icons/notcheck.png")
                }
                style={styles.btntoggle}
              />
            </TouchableOpacity>
            <View
              style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
            />
            <Text style={styles.btnText}>Sound 2</Text>
          </View>
          <View
            style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
          />
          <View style={styles.btnOutline}>
            <TouchableOpacity onPress={toggleSound3}>
              <Image
                source={
                  isSound3Enabled
                    ? require("@/assets/icons/checked.png")
                    : require("@/assets/icons/notcheck.png")
                }
                style={styles.btntoggle}
              />
            </TouchableOpacity>
            <View
              style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
            />
            <Text style={styles.btnText}>Sound 3</Text>
          </View>
          <View
            style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
          />
          <View style={styles.btnOutline}>
            <TouchableOpacity onPress={toggleSound4}>
              <Image
                source={
                  isSound4Enabled
                    ? require("@/assets/icons/checked.png")
                    : require("@/assets/icons/notcheck.png")
                }
                style={styles.btntoggle}
              />
            </TouchableOpacity>
            <View
              style={{ height: 1.5, backgroundColor: theme.colors.divLine }}
            />
            <Text style={styles.btnText}>Sound 4</Text>
          </View>
        </View> */}
      {/* </View> */}
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
    marginBottom: 16,
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
    paddingHorizontal: 8,
    flexDirection: "column",
  },
  option: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    height: 48,
  },
  textOption: {
    fontFamily: "dm-sans-medium",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  radioDefault: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 12,
  },
  radioActive: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    backgroundColor: theme.colors.textPrimary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCheckIcon: {
    width: 16,
    height: 16,
  },
  divLine: {
    height: 1,
    backgroundColor: theme.colors.divLine,
    justifyContent: "flex-end",
  },
});
