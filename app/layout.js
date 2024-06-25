import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared-components/Navbar";
import CartContextProvider from "../lib/context/cartcontext-provider";
import AuthContextProvider from "../lib/context/authcontext-provider";
import AddressContextProvider from "../lib/context/addresscontext-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/shared-components/Footer";
import ReviewContextProvider from "@/lib/context/reviewscontext-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ihsan Islamic Giftshop",
  description: "Powered by @thetechnorthman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {" "}
          <CartContextProvider>
            <AddressContextProvider>
              <ReviewContextProvider>
                {" "}
                <Navbar></Navbar>
                {children}
                <Footer></Footer>
                <ToastContainer></ToastContainer>
              </ReviewContextProvider>
            </AddressContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
