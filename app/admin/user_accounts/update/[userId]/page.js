export const dynamic = "force-dynamic";
import ProfileSideBar from "@/components/shared-components/ProfileSideBar";
import AdminUpdateUser from "@/components/user-accounts/AdminUpdateUser";
import { verifyAsAdmin } from "@/lib/helpers/adminRoutesHelper";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import React from "react";
const getUserAccountDetails = async (userAccountId, isAdmin) => {
  try {
    if (isAdmin) {
      const accountSessionData = await getAccountSessionData();
      const response = await fetch(
        `${process.env.BASE_URL}/api/admin/user_accounts/${userAccountId}?userId=${accountSessionData.userId}`
      );

      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
const page = async ({ params }) => {
  const { userId } = params;

  const isAdmin = verifyAsAdmin();
  const userAccountDetails = await getUserAccountDetails(
    userId,

    isAdmin
  );
  return (
    <div>
      <section className="py-5 sm:py-7 bg-green-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="text-bold text-2xl">Admin Dashboard</h1>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <ProfileSideBar isAdmin={isAdmin}></ProfileSideBar>
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <AdminUpdateUser user={userAccountDetails}></AdminUpdateUser>
              </article>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
