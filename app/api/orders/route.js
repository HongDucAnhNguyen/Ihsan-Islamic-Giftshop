import dbConnect from "@/backend/config/ConnectDB";
import Address from "@/backend/models/Address";
import Order from "@/backend/models/Order";
import User from "@/backend/models/User";

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return Response.error({ error: "Invalid user" });
    }

    const ordersFound = await Order.find({ userId: userId });

    if (!ordersFound) {
      return Response.json({ message: "No orders found" });
    }

    let customerOrdersData = [];

    for (const order of ordersFound) {
      const orderShippingAddress = await Address.findById(order.shippingInfo);

      const shippingInfoDetails = {
        phoneNumber: orderShippingAddress.phoneNumber,
        streetAddress: orderShippingAddress.streetAddress,
        zipCode: orderShippingAddress.zipCode,
        city: orderShippingAddress.city,
        ProvinceState: orderShippingAddress.ProvinceState,
        country: orderShippingAddress.country,
      };
      const orderData = {
        _id: order._id,
        paymentInfo: order.paymentInfo,
        orderItems: order.orderItems,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
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
    return Response.error({ error: error.message });
  }
};
