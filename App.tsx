import * as React from "react";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import Main from "./Main";

export default function App() {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}

AppRegistry.registerComponent("App", () => Main);
