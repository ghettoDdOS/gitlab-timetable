import { ColorSchemeProvider } from "@/features/color-scheme";
import { AuthProvider } from "@/shared/auth";
import type { FC, PropsWithChildren } from "react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <ColorSchemeProvider>{children}</ColorSchemeProvider>
    </AuthProvider>
  );
};

export default Providers;
