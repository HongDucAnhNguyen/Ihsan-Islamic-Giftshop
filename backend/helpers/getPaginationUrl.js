export const getPaginationUrl = (currentPage, maxPages, searchQuery) => {
  let nextPageLink = "";
  let prevPageLink = "";

  if (currentPage > 1 && currentPage < maxPages) {
    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;

    if (searchQuery !== null) {
      prevPageLink = `?query=${searchQuery}&page=${prevPage}`;
      nextPageLink = `?query=${searchQuery}&page=${nextPage}`;
    } else {
      prevPageLink = `?page=${prevPage}`;
      nextPageLink = `?page=${nextPage}`;
    }
  }
  if (currentPage == 1) {
    const nextPage = currentPage + 1;

    if (searchQuery !== null) {
      prevPageLink = `?query=${searchQuery}&page=${currentPage}`;
      nextPageLink = `?query=${searchQuery}&page=${nextPage}`;
    } else {
      prevPageLink = `?page=${currentPage}`;
      nextPageLink = `?page=${nextPage}`;
    }
  }
  if (currentPage == maxPages) {
    const prevPage = currentPage - 1;
    if (searchQuery !== null) {
      prevPageLink = `?query=${searchQuery}&page=${prevPage}`;
      nextPageLink = `?query=${searchQuery}&page=${currentPage}`;
    } else {
      prevPageLink = `?page=${prevPage}`;
      nextPageLink = `?page=${currentPage}`;
    }
  }

  return { prevPageLink, nextPageLink };
};
