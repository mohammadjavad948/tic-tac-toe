import React from "react";
import {Provider as PaperProvider } from "react-native-paper";
import { AskName } from "./AskName";

export default function App() {

  return (
    <PaperProvider>
      <AskName />
    </PaperProvider>
  );
}
