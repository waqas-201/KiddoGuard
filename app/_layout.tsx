import { MyTheme } from "@/theme";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {



  return (
    <PaperProvider theme={MyTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="parentflow" />
      </Stack>
    </PaperProvider>
  );
}
