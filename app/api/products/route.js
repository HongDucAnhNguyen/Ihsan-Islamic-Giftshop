export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import { Product } from "@/backend/models/Product";
import { getPaginationUrl } from "@/backend/helpers/getPaginationUrl";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    let currentPage = 1;

    if (
      isNaN(searchParams.get("page")) == false &&
      parseInt(searchParams.get("page")) > 0
    ) {
      currentPage = parseInt(searchParams.get("page"));
    }

    const categoryQuery = searchParams.get("category");
    const ratingsQuery = searchParams.get("ratings");

    const skipHowMany = 3 * (currentPage - 1);
    const filters =
      categoryQuery && ratingsQuery
        ? {
            category: categoryQuery,
            ratings: ratingsQuery,
          }
        : categoryQuery
        ? {
            category: categoryQuery,
          }
        : ratingsQuery
        ? {
            ratings: { $gte: ratingsQuery },
          }
        : {};
    const allProducts = await Product.find(filters).skip(skipHowMany).limit(3);

    const totalItems = await Product.find(filters).countDocuments();

    const maxPages = Math.ceil(totalItems / 3);

    console.log(
      "the max pages is",
      maxPages,
      "and the total items is",
      totalItems
    );

    if (totalItems > 1) {
      const { nextPageLink, prevPageLink } = getPaginationUrl(
        currentPage,
        maxPages,
        categoryQuery,
        ratingsQuery,
        null
      );

      return Response.json({
        products: allProducts,
        nextPageLink: nextPageLink,
        prevPageLink: prevPageLink,
      });
    }

    const nextPagePath =
      categoryQuery && ratingsQuery
        ? `?category=${categoryQuery}&ratings=${ratingsQuery}&page=1`
        : categoryQuery
        ? `?category=${categoryQuery}&page=1`
        : ratingsQuery
        ? `?ratingsQuery${ratingsQuery}&page=1`
        : "?page=1";
    const prevPagePath = nextPagePath;

    return Response.json({
      products: allProducts,
      nextPageLink: nextPagePath,
      prevPageLink: prevPagePath,
    });
  } catch (error) {
    return Response.json(error);
  }
}

export const POST = async (req) => {
  try {
    const data = await req.json();
    const newProduct = await Product.create(data);
    return Response.json(newProduct);
  } catch (error) {
    return Response.json(error);
  }
};
