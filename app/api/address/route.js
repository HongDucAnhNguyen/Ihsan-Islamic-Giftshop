import dbConnect from "@/lib/config/ConnectDB";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import Address from "@/lib/models/Address";

export const GET = async (req) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const allShippingAddresses = await Address.find({
      userId: userId,
    });
    return Response.json(allShippingAddresses);
  } catch (error) {
    return Response.json({ message: error.message });
  }
};
export const POST = async (req) => {
  try {
    await dbConnect();
    const accountSessionData = await getAccountSessionData();
    if (!accountSessionData?.userId || !accountSessionData?.username) {
      return Response.json({ error: "Invalid user Id" }, { status: 500 });
    }
    const newAddressData = await req.json();
    const newShippingAddress = await Address.create({
      ...newAddressData,
      userId: accountSessionData.userId,
    });

    return Response.json({ newShippingAddress: newShippingAddress });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
