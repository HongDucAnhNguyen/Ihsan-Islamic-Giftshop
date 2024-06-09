"use client";

import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
const Filters = () => {
  let queryParams;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [minPriceVal, setMinPriceVal] = useState(0);

  const clearPageQuery = () => {
    queryParams = new URLSearchParams(searchParams.toString());
    if (searchParams.has("page")) {
      queryParams.delete("page", searchParams.get("page"));
    }
  };
  const handlePriceFilters = (priceField) => {
    clearPageQuery();

    if (priceField.name === "min") {
      setMinPriceVal(priceField.value);
    }

    if (queryParams.has(priceField.name)) {
      queryParams.set(priceField.name, priceField.value);
    } else {
      queryParams.append(priceField.name, priceField.value);
    }
    const path = pathname + "?" + queryParams.toString();
    router.push(path);
  };

  const defaultPriceHandler = (inputType) => {
    //retrieve category value from params
    queryParams = new URLSearchParams(searchParams.toString());

    //get value of query "category"

    const value = searchParams.get(inputType);
    //check state is true if current query matches checkbox value
    return value;
  };

  const handleCheck = (clickedCheckbox) => {
    //restrict only one check box to be checked at a time

    clearPageQuery();

    //get all checkbox components by filter name "category"
    const checkboxes = document.getElementsByName(clickedCheckbox.name);

    // regardless of checked or not, the act of clicking one box will uncheck all of the others
    checkboxes.forEach((checkbox) => {
      if (checkbox !== clickedCheckbox) {
        checkbox.checked = false;
      }
    });

    //if checkbox was clicked but to uncheck
    if (clickedCheckbox.checked == false) {
      queryParams.delete(clickedCheckbox.name, clickedCheckbox.value);
      const path = pathname + "?" + queryParams.toString();
      router.push(path);
    } else {
      //if checkbox was checked
      if (queryParams.has(clickedCheckbox.name)) {
        queryParams.set(clickedCheckbox.name, clickedCheckbox.value);
      } else {
        queryParams.append(clickedCheckbox.name, clickedCheckbox.value);
      }
      const path = pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  //keep selected checkbox still checked when page reloads
  const checkHandler = (checkBoxType, checkBoxValue) => {
    //retrieve category value from params
    queryParams = new URLSearchParams(searchParams.toString());

    //get value of query "category"

    const value = searchParams.get(checkBoxType);
    //check state is true if current query matches checkbox value
    if (checkBoxValue == value) {
      return true;
    } else return false;
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Price Range ($)</h3>

        <div className="mb-4">
          <div className="flex space-x-2 mb-4">
            <input
              name="min"
              min={0}
              max={9999}
              defaultValue={defaultPriceHandler("min")}
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
              onChange={(e) => {
                handlePriceFilters(e.target);
              }}
            />

            <input
              name="max"
              min={minPriceVal || 0}
              max={9999}
              defaultValue={defaultPriceHandler("max")}
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
              onChange={(e) => {
                handlePriceFilters(e.target);
              }}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Category</h3>

        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Quran"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Quran")}
                onClick={(e) => handleCheck(e.target)}
              />
              <span className="ml-2 text-gray-500"> Quran </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Accessories"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Accessories")}
                onClick={(e) => handleCheck(e.target)}
              />
              <span className="ml-2 text-gray-500"> Accessories </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Mens Clothing"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Mens Clothing")}
                onClick={(e) => handleCheck(e.target)}
              />
              <span className="ml-2 text-gray-500"> Mens Clothing </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Womens Clothing"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Womens Clothing")}
                onClick={(e) => handleCheck(e.target)}
              />
              <span className="ml-2 text-gray-500"> Womens Clothing </span>
            </label>
          </li>
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Ratings</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  defaultChecked={checkHandler("ratings", rating)}
                  onClick={(e) => handleCheck(e.target)}
                />
                <span className="ml-2 text-gray-500">
                  {" "}
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />{" "}
                </span>
              </label>
            ))}
          </li>
        </ul>
        <hr className="my-4" />
        <a href="/" className="bg-blue-500 text-white rounded-md p-2">
          Clear Filters
        </a>
      </div>
    </aside>
  );
};

export default Filters;
