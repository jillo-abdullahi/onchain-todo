import { EmptyState } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuInbox } from "react-icons/lu";

export const TodoEmptyState = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <EmptyState.Root>
      <EmptyState.Content gap={1}>
        <EmptyState.Indicator>
          <LuInbox size={48} color={isDarkTheme ? "#C8CBE7" : "#393A4B"} />
        </EmptyState.Indicator>
        <EmptyState.Title>No Todos Available</EmptyState.Title>
        <EmptyState.Description>
          Start by creating a todo item
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
