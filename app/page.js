import HeroSection from "@/components/Homepage/HeroSection";
import ProductsList from "../components/products/ProductsList";
import { getProducts } from "./action";

export default async function Home({ searchParams }) {
  const { products, nextPageLink, prevPageLink } = await getProducts(
    searchParams
  );

  return (
    <main>
      <HeroSection></HeroSection>
      {products && (
        <ProductsList
          data={products}
          nextPageLink={"nextPageLink"}
          prevPageLink={"prevPageLink"}
        ></ProductsList>
      )}
    </main>
  );
}
