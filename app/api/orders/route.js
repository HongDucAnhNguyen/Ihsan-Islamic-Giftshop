import dbConnect from "@/lib/config/ConnectDB";
import Address from "@/lib/models/Address";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return Response.json({ error: "Invalid user" }, { status: 400 });
    }

    const ordersFound = await Order.find({ userId: userId });

    if (!ordersFound) {
      return Response.json({ message: "No orders found" });
    }

    let customerOrdersData = [];

    for (const order of ordersFound) {
      const orderShippingAddress = await Address.findById(order.shippingInfo);

      const shippingInfoDetails = {
        ...orderShippingAddress.toObject(),
      };
      const orderData = {
        ...order.toObject(),
        shippingInfo: shippingInfoDetails,
      };
      customerOrdersData.push(orderData);
    }

    return Response.json({
      userOrdersData: {
        userOrders: customerOrdersData,
        ordersOwnerData: {
          name: existingUser.name,
          email: existingUser.email,
        },
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};
