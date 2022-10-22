import Layout from "../components/Layout";
import AuthProvider from "../context/AuthContext";
import ModalProvider from "../context/ModalContext";
import ProductDataProvider from "../context/ProductDataContext";
import ShoppingCartProvider from "../context/ShoppingCartContext";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default MyApp;
