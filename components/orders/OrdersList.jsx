"use client";
import React from "react";
import OrderItem from "./OrderItem";
const OrdersList = ({ orders }) => {
  return (
    <div>
      {" "}
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {orders?.userOrders?.map((order) => (
        <OrderItem
          key={order._id}
          order={order}
          customerInfo={orders.ordersOwnerData}
          shippingInfo={order.shippingInfo}
        />
      ))}
    </div>
  );
};

export default OrdersList;
