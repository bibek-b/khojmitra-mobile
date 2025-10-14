import { ThemeContextType } from "@/types/common";
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    if (colorScheme) {
      setIsDarkMode(colorScheme === "dark");
    }
  }, [colorScheme]);

  if (isDarkMode === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
