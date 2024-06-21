export const dynamic = "force-dynamic";
import dbConnect from "@/lib/config/ConnectDB";
import User from "@/lib/models/User";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import { revalidatePath } from "next/cache";
export const GET = async (req, { params }) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const userAccountId = params.userId;

    const userId = searchParams.get("userId");

    const userFound = await User.findById(userId);

    if (!userFound) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    if (userFound?.role !== process.env.ADMIN_ROLE) {
      return Response.json({ error: "Unauthorized request" }, { status: 401 });
    }
    const userDetails = await User.findById(userAccountId);
    return Response.json(userDetails);
  } catch (error) {
    return Response.json(error);
  }
};

export const PUT = async (req, { params }) => {
  try {
    await dbConnect();
    const userAccountId = params.userId;
    const updateData = await req.json();
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

    const userAccountFound = await User.findById(userAccountId);

    if (!userAccountFound) {
      return Response.json(
        { userUpdated: false, message: "Cannot find user account with id" },
        { status: 404 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userAccountId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({
        userUpdated: false,
        message: "something went wrong while updating user",
      });
    }
    revalidatePath(`/admin/user_accounts/update/${userAccountId}`);
    revalidatePath("/admin/user_accounts");
    return Response.json({
      userUpdated: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return Response.json({
      userUpdated: false,
      message: "something went wrong while updating user",
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await dbConnect();
    const userAccountId = params.userId;
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

    await User.findByIdAndDelete(userAccountId);
    revalidatePath("/admin/user_accounts");
    return Response.json({
      userDeleted: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return Response.error({
      message: "something went wrong with the server while deleting",
    });
  }
};
