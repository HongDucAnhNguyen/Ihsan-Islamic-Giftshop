export const dynamic = "force-dynamic";
import dbConnect from "@/lib/config/ConnectDB";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const userFound = await User.findById(userId);

    if (!userFound) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    if (userFound?.role !== process.env.ADMIN_ROLE) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    const allUserOrders = await Order.find();

    return Response.json(allUserOrders);
  } catch (error) {
    return Response.json(error);
  }
};
