import Image from "next/image";
import React from "react";

const OrderItem = ({ order, customerInfo, shippingInfo }) => {
  return (
    <article className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {order?._id} </span>
            {order?.orderStatus == "Processing" ? (
              <span className="text-red-500">• {order?.orderStatus}</span>
            ) : (
              <span className="text-green-500">• {order?.orderStatus}</span>
            )}
          </p>
          <p className="text-gray-500">{order?.createdAt?.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">Customer</p>
          <ul className="text-gray-600">
            <li>{customerInfo?.name}</li>
            <li>Phone: {shippingInfo?.phoneNumber}</li>
            <li>Email: {customerInfo?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Delivery address</p>
          <ul className="text-gray-600">
            <li>{shippingInfo?.streetAddress}</li>
            <li>
              {shippingInfo?.city}, {shippingInfo?.ProvinceState},{" "}
              {shippingInfo?.zipCode}
            </li>
            <li>{shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">Payment</p>
          <ul className="text-gray-600">
            <li className="text-green-400">
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>Tax paid: ${order?.paymentInfo?.taxPaid}</li>
            <li>Total paid: ${order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item) => (
          <figure className="flex flex-row mb-4">
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={item?.productImage}
                  height="60"
                  width="60"
                  alt={item.productName}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item.productName.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                {item.quantity}x = ${item.price * item.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
};

export default OrderItem;
