import { SQLiteProvider } from "expo-sqlite";
import { init } from "./database/db";

import MainNavigation from "./navigation/MainNavigation";

export default function App() {
  return (
    <SQLiteProvider databaseName="test5.db" onInit={init}>
      <MainNavigation />
    </SQLiteProvider>
  );
}
