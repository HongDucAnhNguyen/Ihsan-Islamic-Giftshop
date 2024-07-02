export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import { Product } from "@/lib/models/Product";
import User from "@/lib/models/User";
export const PUT = async (req, context) => {
  try {
    await dbConnect();
    const { params } = context;
    const { productId } = params;

    const userId = await req.json();

    let reviewsData = [];

    const productDetailsRetrieved = await Product.findById(productId);
    for (const review of productDetailsRetrieved.reviews) {
      const userFound = await User.findById(review.author);

      const isUserReviewAuthor = userId == userFound._id.toString();

      const reviewAuthorData = {
        avatar: userFound.avatar,
        name: userFound.name,
      };
      const reviewData = {
        ...review.toObject(),
        user: reviewAuthorData,
        canManage: isUserReviewAuthor,
      };
      reviewsData.push(reviewData);
    }

    const productDetails = {
      ...productDetailsRetrieved.toObject(),
      reviews: reviewsData,
    };

    return Response.json(productDetails);
  } catch (error) {
    return Response.json(error);
  }
};
