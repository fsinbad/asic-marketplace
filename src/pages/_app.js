import { CartContext, useCartState } from "@/hooks/use-cart";
import Nav from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const cart = useCartState();
  return (
    <CartContext.Provider value={cart}>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </CartContext.Provider>
  );
}
