export const dynamic = "force-dynamic";
import NewReview from "@/components/product-reviews/NewReview";
import BreadCrumbs from "@/components/shared-components/BreadCrumbs";
import React from "react";
const page = ({ params }) => {
  const { productId } = params;
  const breadCrumbs = [
    { name: "Home", url: "/" },
    {
      name: "Back to Product",
      url: `/product/${productId}`,
    },
    {
      name: "Write Review",
      url: `/reviews/new/${productId}`,
    },
  ];
  return (
    <main className="w-full">
      <BreadCrumbs breadCrumbs={breadCrumbs}></BreadCrumbs>

      <div className="flex items-align justify-center">
        <section className="mt-40 mb-40">
          <NewReview productId={productId}></NewReview>
        </section>
      </div>
    </main>
  );
};

export default page;
