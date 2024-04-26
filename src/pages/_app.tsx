import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import { DefaultSeo } from "next-seo";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(/x/, router)
  return (

    <>
      <DefaultSeo
        title="Bank Neo Commerce"
        description="Best bank ever"
        canonical="https://example.com"
        openGraph={{
          url: "https://example.com",
          title: "Bank Neo Commerce",
          description: "Best bank ever",
          images: [
            {
              url: "https://example.com/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Og Image Alt",
            },
          ],
          site_name: "Bank Neo Commerce",
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
