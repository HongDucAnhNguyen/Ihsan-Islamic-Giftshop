import { getAccountSessionData } from "@/backend/helpers/getSessionData";
import OrdersList from "@/components/orders/OrdersList";
import React from "react";

const getUserOrders = async () => {
  try {
    const { userId } = await getAccountSessionData();

    const response = await fetch(
      `${process.env.BASE_URL}/api/orders?userId=${userId}`
    );
    const { userOrdersData } = await response.json();
    return userOrdersData;
  } catch (error) {}
};

const page = async () => {
  const orders = await getUserOrders();
  return (
    <div>
      <OrdersList orders={orders}></OrdersList>
    </div>
  );
};

export default page;
