import React from "react";
import { useFonts as OswaldFont, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as LatoFont, Lato_400Regular } from '@expo-google-fonts/lato';
import { AppThemeContextProvider } from "./src/services/common/theme.context";
import { Index } from "./src/features/common/screens/index.screens";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArsU76qtBJjgJ-GZXTQ9Bc5amkeHYx4Vw",
  authDomain: "toxs-110d5.firebaseapp.com",
  projectId: "toxs-110d5",
  storageBucket: "toxs-110d5.appspot.com",
  messagingSenderId: "880326269749",
  appId: "1:880326269749:web:9ae25f529b4c22bd9e0a7c",
  measurementId: "G-B1QTDC9JPC"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default function App() {


  const [OswaldLoaded] = OswaldFont({
    Oswald_400Regular
  });
  const [LatoLoaded] = LatoFont({
    Lato_400Regular
  });
  if (!OswaldLoaded || !LatoLoaded) {
    return null;
  }

  return (
    <>
      <AuthenticationContextProvider>
        <AppThemeContextProvider>
          <Index />
        </AppThemeContextProvider>
      </AuthenticationContextProvider>
    </>
  );
}