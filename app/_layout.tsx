import { DarkTheme,  ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";
import { APIProvider } from "../source/api";
import { hydrateAuth } from "../source/store/auth.store";
import { Toaster } from "../components/ui/toaster";




// SplashScreen.preventAutoHideAsync();
hydrateAuth();


export default function RootLayout() {

  const theme = process.env.EXPO_OS === "web" ? DarkTheme : DefaultTheme


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
        <Toaster />
      </APIProvider>
       
    </ThemeProvider>
  );
}
