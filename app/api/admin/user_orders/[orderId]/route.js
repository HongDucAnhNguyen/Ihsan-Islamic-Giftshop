export const dynamic = "force-dynamic";
import dbConnect from "@/lib/config/ConnectDB";
import Address from "@/lib/models/Address";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";

export const PUT = async (req) => {};

export const DELETE = async (req) => {};

export const GET = async (req, context) => {
  try {
    await dbConnect();
    const { params } = context;
    const { orderId } = params;

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const userFound = await User.findById(userId);

    if (!userFound) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    if (userFound?.role !== process.env.ADMIN_ROLE) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }

    const order = await Order.findById(orderId);
    const orderShippingAddress = await Address.findById(order.shippingInfo);

    const orderOwner = await User.findById(order.userId);

    if (!orderOwner) {
      return Response.json({ error: "Invalid user" }, { status: 400 });
    }

    const userData = { name: orderOwner.name, email: orderOwner.email };

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
      user: userData,
    };
    return Response.json(orderData);
  } catch (error) {
    return Response.json(error);
  }
};
