interface ImportMetaEnv {
  // Can safely be used client-side
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;

  // Keep secret, do not use client-side! Server-side ONLY!
  readonly VITE_FIREBASE_ADMIN_CLIENT_EMAIL: string;
  readonly VITE_FIREBASE_ADMIN_PRIVATE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}