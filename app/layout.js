import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/utilities/Navbar";
import CartContextProvider from "./cartcontext-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ihsan Islamic Giftshop",
  description: "Powered by @thetechnorthman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartContextProvider>
          {" "}
          <Navbar></Navbar>
          {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
