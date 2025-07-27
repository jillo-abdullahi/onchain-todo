import { Box, Container } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HeaderSection } from "./components/layout/HeaderSection";
import { useTheme } from "next-themes";
import { CreateTodoInput } from "./components/CreateTodoInput";

export default function Page() {
  const { theme } = useTheme();

  const config = getDefaultConfig({
    appName: import.meta.env.VITE_WALLECT_CONNECT_APP_NAME,
    projectId: import.meta.env.VITE_WALLECT_CONNECT_PROJECT_ID,
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${
          import.meta.env.VITE_ALCHEMY_API_KEY
        }`
      ),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={theme === "light" ? lightTheme() : darkTheme()}
        >
          <Box
            w={"100%"}
            minH={"100vh"}
            backgroundImage={{
              base: `url('/static/bg-mobile-${theme}.jpg')`,
              md: `url('/static/bg-desktop-${theme}.jpg')`,
            }}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"contain"}
            backgroundPosition={"top"}
          >
            <Container maxW={"3xl"} p={2}>
              <HeaderSection />
              <CreateTodoInput mt={12} />
            </Container>
          </Box>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
