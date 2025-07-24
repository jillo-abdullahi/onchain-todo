import { IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <IconButton
      aria-label="toggle color mode"
      onClick={toggleColorMode}
      variant={"ghost"}
      size="md"
      bg={"transparent"}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
}
