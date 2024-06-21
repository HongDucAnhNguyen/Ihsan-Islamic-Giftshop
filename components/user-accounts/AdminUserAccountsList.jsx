"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminUserAccountsList = ({ userAccounts }) => {
  const router = useRouter();
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/user_accounts/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data?.userDeleted === true) {
        toast.success(data.message);

        router.refresh();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">Manage Users</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {userAccounts?.map((user) => (
            <tr key={user?._id} className="bg-white">
              <td className="px-6 py-2">{user?.name}</td>
              <td className="px-6 py-2">{user?.email}</td>
              <td className="px-6 py-2">{user?.role}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/user_accounts/update/${user?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    Edit
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDeleteUser(user?._id)}
                  >
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserAccountsList;
