"use client";
import React from "react";
import OrderItem from "./OrderItem";
import ProfileSideBar from "../utilities/ProfileSideBar";
const OrdersList = ({ orders }) => {
  return (
    <div>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl mb-2">Orders Placed</h2>
        </div>
      </section>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <ProfileSideBar />
            <main className="md:w-2/3 lg:w-3/4 px-4 ">
              <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
              {orders?.userOrders?.map((order) => (
                <OrderItem
                  key={order._id}
                  order={order}
                  customerInfo={orders.ordersOwnerData}
                  shippingInfo={order.shippingInfo}
                />
              ))}
            </main>
          </div>
        </div>
      </section>{" "}
    </div>
  );
};

export default OrdersList;
