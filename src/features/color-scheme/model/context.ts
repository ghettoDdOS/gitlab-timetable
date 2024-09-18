import { useContext, createContext } from "react";

type ColorScheme = "dark" | "light" | "system";

type ColorSchemeContextValue = {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

const initialState: ColorSchemeContextValue = {
  colorScheme: "system",
  setColorScheme: () => null,
};

const ColorSchemeContext = createContext<ColorSchemeContextValue>(initialState);

const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export { ColorSchemeContext, useColorScheme };
export type { ColorScheme };
