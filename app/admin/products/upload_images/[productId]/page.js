export const dynamic = "force-dynamic";
import AdminUploadProductImage from "@/components/products/AdminUploadProductImage";
import ProfileSideBar from "@/components/shared-components/ProfileSideBar";
import { verifyAsAdmin } from "@/lib/helpers/adminRoutesHelper";
import React from "react";

const page = ({ params }) => {
  const { productId } = params;
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
                <AdminUploadProductImage
                  productId={productId}
                ></AdminUploadProductImage>
              </article>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
