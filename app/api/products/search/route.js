export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import { Product } from "@/backend/models/Product";

const helperFuncIsQueryNotNumberValue = (stringVal) => {
  return isNaN(stringVal);
};

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const keywordFilter = searchParams.get("query");
    const currentPage = parseInt(searchParams.get("page")) || 1;

    const skipHowMany = 1 * (currentPage - 1);

    if (helperFuncIsQueryNotNumberValue(keywordFilter) == true) {
      const productsSearchResult = await Product.find({
        $or: [
          { name: { $regex: keywordFilter, $options: "i" } },
          { category: { $regex: keywordFilter, $options: "i" } },

          { description: { $regex: keywordFilter, $options: "i" } },
        ],
      })
        .skip(skipHowMany)
        .limit(1);
      const totalItems = await Product.find({
        $or: [
          { name: { $regex: keywordFilter, $options: "i" } },
          { category: { $regex: keywordFilter, $options: "i" } },

          { description: { $regex: keywordFilter, $options: "i" } },
        ],
      }).countDocuments();

      const maxPages = Math.ceil(totalItems / 1);
      return Response.json({
        searchResults: productsSearchResult,
        maxPages: maxPages,
      });
    } else {
      // If the query is a number, convert it to a number and perform range query
      const queryNumber = Number(keywordFilter);

      //define a search range
      const minPrice = queryNumber;
      const maxPrice = queryNumber + 99999;

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

      const maxPages = Math.ceil(totalItems / 1);
      return Response.json({
        searchResults: productsSearchResult,
        maxPages: maxPages,
      });
    }
  } catch (error) {
    return Response.json(error);
  }
};
