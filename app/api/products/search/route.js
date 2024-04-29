export const dynamic = "force-dynamic";

import dbConnect from "@/backend/config/ConnectDB";
import { getPaginationUrl } from "@/backend/helpers/getPaginationUrl";
import { Product } from "@/backend/models/Product";

const helperFuncIsQueryNotNumberValue = (stringVal) => {
  parseFloat(stringVal) === NaN ? true : false;
};

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const keywordFilter = searchParams.get("query");
    let currentPage = 1;

    if (
      parseInt(searchParams.get("page")) != NaN &&
      parseInt(searchParams.get("page")) > 0
    ) {
      currentPage = parseInt(searchParams.get("page"));
    }

    const skipHowMany = 3 * (currentPage - 1);

    // if (helperFuncIsQueryNotNumberValue(keywordFilter) == true) {
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
    // } else {
    //   // If the query is a number, convert it to a number and perform range query
    //   const queryNumber = parseFloat(keywordFilter);

    //   //define a search range
    //   const minPrice = queryNumber;
    //   const maxPrice = 99999;

    //   const productsSearchResult = await Product.find({
    //     $or: [
    //       { price: { $gte: minPrice, $lte: maxPrice } },
    //       { ratings: queryNumber },
    //     ],
    //   })
    //     .skip(skipHowMany)
    //     .limit(3);
    //   const totalItems = await Product.find({
    //     $or: [
    //       { price: { $gte: minPrice, $lte: maxPrice } },
    //       { ratings: queryNumber },
    //     ],
    //   }).countDocuments();

    //   const maxPages = Math.ceil(totalItems / 3);

    //   const { nextPageLink, prevPageLink } = getPaginationUrl(
    //     currentPage,
    //     maxPages,
    //     keywordFilter
    //   );
    //   return Response.json({
    //     searchResults: productsSearchResult,
    //     nextPageLink: nextPageLink,
    //     prevPageLink: prevPageLink,
    //   });
    // }
  } catch (error) {
    return Response.json(error);
  }
};
