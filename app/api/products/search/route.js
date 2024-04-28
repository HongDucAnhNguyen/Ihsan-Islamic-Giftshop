export const dynamic = 'force-dynamic'

import Product from "@/backend/models/Product";

const helperFuncIsQueryNotNumberValue = (stringVal) => {
  return isNaN(stringVal);
};

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const keywordFilter = searchParams.get("query");
    if (helperFuncIsQueryNotNumberValue(keywordFilter) == true) {
      const productsSearchResult = await Product.find({
        $or: [
          { name: { $regex: keywordFilter, $options: "i" } },
          { category: { $regex: keywordFilter, $options: "i" } },

          { description: { $regex: keywordFilter, $options: "i" } },
        ],
      });
      return Response.json({ searchResults: productsSearchResult });
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
      });
      return Response.json({ searchResults: productsSearchResult });
    }
  } catch (error) {
    return Response.json(error);
  }
};
