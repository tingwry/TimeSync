import { Redirect } from "expo-router";
import { AuthProvider, useAuth } from "./context/authContext";

const StartPage = () => {
  const authData = useAuth();
  return (
    // <AuthProvider>
    //   {authData ? (
    //     <Redirect href="/Home" />
    //   ) : (
    //     <Redirect href="/signInScreen" />
    //   )}
    // </AuthProvider>
    <Redirect href="/Home" />

  );
    
};

export default StartPage;
