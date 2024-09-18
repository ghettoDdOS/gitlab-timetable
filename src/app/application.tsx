import type { FC } from "react";
import Providers from "./providers";
import { AuthGate, getUser } from "@/shared/auth";
import DefaultLayout from "@/widgets/default-layout";
import IndexPage from "@/pages/index-page";

const Application: FC = () => {
  getUser();
  return (
    <Providers>
      <AuthGate>
        <DefaultLayout>
          <IndexPage />
        </DefaultLayout>
      </AuthGate>
    </Providers>
  );
};

export { Application };
