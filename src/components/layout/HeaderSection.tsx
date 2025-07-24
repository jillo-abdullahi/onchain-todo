import { Box, Heading, Flex, HStack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ColorModeToggle } from "../ColorModeToggle";

/**
 * Header component for the application layout.
 *
 * Renders a styled header bar with the application title.
 * You can extend this component to include navigation links or user information.
 *
 * @returns {JSX.Element} The header element.
 */
export const HeaderSection: React.FC = () => (
  <Box
    as="header"
    width="100%"
    px={8}
    py={4}
    bg="gray.900"
    color="white"
    boxShadow="md"
  >
    <Flex align="center" justify="space-between">
      <Heading as="h1" size="lg" m={0}>
        Onchain Todo
      </Heading>
      <HStack gap={3}>
        <ConnectButton />
        {/* Color mode toggle button */}
        <ColorModeToggle />
      </HStack>
      {/* Add navigation or user info here if needed */}
    </Flex>
  </Box>
);
