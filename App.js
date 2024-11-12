import { SQLiteProvider } from "expo-sqlite";
import { init } from "./database/db";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainNavigation from "./navigation/MainNavigation";

export default function App() {
  return (
    <SQLiteProvider databaseName="test9.db" onInit={init}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MainNavigation />
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
