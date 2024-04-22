import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, router } from "expo-router";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import TextInputPrimary from "@/components/textinputs/TextInputPrimary";
import { theme } from "../theme";
import ButtonGoogle from "@/components/buttons/ButtonGoogle";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import PasswordInput from "@/components/textinputs/PasswordInput";

export default function SignInScreen() {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState({
      email: "",
      password: "",
  });

  const [fontsLoaded] = useFonts({
      "dm-sans-medium": require("@/assets/fonts/DMSans-Medium.ttf"),
      "dm-sans-extrabold": require("@/assets/fonts/DMSans-ExtraBold.ttf"),
      "dm-sans-semibold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
      "dm-sans-regular": require("@/assets/fonts/DMSans-Regular.ttf"),
      "dm-sans-bold": require("@/assets/fonts/DMSans-Bold.ttf"),
  });

  const validateForm = () => {
      let e = {
          email: "",
          password: "",
          confirmPassword: "",
      };
      if (email === "") {
          e.email = "Email is required";
      }
      if (password === "") {
          e.password = "Password is required";
      }

      setErrors(e);
      return Object.values(e).every((x) => x === "");
    };

    const login = async () => {
        if (validateForm()) {
            isLoading(true);
            const res = await auth.signIn(email, password);
            if (res.ok) {
              router.replace("/Home");
            } else {
              const errorData = res.data;
              setErrors({
                email: errorData.email ? errorData.email[0] : "",
                password: errorData.password ? errorData.password[0] : "",
              });
              isLoading(false);
            }
            
        }
  };

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={{paddingHorizontal: 32}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textHeader}>Sign in</Text>
        <View style={styles.authContainer}>
          <TextInputPrimary
            label="Email"
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            errorText={errors.email}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            errorText={errors.password}
            password
          />
          <TouchableOpacity style={{ height: 48 }}>
            {/* <Text style={styles.forgetPasswordLink}>Forget password?</Text> */}
          </TouchableOpacity>

          
        </View>

        <View style={styles.footer}>
          <ButtonPrimary text="Sign in" press={login} />
          <Text style={styles.signUpLink}>
            <Link href="/SignUp">Sign up for new account</Link>
          </Text>
        </View>

        {/* <ButtonPrimary text="Sign in" press={login} />
        <Text style={styles.signUpLink}>
          <Link href="/SignUp">Sign up for new account</Link>
        </Text> */}
        {/* <Text style={styles.or}>Or</Text>
        <ButtonGoogle
          onPress={() => {
            console.log("google pressed");
          }}
        /> */}
      </SafeAreaView>
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
    fontFamily: "dm-sans-bold",
    fontSize: 32,
    marginTop: 100,
    marginBottom: 40,
  },
  forgetPasswordLink: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
    right: 0,
    position: "absolute",
    textDecorationLine: "underline",
  },
  signUpLink: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-semibold",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  or: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
    fontSize: 20,
    marginTop: 4,
    marginBottom: 20,
  },
  authContainer: {
    width: "100%",
    flexDirection: "column",
  },

  // for no google acc only
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 200,
  },
});