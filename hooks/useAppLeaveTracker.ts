
import { LastScreeUserLeaveAt } from "@/storage/globalStore";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { AppState } from "react-native";
import { useMMKVString } from "react-native-mmkv";

export function useAppLeaveTracker() {
  const pathname = usePathname();
  const [_, setLastScreen] = useMMKVString("last_screen", LastScreeUserLeaveAt);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background" || nextState === "inactive") {
        console.log("📱 App leaving — saving last screen:", pathname);
        setLastScreen(pathname);
      }
    });

    return () => sub.remove();
  }, [pathname, setLastScreen]);
}
