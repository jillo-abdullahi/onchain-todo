import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    colorPalette={"gray"}
                    variant={"solid"}
                    alignContent={"center"}
                    borderRadius={"md"}
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    colorPalette={"red"}
                    variant={"solid"}
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    colorPalette={"gray"}
                    variant={"solid"}
                    onClick={openAccountModal}
                    type="button"
                    borderRadius={"md"}
                    alignContent={"center"}
                  >
                    {chain.hasIcon && (
                      <Box
                        marginRight={1}
                        background={chain.iconBackground}
                        w={4}
                        h={4}
                        borderRadius={"50%"}
                        overflow={"hidden"}
                        alignContent={"center"}
                      >
                        {chain.iconUrl && (
                          <Image
                            w={4}
                            h={4}
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                          />
                        )}
                      </Box>
                    )}

                    <HStack alignItems={"center"} fontSize={16} pt={0.5}>
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </HStack>
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
