// import React from 'react';

// const AuthContext = React.createContext<{
//     signIn: () => void;
//     signOut: () => void;
//     token?: string | null;
//     isLoading: boolean;
// }>({
// signIn: () => null,
// signOut: () => null,
// token: null,
// isLoading: false,
// });

// export function useAuth() {
//     const value = React.useContext(AuthContext);
//     if (process.env.NODE_ENV !== 'production') {
//       if (!value) {
//         throw new Error('useSession must be wrapped in a <SessionProvider />');
//       }
//     }
  
//     return value;
//   }

//   export function SAuthProvider(props: React.PropsWithChildren) {
//     const [[isLoading, session], setSession] = useStorageState('session');
  
//     return (
//       <AuthContext.Provider
//         value={{
//           signIn: () => {
//             // Perform sign-in logic here
//             setSession('xxx');
//           },
//           signOut: () => {
//             setSession(null);
//           },
//           session,
//           isLoading,
//         }}>
//         {props.children}
//       </AuthContext.Provider>
//     );
//   }