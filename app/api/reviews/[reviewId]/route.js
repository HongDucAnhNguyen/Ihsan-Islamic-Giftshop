import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import { Product } from "@/lib/models/Product";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export const PUT = async (req, { params }) => {
  try {
    const updateData = await req.json();
    const { reviewId } = params;
    const { searchParams } = new URL(req.url);
    const { userId } = await getAccountSessionData();

    const productId = searchParams.get("productId");

    const productFound = await Product.findById(productId);

    if (!productFound) {
      throw new Error("Product not found");
    }

    const reviewFound = productFound?.reviews.find(
      (review) => review._id.toString() == reviewId
    );

    if (!reviewFound) {
      throw new Error("Review not found");
    }

    const isUserReviewAuthor = userId === reviewFound.author.toString();

    if (!isUserReviewAuthor) {
      throw new Error("Unauthorized action");
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, "reviews._id": reviewId },
      {
        $set: {
          "reviews.$.rating": updateData.rating,
          "reviews.$.comment": updateData.comment,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error("Product or Review not found");
    }

    // Recalculate the average rating
    const totalRatings = updatedProduct.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = (
      totalRatings / updatedProduct.reviews.length
    ).toFixed(1);
    updatedProduct.ratings = averageRating;

    // Save the updated product with the new average rating
    await updatedProduct.save();

    revalidatePath(`/product/${productId}`);
    revalidatePath(`/reviews/${reviewId}?productId=${productId}`);
    revalidatePath("/");
    return Response.json({
      reviewUpdated: true,
      message: "Updated review successfully",
    });
  } catch (error) {
    return Response.json(error);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { reviewId } = params;
    const { searchParams } = new URL(req.url);
    const { userId } = await getAccountSessionData();

    const productId = searchParams.get("productId");
    // Find the product and the specific review, a different way to find a review without using find()
    const productFound = await Product.findOne({
      _id: productId,
      "reviews._id": reviewId,
    });

    if (!productFound) {
      throw new Error("Product or Review not found");
    }

    // Find the review to check the author
    const review = productFound.reviews.id(reviewId);
    if (!review) {
      throw new Error("Review not found");
    }

    const isUserReviewAuthor = userId === review.author.toString();

    if (!isUserReviewAuthor) {
      throw new Error("Unauthorized action");
    }

    await Product.findByIdAndUpdate(
      productId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );

    // Recalculate the average rating
    const totalRatings = productFound.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = (totalRatings / productFound.reviews.length).toFixed(
      1
    );
    productFound.ratings = averageRating;

    // Save the updated product with the new average rating
    await productFound.save();
    revalidatePath(`/product/${productId}`);
    revalidatePath("/");

    return Response.json({
      reviewDeleted: true,
      message: "Deleted review successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
};

export const GET = async (req, { params }) => {
  try {
    const { reviewId } = params;
    const { searchParams } = new URL(req.url);

    const productId = searchParams.get("productId");

    const productFound = await Product.findById(productId);

    const reviewFound = productFound?.reviews.find(
      (review) => review._id == reviewId
    );

    return Response.json(reviewFound);
  } catch (error) {}
};
