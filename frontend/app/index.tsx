import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "./context/authContext";

export default function StartPage() {
  const auth = useAuth();
  if (!auth.authData) {
    return <Redirect href="/StartScreen" />;
  }
  return <Redirect href="/Home" />;
};