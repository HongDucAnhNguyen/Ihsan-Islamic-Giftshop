export const dynamic = "force-dynamic";
import UpdateAddress from "@/ui-components/address/UpdateAddress";

const getAddressDetails = async (addressId) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/address/${addressId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    return data.addressDetails;
  } catch (error) {}
};

const page = async ({ params }) => {
  const addressDetails = await getAddressDetails(params.addressId);
  return (
    <div>
      <UpdateAddress address={addressDetails}></UpdateAddress>
    </div>
  );
};

export default page;
