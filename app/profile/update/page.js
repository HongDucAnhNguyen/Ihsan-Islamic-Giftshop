import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import UpdateProfile from "@/components/auth/UpdateProfile";
import ProfileSideBar from "@/components/shared-components/ProfileSideBar";
import React from "react";
import { verifyAsAdmin } from "@/lib/helpers/adminRoutesHelper";

const page = async () => {
  const user = await getAccountSessionData();
  const isAdmin = verifyAsAdmin();
  return (
    <div>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="text-bold text-2xl">Update User</h1>
        </div>
      </section>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <ProfileSideBar isAdmin={isAdmin}></ProfileSideBar>
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                <UpdateProfile user={{ ...user }}></UpdateProfile>
              </article>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
