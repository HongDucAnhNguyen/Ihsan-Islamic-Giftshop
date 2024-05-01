export const getPaginationUrl = (
  currentPage,
  maxPages,
  categoryQuery,
  ratingsQuery,
  searchQuery
) => {
  let nextPageLink = "";
  let prevPageLink = "";

  if (currentPage > 1 && currentPage < maxPages) {
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    if (categoryQuery && ratingsQuery) {
      prevPageLink = `?category=${categoryQuery}&ratings=${ratingsQuery}&page=${prevPage}`;
      nextPageLink = `?category=${categoryQuery}&ratings=${ratingsQuery}&page=${nextPage}`;
    } else {
      if (categoryQuery) {
        prevPageLink = `?category=${categoryQuery}&page=${prevPage}`;
        nextPageLink = `?category=${categoryQuery}&page=${nextPage}`;
      } else {
        if (ratingsQuery) {
          prevPageLink = `?ratings=${ratingsQuery}&page=${prevPage}`;
          nextPageLink = `?ratings=${ratingsQuery}&page=${nextPage}`;
        } else {
          prevPageLink = `?page=${prevPage}`;
          nextPageLink = `?page=${nextPage}`;
        }
      }
    }

    if (searchQuery) {
      prevPageLink = `?query=${searchQuery}&page=${prevPage}`;
      nextPageLink = `?query=${searchQuery}&page=${nextPage}`;
    } else {
      prevPageLink = `?page=${prevPage}`;
      nextPageLink = `?page=${nextPage}`;
    }
  }

  if (currentPage === 1) {
    const nextPage = currentPage + 1;
    if (categoryQuery && ratingsQuery) {
      prevPageLink = `?category=${categoryQuery}&ratings=${ratingsQuery}&page=1`;
      nextPageLink = `?category=${categoryQuery}&ratings=${ratingsQuery}&page=${nextPage}`;
    } else {
      if (categoryQuery) {
        console.log("you are here right now");
        prevPageLink = `?category=${categoryQuery}&page=1`;
        nextPageLink = `?category=${categoryQuery}&page=${nextPage}`;
      } else {
        if (ratingsQuery) {
          prevPageLink = `?ratings=${ratingsQuery}&page=1`;
          nextPageLink = `?ratings=${ratingsQuery}&page=${nextPage}`;
        } else {
          if (searchQuery) {
            prevPageLink = `?query=${searchQuery}&page=1`;
            nextPageLink = `?query=${searchQuery}&page=${nextPage}`;
          } else {
            prevPageLink = `?page=${currentPage}`;
            nextPageLink = `?page=${nextPage}`;
          }
        }
      }
    }
  }

  if (currentPage == maxPages) {
    const prevPage = currentPage - 1;
    if (categoryQuery && ratingsQuery) {
      prevPageLink = `?category=${categoryQuery}&ratings=${ratingsQuery}&page=${prevPage}`;
      nextPageLink = `?category=${categoryQuery}&ratings=${ratingsQuery}&page=1`;
    } else {
      if (categoryQuery) {
        prevPageLink = `?category=${categoryQuery}&page=${prevPage}`;
        nextPageLink = `?category=${categoryQuery}&page=${currentPage}`;
      } else {
        if (ratingsQuery) {
          prevPageLink = `?ratings=${ratingsQuery}&page=${prevPage}`;
          nextPageLink = `?ratings=${ratingsQuery}&page=${currentPage}`;
        } else {
          if (searchQuery) {
            prevPageLink = `?query=${searchQuery}&page=${prevPage}`;
            nextPageLink = `?query=${searchQuery}&page=${currentPage}`;
          } else {
            prevPageLink = `?page=${prevPage}`;
            nextPageLink = `?page=${currentPage}`;
          }
        }
      }
    }
  }

  return { prevPageLink, nextPageLink };
};
