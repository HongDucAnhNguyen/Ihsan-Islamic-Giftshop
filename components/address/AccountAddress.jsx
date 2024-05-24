const AccountAddress = ({ addresses }) => {
  return addresses?.map((address) => (
    <a href={`/address/update/${address._id}`} key={address._id}>
      <div className="mb-5 gap-4">
        <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
          <div className="mr-3">
            <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
              <i className="fa fa-map-marker-alt"></i>
            </span>
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
