import {
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";

type AuthGateProps = PropsWithChildren<{
  loading?: ReactNode;
}>;

const AuthGate: FC<AuthGateProps> = ({ children, loading }) => {
  const auth = useAuth();
  const [hasTriedSignIn, setHasTriedSignIn] = useState(false);

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignIn
    ) {
      auth.signinRedirect();
      setHasTriedSignIn(true);
    }
  }, [auth, hasTriedSignIn]);

  if (auth.isLoading) {
    return loading;
  }

  // if (!auth.isAuthenticated) {
  //   throw auth.error ?? new Error("Failed to auth");
  // }

  return children;
};

export { AuthGate };
