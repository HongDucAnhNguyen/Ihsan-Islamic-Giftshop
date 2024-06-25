export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import { Product } from "@/lib/models/Product";
import User from "@/lib/models/User";
export const GET = async (req, context) => {
  try {
    await dbConnect();
    const { params } = context;
    const { productId } = params;
    let reviewsData = [];

    const productDetailsRetrieved = await Product.findById(productId);
    for (const review of productDetailsRetrieved.reviews) {
      const userFound = await User.findById(review.author);
      const reviewAuthorData = {
        avatar: userFound.avatar,
        name: userFound.name,
      };
      const reviewData = {
        ...review.toObject(),
        user: reviewAuthorData,
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
