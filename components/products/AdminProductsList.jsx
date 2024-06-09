"use client";

import React from "react";
import Link from "next/link";

const AdminProductsList = ({ data, prevPageLink, nextPageLink }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.productsCount} Products
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              image
            </th>

            <th scope="col" colSpan={2} className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => (
            <tr key={product._id} className="bg-white">
              <td className="px-6 py-2">
                <Link
                  className="text-blue-500 underline"
                  href={`/product/${product._id}`}
                >
                  {product?.name}
                </Link>
              </td>
              <td className="px-6 py-2">{product?.stock}</td>
              <td className="px-6 py-2">${product?.price}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/products/upload_images`}
                    className="px-2 py-2 inline-block text-black bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-200
                     cursor-pointer mr-2"
                  >
                    <button>Manage</button>
                  </Link>
                </div>
              </td>
              <td className="px-6 py-2">
                <div className="flex">
                  <Link
                    href={`/admin/products`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <button>Edit</button>{" "}
                  </Link>
                  <Link
                    href="#"
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <button>Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
    </div>
  );
};

export default AdminProductsList;
