export const dynamic = "force-dynamic";
import dbConnect from "@/lib/config/ConnectDB";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import Address from "@/lib/models/Address";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";
import { revalidatePath } from "next/cache";

export const PUT = async (req, { params }) => {
  try {
    await dbConnect();
    const updateData = await req.json();

    const { orderId } = params;
    const { userId, userRole } = await getAccountSessionData();
    const userFound = await User.findById(userId);

    if (!userFound) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    if (
      userFound?.role !== process.env.ADMIN_ROLE ||
      userRole !== process.env.ADMIN_ROLE
    ) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }

    const orderFound = await Order.findById(orderId);
    if (!orderFound) {
      return Response.json(
        {
          orderStatusUpdated: false,
          message: "Order was not found, failed to update order",
        },
        { status: 404 }
      );
    }
    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
      orderStatus: updateData,
    });
    if (!updatedOrder) {
      return Response.json(
        {
          orderStatusUpdated: false,
          message: "Something went wrong, failed to update order",
        },
        { status: 500 }
      );
    }
    revalidatePath(`/admin/user_orders/update/${orderId}`);
    revalidatePath("/admin/user_orders");
    return Response.json({
      orderStatusUpdated: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    return Response.json(
      { message: "something went wrong with the server while updating" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await dbConnect();
    const { orderId } = params;
    const { userId, userRole } = await getAccountSessionData();
    const userFound = await User.findById(userId);

    if (!userFound) {
      return Response.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }
    if (
      userFound?.role !== process.env.ADMIN_ROLE ||
      userRole !== process.env.ADMIN_ROLE
    ) {
      return Response.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    await Order.findByIdAndDelete(orderId);
    revalidatePath("/admin/user_orders");
    return Response.json({
      orderDeleted: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return Response.error({
      message: "something went wrong with the server while deleting",
    });
  }
};

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
      return Response.json(
        { error: "Could not find a user linked to this order" },
        { status: 400 }
      );
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
    console.log(error.message);
    return Response.json("something went wrong with the server", {
      status: 500,
    });
  }
};
