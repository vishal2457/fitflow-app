import "@/global.css";

import { DOMRouterProvider } from "@/lib/router-with-dom";
import React from "react";

import { IS_DOM } from "expo/dom";
import { ScrollView } from "react-native";
import { StyleNoSelect } from "../NoSelect";

export function ShadLayoutFull({
  navigate,
  children,
  select,
}: {
  navigate: typeof import("expo-router").router["navigate"];
  children: React.ReactNode;
  select?: boolean;
}) {
  return (
    <>
      {!select && <StyleNoSelect />}
      <DOMRouterProvider value={{ navigate }}>
        {children}
      </DOMRouterProvider>
    </>
  );
}

export default function ShadLayout({
  navigate,
  children,
  select,
}: {
  navigate: typeof import("expo-router").router["navigate"];
  children: React.ReactNode;
  select?: boolean;
}) {
  if (process.env.EXPO_OS === "web" && !IS_DOM) {
    // In standard web, use a partial layout since the shared elements are in the Layout Route.
    return <ScrollView>{children}</ScrollView>;
  }

  return (
    <ShadLayoutFull select={select} navigate={navigate} children={children} />
  );
}
