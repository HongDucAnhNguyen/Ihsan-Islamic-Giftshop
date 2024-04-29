export const getPaginationUrl = (currentPage, maxPages, searchQuery) => {
  let nextPageLink = "";
  let prevPageLink = "";

  if (currentPage > 1 && currentPage < maxPages) {
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    if (searchQuery) {
      prevPageLink = {
        pathname: "/",
        query: { query: searchQuery, page: prevPage },
      };
      nextPageLink = {
        pathname: "/",
        query: { query: searchQuery, page: nextPage },
      };
    } else {
      prevPageLink = {
        pathname: "/",
        query: { page: currentPage },
      };
      nextPageLink = {
        pathname: "/",
        query: { page: nextPage },
      };
    }
  }
  if (currentPage == 1) {
    const nextPage = currentPage + 1;

    if (searchQuery) {
      prevPageLink = {
        pathname: "/",
        query: { query: searchQuery, page: currentPage },
      };
      nextPageLink = {
        pathname: "/",
        query: { query: searchQuery, page: nextPage },
      };
    } else {
      prevPageLink = {
        pathname: "/",
        query: { page: currentPage },
      };
      nextPageLink = {
        pathname: "/",
        query: { page: nextPage },
      };
    }
  }
  if (currentPage == maxPages) {
    const prevPage = currentPage - 1;
    if (searchQuery) {
      prevPageLink = {
        pathname: "/",
        query: { query: searchQuery, page: prevPage },
      };
      nextPageLink = {
        pathname: "/",
        query: { query: searchQuery, page: currentPage },
      };

      //   prevPageLink = `/?query=${searchQuery}&page=${prevPage}`;
      //   nextPageLink = `/?query=${searchQuery}&page=${currentPage}`;
    } else {
      prevPageLink = {
        pathname: "/",
        query: { page: prevPage },
      };
      nextPageLink = {
        pathname: "/",
        query: { page: currentPage },
      };
    }
  }

  return { prevPageLink, nextPageLink };
};
