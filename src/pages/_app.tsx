import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Layout } from "@components";
import GlobalStyle from "@styles/GlobalStyle";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <SessionProvider session={session}>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </RecoilRoot>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
