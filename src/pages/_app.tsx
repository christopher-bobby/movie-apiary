import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import { DefaultSeo } from "next-seo";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <DefaultSeo
        title="Movie List"
        description="Best movies ever"
        canonical="https://example.com"
        openGraph={{
          url: "https://example.com",
          title: "Mobie List",
          description: "Best movies ever",
          images: [
            {
              url: "https://example.com/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Image Alt",
            },
          ],
          site_name: "Movie List",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone="Asia/Jakarta"
      >
        <Header />
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </>
  );
}
