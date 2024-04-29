export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import { getPaginationUrl } from "@/backend/helpers/getPaginationUrl";
import { Product } from "@/backend/models/Product";

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const keywordFilter = searchParams.get("query");
    let currentPage = 1;
    if (
      isNaN(searchParams.get("page")) == false &&
      parseInt(searchParams.get("page")) > 0
    ) {
      currentPage = parseInt(searchParams.get("page"));
    }

    const skipHowMany = 3 * (currentPage - 1);
    const queryIsString = parseFloat(keywordFilter);

    if (isNaN(queryIsString)) {
      const productsSearchResult = await Product.find({
        $or: [
          { name: { $regex: keywordFilter, $options: "i" } },
          { category: { $regex: keywordFilter, $options: "i" } },

          { description: { $regex: keywordFilter, $options: "i" } },
        ],
      })
        .skip(skipHowMany)
        .limit(3);

      const totalItems = await Product.find({
        $or: [
          { name: { $regex: keywordFilter, $options: "i" } },
          { category: { $regex: keywordFilter, $options: "i" } },

          { description: { $regex: keywordFilter, $options: "i" } },
        ],
      }).countDocuments();

      const maxPages = Math.ceil(totalItems / 3);

      if (totalItems > 1) {
        const { nextPageLink, prevPageLink } = getPaginationUrl(
          currentPage,
          maxPages,
          keywordFilter
        );

        return Response.json({
          searchResults: productsSearchResult,
          nextPageLink: nextPageLink,
          prevPageLink: prevPageLink,
        });
      }

      return Response.json({
        searchResults: productsSearchResult,
        nextPageLink: `?query=${keywordFilter}&page=1`,
        prevPageLink: `?query=${keywordFilter}&page=1`,
      });
    } else {
      // If the query is a number, convert it to a number and perform range query
      const queryNumber = keywordFilter;

      //define a search range
      const minPrice = queryNumber;
      const maxPrice = 99999;

      const productsSearchResult = await Product.find({
        $or: [
          { price: { $gte: minPrice, $lte: maxPrice } },
          { ratings: queryNumber },
        ],
      })
        .skip(skipHowMany)
        .limit(3);
      const totalItems = await Product.find({
        $or: [
          { price: { $gte: minPrice, $lte: maxPrice } },
          { ratings: queryNumber },
        ],
      }).countDocuments();

      const maxPages = Math.ceil(totalItems / 3);

      if (totalItems > 1) {
        const { nextPageLink, prevPageLink } = getPaginationUrl(
          currentPage,
          maxPages,
          keywordFilter
        );

        return Response.json({
          searchResults: productsSearchResult,
          nextPageLink: nextPageLink,
          prevPageLink: prevPageLink,
        });
      }

      return Response.json({
        searchResults: productsSearchResult,
        nextPageLink: `?query=${keywordFilter}&page=1`,
        prevPageLink: `?query=${keywordFilter}&page=1`,
      });
    }
  } catch (error) {
    return Response.json(error);
  }
};
