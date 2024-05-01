export const getPaginationUrl = (
  currentPage,
  maxPages,
  queryStr,
  searchQuery
) => {
  let nextPageLink = "";
  let prevPageLink = "";
  if (currentPage > 1 && currentPage < maxPages) {
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    if (searchQuery) {
      prevPageLink = `?query=${searchQuery}&page=${prevPage}`;
      nextPageLink = `?query=${searchQuery}&page=${nextPage}`;
    }

    prevPageLink = `${
      queryStr !== "" ? `?${queryStr}&page=${prevPage}` : `?page=${prevPage}`
    }`;
    nextPageLink = `${
      queryStr !== "" ? `?${queryStr}&page=${nextPage}` : `?page=${nextPage}`
    }`;
  }

  if (currentPage === 1) {
    const nextPage = currentPage + 1;

    if (searchQuery) {
      prevPageLink = `?query=${searchQuery}&page=1`;
      nextPageLink = `?query=${searchQuery}&page=${nextPage}`;
    }
    prevPageLink = `${queryStr !== "" ? `?${queryStr}&page=1` : `?page=1`}`;
    nextPageLink = `${
      queryStr !== "" ? `?${queryStr}&page=${nextPage}` : `?page=${nextPage}`
    }`;
  }

  if (currentPage == maxPages) {
    const prevPage = currentPage - 1;
    if (searchQuery) {
      prevPageLink = `?query=${searchQuery}&page=${prevPage}`;
      nextPageLink = `?query=${searchQuery}&page=${currentPage}`;
    }
    prevPageLink = `${
      queryStr !== "" ? `?${queryStr}&page=${prevPage}` : `?page=${prevPage}`
    }`;
    nextPageLink = `${
      queryStr !== ""
        ? `?${queryStr}&page=${currentPage}`
        : `?page=${currentPage}`
    }`;
  }

  return { prevPageLink, nextPageLink };
};
