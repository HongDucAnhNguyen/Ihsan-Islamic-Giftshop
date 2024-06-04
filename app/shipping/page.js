import {
  getAccountSessionData,
  getCheckoutSessionData,
} from "@/backend/helpers/getSessionData";
import Shipping from "@/components/shipping/Shipping";
import React from "react";

const getAccountAddresses = async (user) => {
  try {
    if (user?.username && user?.userId) {
      const response = await fetch(
        `${process.env.BASE_URL}/api/address?userId=${user?.userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    }
  } catch (error) {}
};

const page = async () => {
  const user = await getAccountSessionData();
  const addresses = await getAccountAddresses(user);
  const checkoutData = await getCheckoutSessionData();
  return (
    <div>
      <Shipping
        checkoutData={{ ...checkoutData }}
        addresses={addresses}
      ></Shipping>
    </div>
  );
};

export default page;
