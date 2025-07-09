import '../styles/globals.css'
import 'react-notion-x/src/styles.css' // ← 追加
import 'prismjs/themes/prism.css' // ← 任意：コードブロック見やすくなる

import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default MyApp