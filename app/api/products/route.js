export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import { Product } from "@/backend/models/Product";
import { getPaginationUrl } from "@/backend/helpers/getPaginationUrl";

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
    console.log(queryStr);
    let currentPage = 1;

    if (
      isNaN(searchParams.get("page")) == false &&
      parseInt(searchParams.get("page")) > 0
    ) {
      currentPage = parseInt(searchParams.get("page"));
    }

    // const categoryQuery =
    //   searchParams.get("category") === "none"
    //     ? null
    //     : searchParams.get("category");
    // const ratingsQuery =
    //   searchParams.get("ratings") === "none"
    //     ? null
    //     : parseInt(searchParams.get("ratings"));
    // const minPrice =
    //   searchParams.get("min") === "none"
    //     ? null
    //     : parseInt(searchParams.get("max"));
    // const maxPrice =
    //   searchParams.get("max") === "none"
    //     ? null
    //     : parseInt(searchParams.get("max"));

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
    // categoryQuery && ratingsQuery && minPrice && maxPrice
    //   ? {
    //       category: categoryQuery,
    //       ratings: ratingsQuery,
    //       price: { $gte: minPrice, $lte: maxPrice },
    //     }
    //   : categoryQuery
    //   ? {
    //       category: categoryQuery,
    //     }
    //   : ratingsQuery
    //   ? {
    //       ratings: ratingsQuery,
    //     }
    //   :

    const allProducts = await Product.find(filters).skip(skipHowMany).limit(3);

    const totalItems = await Product.find(filters).countDocuments();

    const maxPages = Math.ceil(totalItems / 3);

    // console.log(
    //   "the max pages is",
    //   maxPages,
    //   "and the total items is",
    //   totalItems
    // );

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

export const POST = async (req) => {
  try {
    await dbConnect();
    const data = await req.json();
    const newProduct = await Product.create(data);
    return Response.json(newProduct);
  } catch (error) {
    return Response.json(error);
  }
};
