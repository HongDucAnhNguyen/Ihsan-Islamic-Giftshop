import UpdateReview from "@/components/product-reviews/UpdateReview";
import BreadCrumbs from "@/components/shared-components/BreadCrumbs";

export const dynamic = "force-dynamic";

const getReview = async (reviewId, productId) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/reviews/${reviewId}?productId=${productId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params, searchParams }) => {
  const { reviewId } = params;
  const { productId } = searchParams;
  const breadCrumbs = [
    { name: "Home", url: "/" },
    {
      name: "Back to Product",
      url: `/product/${productId}`,
    },
    {
      name: "Update Review",
      url: `/reviews/${reviewId}`,
    },
  ];
  const reviewRetrieved = await getReview(reviewId, productId);
  return (
    <main className="w-full">
      <BreadCrumbs breadCrumbs={breadCrumbs}></BreadCrumbs>

      <div className="flex items-align justify-center">
        <section className="mt-40 mb-40">
          <UpdateReview
            productId={productId}
            review={reviewRetrieved}
          ></UpdateReview>
        </section>
      </div>
    </main>
  );
};

export default page;
