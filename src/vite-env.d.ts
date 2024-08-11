/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string,
  readonly VITE_SUPABASE_URL: string,
  readonly VITE_SUPABASE_ANON_KEY: string,
  readonly VITE_KAKAO_JS_SDK_KEY: string,
  readonly VITE_GOOGLE_ID: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}