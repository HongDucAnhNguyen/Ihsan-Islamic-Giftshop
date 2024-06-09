"use client";
import React from "react";
import OrderItem from "./OrderItem";
import ProfileSideBar from "../shared-components/ProfileSideBar";
const OrdersList = ({ orders }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {orders?.userOrders?.length > 0 ? (
        orders?.userOrders?.map((order) => (
          <OrderItem
            key={order._id}
            order={order}
            customerInfo={orders.ordersOwnerData}
            shippingInfo={order.shippingInfo}
          />
        ))
      ) : (
        <p>You have no orders</p>
      )}
    </div>
  );
};

export default OrdersList;
