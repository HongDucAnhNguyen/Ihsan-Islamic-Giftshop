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

    const skipHowMany = 3 * (currentPage - 1);
    const allProducts = await Product.find().skip(skipHowMany).limit(3);
    const totalItems = await Product.countDocuments();

    const maxPages = Math.ceil(totalItems / 3);

    if (totalItems > 1) {
      const { nextPageLink, prevPageLink } = getPaginationUrl(
        currentPage,
        maxPages,
        null
      );

      return Response.json({
        products: allProducts,
        nextPageLink: nextPageLink,
        prevPageLink: prevPageLink,
      });
    }

    return Response.json({
      products: allProducts,
      nextPageLink: "?page=1",
      prevPageLink: "?page=1",
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
