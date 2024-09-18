import { ColorSchemeToggle } from "@/features/color-scheme";
import type { FC, PropsWithChildren } from "react";

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <ColorSchemeToggle />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DefaultLayout;
