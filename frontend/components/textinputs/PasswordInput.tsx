import { theme } from "@/app/theme";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Image,
} from "react-native";

export interface PasswordInputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorText?: string;
  password?: boolean;
}

export default function PasswordInput({
  label,
  helperText,
  errorText,
  password,
  ...props
}: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  const passwordVisiblie = require("@/assets/icons/eye-open.png");
  const passwordHide = require("@/assets/icons/eye-close.png");

  const inputContainerStyle = isFocused
    ? styles.inputContainerFocus
    : styles.inputContainer;

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={inputContainerStyle}>
        <TextInput
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={hidePassword}
          placeholderTextColor={theme.colors.textPlaceholder}
          style={[
            styles.textInput,
            {
              borderColor: errorText
                ? theme.colors.red
                : isFocused
                ? theme.colors.textPrimary
                : "#FEFEFE1A",
            },
          ]}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />

        <Pressable onPress={togglePasswordVisibility}>
          <Image
            source={hidePassword ? passwordHide : passwordVisiblie}
            style={{ width: 20, height: 20 }}
          />
        </Pressable>
      </View>

      {/* {password && (
        <Pressable onPress={() => setHidePassword(!hidePassword)}>
          <Image
            source={require("@/assets/icons/eye-open.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text>toggle hide</Text>
        </Pressable>
      )} */}
      {/* {helperText && <Text style={styles.helperText}>
                {helperText}
            </Text>} */}
      {/* <Text style={styles.helperText}>
                {helperText}
            </Text> */}
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 32,
    // paddingRight: 32,
    marginTop: 16,
    marginBottom: 12,
    // marginBottom: 40,
    width: "100%",
  },

  textInputStyle: {
    height: 48,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FEFEFE1A",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: theme.colors.blueSecondary,
    color: theme.colors.textPrimary,
    fontSize: 16,

    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 16,
  },

  label: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontFamily: "dm-sans-semibold",
    marginBottom: 8,
    paddingLeft: 8,
  },

  helperText: {
    color: theme.colors.textCaption,
    fontSize: 14,
    // fontFamily: 'dm-sans',

    paddingLeft: 8,
    paddingRight: 8,

    marginTop: 8,
    marginBottom: 0,
  },
  errorText: {
    color: theme.colors.red,
    fontSize: 14,
    // fontFamily: 'dm-sans',

    paddingLeft: 8,
    paddingRight: 8,

    marginTop: 8,
    marginBottom: 0,
    // marginTop: 85,
    // position: "relative",
  },
  inputContainer: {
    fontSize: 16,
    fontFamily: "dm-sans-regular",
    color: theme.colors.textPrimary,
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.blueSecondary,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.colors.stroke,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    
  },
  inputContainerFocus: {
    fontSize: 16,
    fontFamily: "dm-sans-regular",
    color: theme.colors.textPrimary,
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.blueSecondary,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.colors.textPrimary,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    flexGrow: 1,
  },
  textInput: {
    fontFamily: "dm-sans-regular",
    color: theme.colors.textPrimary,
    fontSize: 16,
    flexGrow: 1,
  },
});
