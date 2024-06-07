export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import { getPaginationUrl } from "@/lib/helpers/getPaginationUrl";
import { Product } from "@/lib/models/Product";

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
    const filters = {
      $or: [
        { name: { $regex: keywordFilter, $options: "i" } },
        { category: { $regex: keywordFilter, $options: "i" } },

        { description: { $regex: keywordFilter, $options: "i" } },
      ],
    };
    if (isNaN(queryIsString)) {
      const productsSearchResult = await Product.find(filters)
        .skip(skipHowMany)
        .limit(3);

      const totalItems = await Product.find(filters).countDocuments();

      const maxPages = Math.ceil(totalItems / 3);

      if (totalItems > 1) {
        const { nextPageLink, prevPageLink } = getPaginationUrl(
          currentPage,
          maxPages,
          "",
          keywordFilter
        );

        return Response.json({
          searchResults: productsSearchResult,
          nextPageLink: nextPageLink,
          prevPageLink: prevPageLink,
          totalItems: totalItems,
        });
      }

      return Response.json({
        searchResults: productsSearchResult,
        nextPageLink: `?query=${keywordFilter}&page=1`,
        prevPageLink: `?query=${keywordFilter}&page=1`,
        totalItems: totalItems,
      });
    } else {
      // If the query is a number, convert it to a number and perform range query

      //define a search range

      const filters = {
        $or: [{ price: keywordFilter }, { ratings: keywordFilter }],
      };

      const productsSearchResult = await Product.find(filters)
        .skip(skipHowMany)
        .limit(3);
      const totalItems = await Product.find(filters).countDocuments();

      const maxPages = Math.ceil(totalItems / 3);

      if (totalItems > 1) {
        const { nextPageLink, prevPageLink } = getPaginationUrl(
          currentPage,
          maxPages,
          "",

          keywordFilter
        );

        return Response.json({
          searchResults: productsSearchResult,
          nextPageLink: nextPageLink,
          prevPageLink: prevPageLink,
          totalItems: totalItems,
        });
      }

      return Response.json({
        searchResults: productsSearchResult,
        nextPageLink: `?query=${keywordFilter}&page=1`,
        prevPageLink: `?query=${keywordFilter}&page=1`,
        totalItems: totalItems,
      });
    }
  } catch (error) {
    return Response.json(error);
  }
};
