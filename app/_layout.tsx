import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";
import { APIProvider } from "../source/api";




// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  return (
    <ThemeProvider value={DarkTheme}>
      <APIProvider>
      <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          {/* <Stack.Screen name="profile-info" options={{ headerShown: false }} />
          <Stack.Screen
            name="workout-history"
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </APIProvider>
       
    </ThemeProvider>
  );
}
