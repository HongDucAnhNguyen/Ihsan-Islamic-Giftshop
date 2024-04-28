import { getProducts } from "../backend/controllers/ProductControllers";

import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";
import dbConnect from "@/backend/config/ConnectDB";

dbConnect();

export default async function Home(req) {
  const allProducts = await getProducts(req);
  return (
    <main>
      <HeroSection></HeroSection>
      <ProductsList data={allProducts}></ProductsList>
    </main>
  );
}
