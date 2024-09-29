// This component is platform-specific.

import Dashboard from "@/components/shad/dashboard";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import React from "react";
import { useScrollRef } from "@/lib/tab-to-top";

export default function IndexRoute() {
  return <Dashboard  ref={useScrollRef()} {...extraProps} />;
}



const extraProps = {
  navigate: router.navigate,
  dom: {
    contentInsetAdjustmentBehavior: "automatic",
    automaticallyAdjustsScrollIndicatorInsets: true,
  },
} as const;
