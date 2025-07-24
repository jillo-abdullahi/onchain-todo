import { Box, Container } from "@chakra-ui/react";
import { ColorModeToggle } from "./components/ColorModeToggle";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HeaderSection } from "./components/layout/HeaderSection";

export default function Page() {
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
        <RainbowKitProvider>
          <Container maxW="2xl" p={2}>
            <HeaderSection />
          </Container>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
