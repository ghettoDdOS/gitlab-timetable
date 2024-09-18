import { type FC, type PropsWithChildren } from "react";
import { AuthProvider as BaseAuthProvider } from "react-oidc-context";
import oidcConfig from "../config";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const handleSignIn = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <BaseAuthProvider {...oidcConfig} onSigninCallback={handleSignIn}>
      {children}
    </BaseAuthProvider>
  );
};

export { AuthProvider };
