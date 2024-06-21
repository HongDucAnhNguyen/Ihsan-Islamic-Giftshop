import {
  getAccountSessionData,
  getCartSessionData,
} from "@/lib/helpers/getSessionData";
import NavbarClient from "./NavbarClient";

const getCartLength = async (user) => {
  try {
    if (user?.username) {
      const response = await fetch(
        `${process.env.BASE_URL}/api/cart?userId=${user?.userId}`,
        {
          method: "GET",
        }
      );
      const cartData = await response.json();

      return cartData?.items?.length;
    } else {
      const cartData = await getCartSessionData();

      return cartData?.cart?.length;
    }
  } catch (error) {}
};

const Navbar = async () => {
  const user = await getAccountSessionData();
  const cartLength = await getCartLength(user);

  return (
    <NavbarClient cartLength={cartLength} user={{ ...user }}></NavbarClient>
  );
};

export default Navbar;
