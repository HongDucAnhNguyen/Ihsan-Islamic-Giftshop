"use client";
const AccountAddress = ({ addresses }) => {
  return addresses?.map((address) => (
    <a href={`/address/update/${address._id}`} key={address._id}>
      <div className="mb-5 gap-4">
        <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
          <div className="mr-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow mt-2 gap-5 ">
              <div className="relative">
                <img
                  className="w-8 h-8 rounded-full"
                  src={"/images/location-icon.png"}
                  alt="address"
                />
              </div>
            </div>
          </div>
          <figcaption className="text-gray-600">
            <p>
              {address.streetAddress} <br /> {address.city},{" "}
              {address.ProvinceState}, {address.zipCode}, {address.country}
              <br />
              Phone no: {address.phoneNumber}
            </p>
          </figcaption>
        </figure>
      </div>
    </a>
  ));
};

export default AccountAddress;
