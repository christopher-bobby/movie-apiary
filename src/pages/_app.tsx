import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <LanguageProvider>
      <Header />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
