// import React, { useEffect, useState } from 'react';
// import { useRootNavigation, useRouter, useSegments } from 'expo-router';

// // const AuthContext = React.createContext<{
// //     signIn: () => void;
// //     signOut: () => void;
// //     token?: string | null;
// //     isLoading: boolean;
// // }>({
// // signIn: () => null,
// // signOut: () => null,
// // token: null,
// // isLoading: false,
// // });

// // export function useAuth() {
// //     const value = React.useContext(AuthContext);
// //     if (process.env.NODE_ENV !== 'production') {
// //       if (!value) {
// //         throw new Error('useSession must be wrapped in a <SessionProvider />');
// //       }
// //     }
  
// //     return value;
// //   }

// //   export function SAuthProvider(props: React.PropsWithChildren) {
// //     const [[isLoading, session], setSession] = useStorageState('session');
  
// //     return (
// //       <AuthContext.Provider
// //         value={{
// //           signIn: () => {
// //             // Perform sign-in logic here
// //             setSession('xxx');
// //           },
// //           signOut: () => {
// //             setSession(null);
// //           },
// //           session,
// //           isLoading,
// //         }}>
// //         {props.children}
// //       </AuthContext.Provider>
// //     );
// //   }

// export type UserData = {
//     token: string;
//     email: string;
//     name: string;
// };

// interface SignInResponse {
//     data: UserData | undefined;
//     error: Error | undefined;
// }

// interface SignOutResponse {
//     data: {} | undefined;
//     error: Error | undefined;
// }

// interface AuthContextData {
//     userData: UserData | null;
//     // isLoading: boolean;
//     authInitialized: boolean;
//     signIn: (email: string, password: string) => Promise<SignInResponse>;
//     signOut: () => Promise<SignOutResponse>;
// }

// interface AuthProviderProps {
//     children: React.ReactNode;
// }

// // const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);
// const AuthContext = React.createContext<AuthContextData | undefined>(undefined);

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = React.useState<UserData | null>(null);
//   const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);

//   const useProtectedRoute = (user: UserData | null) => {
//     const segment = useSegments();
//     const router = useRouter();

//     const [isNavigationReady, setIsNavigationReady] = useState(false);
//     const rootNavigation = useRootNavigation();

//     useEffect(() => {
//       const unsubscribe = rootNavigation.addListener('state', (event) => {
//         setIsNavigationReady(true);
//       });

//       return function cleanup() {
//         if (unsubscribe) {
//           unsubscribe();
//         }
//       };
//     }, [rootNavigation]);

//     useEffect(() => {
//       if (!isNavigationReady) {
//         return;
//       }

//       const inAuthGroup = segment[0] === '(auth)';
//       if (!user && inAuthGroup) {
//         router.push('/sign-in');
//       } else if (user && inAuthGroup) {
//         router.push('/');
//       }
//     }, [user, segment, authInitialized, isNavigationReady]);
//   };

//   useEffect(() => {
//     async () => {
//       try {
//         const userData = await AsyncStorage.getItem('@UserData');
//         if (userData) {
//           setUser(JSON.parse(userData));
//         }
//       } catch (error) {
//         console.error("error: ", error);
//         setUser(null);
//       }

//       setAuthInitialized(true);
//       console.log("authInitialized: ", user);
//     }
//   }, []);

// }