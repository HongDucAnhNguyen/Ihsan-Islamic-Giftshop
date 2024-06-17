export const dynamic = "force-dynamic";
import dbConnect from "@/lib/config/ConnectDB";
import { handleDeleteImage } from "@/lib/helpers/cloudinaryDeleteImage";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import { Product } from "@/lib/models/Product";
import { revalidatePath } from "next/cache";
import User from "@/lib/models/User";

export const PUT = async (req, { params }) => {
  try {
    await dbConnect();
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

    const { productId } = params;
    const updateData = await req.json();
    const productFound = await Product.findById(productId);

    if (!productFound) {
      return Response.json(
        { productUpdated: false, message: "Cannot find product with id" },
        { status: 404 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData
    );
    if (!updatedProduct) {
      return Response.json({
        productUpdated: false,
        message: "something went wrong while updating product",
      });
    }
    revalidatePath(`/product/${productId}`);
    revalidatePath(`/admin/products/update/${productId}`);
    return Response.json({
      productUpdated: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    return Response.json({
      productUpdated: false,
      message: "something went wrong while updating product",
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await dbConnect();
    const { userId, userRole } = await getAccountSessionData();
    const { productId } = params;
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

    if (!productFound) {
      return Response.json(
        { productUpdated: false, message: "Cannot find product with id" },
        { status: 404 }
      );
    }

    for (let index = 0; index < productFound.images.length; index++) {
      await handleDeleteImage(productFound.images[index].public_id);
    }

    await Product.findByIdAndDelete(productId);
    revalidatePath("/admin/products");
    revalidatePath("/");
    return Response.json({
      productDeleted: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      productDeleted: false,
      message: "something went wrong while deleting product",
    });
  }
};
