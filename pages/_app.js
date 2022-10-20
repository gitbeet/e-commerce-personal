import Layout from "../components/Layout";
import AuthProvider from "../context/AuthContext";
import ModalProvider from "../context/ModalContext";
import ProductDataProvider from "../context/ProductDataContext";
import ShoppingCartProvider from "../context/ShoppingCartContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
    <AuthProvider>
      <ProductDataProvider>
        <ShoppingCartProvider>
          <ModalProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
        </ShoppingCartProvider>
      </ProductDataProvider>
    </AuthProvider>
    // </Provider>
  );
}

export default MyApp;
