import dbConnect from "@/backend/config/ConnectDB";
import { getProducts } from "@/backend/controllers/productControllers";
import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "@/components/products/ProductsList";

dbConnect();

export default async function Home() {
  const allProducts = await getProducts();
  return (
    <main>
      <HeroSection></HeroSection>
      <ProductsList data={allProducts}></ProductsList>
    </main>
  );
}
