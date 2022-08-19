import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="h-screen bg-slate-900 dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
