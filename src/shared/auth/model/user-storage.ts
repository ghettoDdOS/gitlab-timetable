import { WebStorageStateStore } from "oidc-client-ts";

const userStorage = new WebStorageStateStore({
  store: window.localStorage,
});

export { userStorage };
