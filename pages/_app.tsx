import Layout from "../components/Layout";
import AuthProvider from "../context/AuthContext";
import ModalProvider from "../context/ModalContext";
import ProductDataProvider from "../context/ProductDataContext";
import ShoppingCartProvider from "../context/ShoppingCartContext";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";

export const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
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
};

export default MyApp;
