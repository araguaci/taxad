import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>Plunct plact zum, acabei de taxar mais um!</title>
          <meta
            property="og:image"
            content="https://taxad.vercel.app/help.svg"
          />
          <meta name="twitter:card" content="summary" />
          <meta property="twitter:title" content="Plunct plact zum, acabei de taxar mais um!" />
          <meta property="og:title" content="Plunct plact zum, acabei de taxar mais um!" />
          <meta
            property="og:description"
            content="Brasil caminha para ser o país com os maiores impostos do mundo..."
          />
          <meta property="og:site_name" content="taxad.vercel.app" />
          <meta
            property="twitter:description"
            content="Brasil caminha para ser o país com os maiores impostos do mundo..."
          />
          <meta
            property="twitter:image"
            content="https://taxad.vercel.app/help.svg"
          />
          <meta
            property="og:image"
            content="https://taxad.vercel.app/help.svg"
          />
          <meta
            property="twitter:url"
            content="https://taxad.vercel.app/"
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
