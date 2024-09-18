/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROOT_ELEMENT_ID: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
