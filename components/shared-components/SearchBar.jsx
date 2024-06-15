// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

const SearchBar = () => {
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const handleSearchByKeyword = (e) => {
  //   e.preventDefault();

  //   const params = new URLSearchParams(searchParams);

  //   if (searchKeyword.trim() != undefined && searchKeyword.trim() != "") {
  //     params.set("query", searchKeyword);
  //     setSearchKeyword("");
  //   } else {
  //     params.delete("query");
  //   }
  //   router.replace(`/search?${params.toString()}`);
  // };
  return (
    <form
      // onSubmit={handleSearchByKeyword}
      action="/search"
      style={{ maxWidth: 400 }}
      className="flex flex-nowrap items-center order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Search by keyword"
        // value={searchKeyword}
        // onChange={(e) => {
        //   setSearchKeyword(e.target.value);
        // }}
        name="query"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 inline-block text-white border border-transparent bg-lime-600 text-white rounded-md hover:bg-lime-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
