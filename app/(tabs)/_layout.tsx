import { DarkTheme } from "@react-navigation/native";
import { Redirect, SplashScreen, Tabs } from "expo-router";
import { House, LineChart, User } from "lucide-react-native";
import React, { useCallback, useEffect } from "react";

export default function TabLayout() {
  // const status = useAuth.use.status();
  // const user = useAuth.use.user();
  // const hideSplash = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, []);

  // useEffect(() => {
  //   if (status !== "idle") {
  //     setTimeout(() => {
  //       hideSplash();
  //     }, 1000);
  //   }
  // }, [hideSplash, status]);

  // if (status === "signOut") {
  //   return <Redirect href="/login" />;
  // }

  // if (!user?.age || !user?.weight || !user?.height) {
  //   return <Redirect href="/profile-info" />;
  // }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1d4ed8",
        headerShown: false,
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: 'white',
          tabBarIcon: (props) => <House {...props} color={props.focused ? 'white' : props.color} />,
        }}
      />
        <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarActiveTintColor: 'white',

          tabBarIcon: (props) => <LineChart {...props} color={props.focused ? 'white' : props.color} />,
        }}
      />
         <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarActiveTintColor: 'white',

          tabBarIcon: (props) => <User {...props} color={props.focused ? 'white' : props.color} />,
        }}
      />
    </Tabs>
  );
}
