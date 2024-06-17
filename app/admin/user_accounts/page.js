import { verifyAsAdmin } from "@/lib/helpers/adminRoutesHelper";
import React from "react";
import ProfileSideBar from "@/components/shared-components/ProfileSideBar";
const page = async () => {
  const isAdmin = verifyAsAdmin();
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
                {/* <AdminUserAccountsList></AdminUserAccountsList> */}
              </article>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
