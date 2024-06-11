export const dynamic = "force-dynamic";

import dbConnect from "@/lib/config/ConnectDB";
import Address from "@/lib/models/Address";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await dbConnect();
    const { addressId } = params;
    const addressDetails = await Address.findById(addressId);

    return Response.json({
      //   addressDetails: {
      //     _id: addressDetails._id,
      //     streetAddress: addressDetails.streetAddress,
      //     zipCode: addressDetails.zipCode,
      //     city: addressDetails.city,
      //     ProvinceState: addressDetails.ProvinceState,
      //     phoneNumber: addressDetails.phoneNumber,
      //     country: addressDetails.country,
      //   },
      addressDetails: addressDetails,
    });
  } catch (error) {
    return Response.json({ message: error.message });
  }
};

export const PUT = async (req, { params }) => {
  try {
    await dbConnect();
    const { addressId } = params;
    const updateData = await req.json();
    const addressDetails = await Address.findById(addressId);

    if (!addressDetails) {
      return Response.json({ error: "Address not found" });
    }
    await Address.findByIdAndUpdate(addressId, updateData, { new: true });
    revalidatePath(`/address/update/${addressId}`);

    return Response.json({
      updateSuccess: true,
    });
  } catch (error) {
    return Response.json({ message: error.message });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await dbConnect();
    const { addressId } = params;
    await Address.findByIdAndDelete(addressId);
    // return NextResponse.redirect(new URL("/profile", req.url));
    return Response.json({ message: "deleted address" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
};
