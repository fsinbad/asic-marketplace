import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import cartContext from "@/contexts/cart-context";
import useCartState from "@/hooks/use-cart";
import "@/styles/globals.css";

//##############################################################################

function App({ Component, pageProps }) {
  const cart = useCartState();

  return (
    <cartContext.Provider value={cart}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </cartContext.Provider>
  );
}

export default App;
