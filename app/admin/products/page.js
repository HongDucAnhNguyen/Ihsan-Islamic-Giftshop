import AdminProductsList from "@/components/products/AdminProductsList";
import ProfileSideBar from "@/components/shared-components/ProfileSideBar";
import { verifyAsAdmin } from "@/lib/helpers/adminRoutesHelper";
import { getAccountSessionData } from "@/lib/helpers/getSessionData";
import { redirect } from "next/navigation";

const getAllProductsForAdmin = async (isAdmin) => {
  try {
    if (isAdmin) {
      const { userId } = await getAccountSessionData();
      const response = await fetch(
        `${process.env.BASE_URL}/api/admin/products?userId=${userId}`
      );
      const data = await response.json();
      return data;
    } else redirect("/profile");
  } catch (error) {
    console.log("Error fetching admin products:", error.message);
    return { products: [] };
  }
};

const page = async () => {
  const isAdmin = verifyAsAdmin();
  const { products } = await getAllProductsForAdmin(isAdmin);
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
                {products && (
                  <AdminProductsList data={products}></AdminProductsList>
                )}
              </article>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
