import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import cartContext from "@/contexts/cart-context";
import useCartState from "@/hooks/use-cart";
import "@/styles/globals.css";

//##############################################################################

function App({ Component, pageProps }) {
  const cart = useCartState();

  return (
    <cartContext.Provider value={cart}>
      <Header />
      {/* Google tag (gtag.js) */}
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-5EJERYVJV5"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-5EJERYVJV5');`}
      </Script>
      <Component {...pageProps} />
      <Analytics />
      <Footer />
    </cartContext.Provider>
  );
}

export default App;
