export const dynamic = "force-dynamic";
import dbConnect from "@/lib/config/ConnectDB";
import { handleUpLoadImage } from "@/lib/helpers/cloudinaryUploadImage";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import { Product } from "@/lib/models/Product";
import User from "@/lib/models/User";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    await dbConnect();

    let productImageUrls = [];
    const { productId } = params;

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

    const productFound = await Product.findById(productId);

    productImageUrls = [...productFound.images];

    const formData = await req.formData();

    const files = formData.getAll("image");

    if (!files) {
      return Response.json({ error: "No files uploaded" }, { status: 400 });
    }
    console.log(files);

    // Check file size (example: max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (files.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds limit" },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png"];
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file type" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const productImageUploadResponse = await handleUpLoadImage(
        buffer,
        "ihsan-ecommerce/products"
      );

      productImageUrls.push(productImageUploadResponse);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { images: productImageUrls },
      { new: true }
    );

    revalidatePath(`/product/${productId}`);
    return Response.json({
      productImagesUpdated: updatedProduct ? true : false,
      message: "product images updated",
    });
  } catch (error) {
    console.log(error.message);
    return Response.json({
      message: "something went wrong while uploading the images",
    });
  }
};
