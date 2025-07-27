import { Heading, Flex, HStack } from "@chakra-ui/react";
import { ColorModeToggle } from "../ColorModeToggle";
import { CustomConnectButton } from "../ConnectButton";

/**
 * Header component for the application layout.
 *
 * Renders a styled header bar with the application title.
 * @returns {JSX.Element} The header element.
 */
export const HeaderSection: React.FC = () => (
  <Flex align="center" justify="space-between" pt={16}>
    <Heading
      as="h1"
      size="lg"
      m={0}
      fontWeight={"bold"}
      letterSpacing={"10px"}
      textTransform={"uppercase"}
    >
      Onchain Todo
    </Heading>
    <HStack gap={3} alignContent={"center"}>
      <CustomConnectButton />
      {/* RainbowKit Connect Button */}
      {/* Color mode toggle button */}
      <ColorModeToggle />
    </HStack>
    {/* Add navigation or user info here if needed */}
  </Flex>
);
