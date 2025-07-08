// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="IPPITSU — あなたの思考を、一筆で。" />
        <meta property="og:description" content="バグは近くで見ると悲劇だが、遠くから見れば喜劇である——。失敗もコンテンツにする、新たな供養の試み。" />
        <meta property="og:image" content="#" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="#" />
        <meta name="twitter:card" content="#" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}