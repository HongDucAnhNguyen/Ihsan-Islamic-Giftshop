import dbConnect from "@/backend/config/ConnectDB";
import { handleUploadAvatar } from "@/backend/helpers/cloudinaryUploadImage";
import { getAccountSessionData } from "@/backend/helpers/getSessionData";
import User from "@/backend/models/User";
import fs from "fs";
import { revalidatePath } from "next/cache";
export const POST = async (req) => {
  try {
    await dbConnect();
    const accountSessionData = await getAccountSessionData();
    const formData = await req.formData();

    const file = formData.get("image");
    const name = formData.get("name");
    const email = formData.get("email");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const updateProfileData = { name, email };

    const avatarDataResponse = await handleUploadAvatar(
      buffer,
      "ihsan-ecommerce/user-avatars"
    );

    //fs.unlinkSync(path);
    updateProfileData.avatar = avatarDataResponse;

    const updatedUser = await User.findByIdAndUpdate(
      accountSessionData.userId,
      updateProfileData,
      { new: true }
    );

    if (updatedUser) {
      accountSessionData.username = updatedUser.name;
      accountSessionData.userAvatar = updatedUser.avatar;
      accountSessionData.userEmail = updatedUser.email;

      await accountSessionData.save();
    }
    revalidatePath("/profile");
    return Response.json({ profileUpdated: updatedUser ? true : false });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
};
