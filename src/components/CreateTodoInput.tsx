import { Box, BoxProps, Input, InputGroup, Kbd, Text } from "@chakra-ui/react";
import { LuUser, LuCircle } from "react-icons/lu";
import { useTheme } from "next-themes";

export const CreateTodoInput = ({ ...props }: BoxProps) => {
  const { theme } = useTheme();
  return (
    <InputGroup
      startElement={
        <Box flexShrink={0} display={"flex"} alignItems={"center"}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              paddingRight: 12,
              paddingLeft: 8,
            }}
          >
            <circle cx="12" cy="12" r="11.5" stroke="#393A4B" />
          </svg>
        </Box>
      }
      endElement={
        <Kbd variant={"raised"} marginRight={4}>
          Enter
        </Kbd>
      }
      {...props}
    >
      <Input
        id="create-todo-input"
        p={8}
        outline={"none"}
        border={"none"}
        fontSize={20}
        display={"flex"}
        alignItems={"center"}
        color={theme === "light" ? "#393A4B" : "#C8CBE7"}
        placeholder="Create a new todo..."
        colorPalette={"gray"}
        variant={"subtle"}
        boxShadow={"0px 35px 50px -15px rgba(0, 0, 0, 0.5)"}
        borderRadius={"lg"}
        caretColor="#3A7CFD"
      />
    </InputGroup>
  );
};
