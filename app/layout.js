import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/utilities/Navbar";
import CartContextProvider from "./cartcontext-provider";
import AuthContextProvider from "./authcontext-provider";
import AddressContextProvider from "./addresscontext-provider";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ihsan Islamic Giftshop",
  description: "Powered by @thetechnorthman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer/>
        <AuthContextProvider>
          {" "}
          <CartContextProvider>
            <AddressContextProvider>
              {" "}
              <Navbar></Navbar>
              {children}
            </AddressContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
