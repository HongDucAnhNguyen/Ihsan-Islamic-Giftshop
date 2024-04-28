import { getProducts } from "../backend/controllers/ProductControllers";

import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";


export default async function Home(req) {
  const allProducts = await getProducts(req);

  return (
    <main>
      <HeroSection></HeroSection>
      {allProducts ? (
        <ProductsList data={allProducts}></ProductsList>
      ) : (
        <h1>There is no data</h1>
      )}
    </main>
  );
}
