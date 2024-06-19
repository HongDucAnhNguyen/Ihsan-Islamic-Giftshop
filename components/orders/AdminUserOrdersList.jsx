"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminUserOrdersList = ({ orders }) => {
  const router = useRouter();
  const handleDeleteUserOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/admin/user_orders/${orderId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data?.orderDeleted === true) {
        toast.success(data.message);
        router.refresh();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">User Orders</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order?._id} className="bg-white">
              <td className="px-6 py-2">{order?._id}</td>
              <td className="px-6 py-2">${order?.paymentInfo?.amountPaid}</td>
              <td
                className={`${
                  order?.orderStatus === "Processing"
                    ? "text-red-500"
                    : order?.orderStatus === "Shipped"
                    ? "text-orange-400"
                    : order?.orderStatus === "Delivered"
                    ? "text-green-500"
                    : ""
                } px-6 py-2`}
              >
                {order?.orderStatus}
              </td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/user_orders/update/${order._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    Manage
                  </Link>
                  <button
                    onClick={() => handleDeleteUserOrder(order._id)}
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserOrdersList;
