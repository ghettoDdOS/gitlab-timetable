import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { ColorSchemeContext, type ColorScheme } from "./context";

type ColorSchemeProviderProps = PropsWithChildren<{
  defaultColorScheme?: ColorScheme;
  storageKey?: string;
}>;

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
  children,
  defaultColorScheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    () =>
      (localStorage.getItem(storageKey) as ColorScheme) || defaultColorScheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (colorScheme === "system") {
      const systemColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";

      root.classList.add(systemColorScheme);
      return;
    }

    root.classList.add(colorScheme);
  }, [colorScheme]);

  const value = {
    colorScheme,
    setColorScheme: (colorScheme: ColorScheme) => {
      localStorage.setItem(storageKey, colorScheme);
      setColorScheme(colorScheme);
    },
  };

  return (
    <ColorSchemeContext.Provider {...props} value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export { ColorSchemeProvider };
