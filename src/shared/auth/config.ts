import type { UserManagerSettings } from "oidc-client-ts";
import { userStorage } from "./model";
import config from "../config";

const oidcConfig: UserManagerSettings = {
  authority: config.VITE_API_URL,
  client_id: config.VITE_CLIENT_ID,
  client_secret: config.VITE_CLIENT_SECRET,
  redirect_uri: window.location.origin,
  userStore: userStorage,
  loadUserInfo: true,
  scope: "openid read_api",
};

export default oidcConfig;
