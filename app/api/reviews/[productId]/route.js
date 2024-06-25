export const dynamic = "force-dynamic";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import User from "@/lib/models/User";
import { Product } from "@/lib/models/Product";
import { revalidatePath } from "next/cache";
export const POST = async (req, { params }) => {
  try {
    const { productId } = params;
    const { userId } = await getAccountSessionData();

    const userFound = await User.findById(userId);
    if (!userFound) {
      return Response.json(
        {
          message:
            "Unauthorized action, you need to be logged in to post a product review",
        },
        { status: 401 }
      );
    }

    const productFound = await Product.findById(productId).lean().exec();

    if (!productFound) {
      return Response.json(
        {
          message: "no product was found with this id",
        },
        { status: 404 }
      );
    }

    const newReviewData = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { reviews: { ...newReviewData, author: userId } },
      },

      { new: true }
    );

    if (!updatedProduct) {
      return Response.json(
        {
          message: "something went wrong while posting your review",
        },
        { status: 500 }
      );
    }
    // Calculate the new average rating
    const totalReviews = updatedProduct.reviews.length;
    const sumRatings = updatedProduct.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const newAverageRating =
      totalReviews > 0 ? (sumRatings / totalReviews).toFixed(1) : 0;

    await Product.findByIdAndUpdate(
      productId,
      { $set: { ratings: newAverageRating } },
      { new: true }
    );

    revalidatePath(`/product/${productId}`);
    revalidatePath("/");
    return Response.json({
      reviewPosted: true,
      message: "Your review was successfully posted",
    });
  } catch (error) {
    console.log(error.message);
    return Response.json(
      {
        message: "something went wrong while posting your review",
      },
      { status: 500 }
    );
  }
};
