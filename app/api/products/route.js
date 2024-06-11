export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import { Product } from "@/lib/models/Product";
import { getPaginationUrl } from "@/lib/helpers/getPaginationUrl";

export async function GET(req) {
  try {
    await dbConnect();




    const { searchParams } = new URL(req.url);

    const filteredSearchParamsObj = {};

    searchParams.forEach((value, key) => {
      if (value !== "none") {
        filteredSearchParamsObj[key] = value;
      }
    });
    const filteredSearchParams = new URLSearchParams(filteredSearchParamsObj);
    const queryStr = filteredSearchParams.toString();

    let currentPage = 1;

    if (
      isNaN(searchParams.get("page")) == false &&
      parseInt(searchParams.get("page")) > 0
    ) {
      currentPage = parseInt(searchParams.get("page"));
    }

    const skipHowMany = 3 * (currentPage - 1);
    let filters = {};

    filteredSearchParams.forEach((value, key) => {
      switch (key) {
        case "min":
          filters.price = { ...filters.price, $gte: value };
          break;
        case "max":
          filters.price = { ...filters.price, $lte: value };
          break;
        case "ratings":
          filters.ratings = value;
          break;
        case "category":
          filters.category = value;
          break;
        default:
          // Handle unknown keys if needed
          break;
      }
    });
    // If both min and max are provided, provide the price range

    if (filters.price && filters.price.$gte && filters.price.$lte) {
      filters.price = {
        $gte: filters.price.$gte,
        $lte: filters.price.$lte,
      };
    }

    const allProducts = await Product.find(filters).skip(skipHowMany).limit(3);

    const totalItems = await Product.find(filters).countDocuments();

    const maxPages = Math.ceil(totalItems / 3);

    if (totalItems > 1) {
      const { nextPageLink, prevPageLink } = getPaginationUrl(
        currentPage,
        maxPages,
        `${queryStr.split("&").slice(0, -1).join("&")}`,
        null
      );

      return Response.json({
        products: allProducts,
        nextPageLink: nextPageLink,
        prevPageLink: prevPageLink,
      });
    }

    const nextPagePath = `?${queryStr
      .split("&")
      .slice(0, -1)
      .join("&")}&page=1`;
    const prevPagePath = nextPagePath;
    return Response.json({
      products: allProducts,
      nextPageLink: nextPagePath || "",
      prevPageLink: prevPagePath || "",
    });
  } catch (error) {
    return Response.json(error);
  }
}

