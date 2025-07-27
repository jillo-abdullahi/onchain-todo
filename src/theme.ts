import { createSystem, defaultConfig, defineConfig, defaultSystem } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      ...defaultSystem.tokens,
      fonts: {
        body: { value: "'Josefin Sans Variable', system-ui, sans-serif" },
        heading: { value: "'Josefin Sans Variable', system-ui, sans-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);