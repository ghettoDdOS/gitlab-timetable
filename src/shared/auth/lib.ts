import { User } from "oidc-client-ts";
import oidcConfig from "./config";
import { userStorage } from "./model";

const getUser = async () => {
  const userString = await userStorage.get(
    `user:${oidcConfig.authority}:${oidcConfig.client_id}`
  );

  if (!userString) return null;

  return User.fromStorageString(userString);
};

export { getUser };
