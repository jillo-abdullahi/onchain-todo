import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/josefin-sans";
import App from "./App";
import { system } from "./theme";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={system} >
      <ThemeProvider attribute="class">
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
