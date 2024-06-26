"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminUploadProductImage = ({ productId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleUploadImages = async (formData, productId) => {
    try {
      if (images.length === 0) {
        toast.error("Please select image for your product");
        return;
      }

      const response = await fetch(
        `/api/admin/products/upload_images/${productId}`,
        {
          method: "POST",

          body: formData,
        }
      );
      const data = await response.json();
      if (data?.productImagesUpdated === true) {
        toast.success(data.message);
        router.push(`/product/${productId}`);
        router.refresh();
      } else toast.error(data.message);
    } catch (error) {
      toast.error("something went wrong with the server while uploading image");
    }
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      setImages((oldArray) => [...oldArray, file]);
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("image", image);
    });

    await handleUploadImages(formData, productId);

    setLoading(false);
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-20 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-3 text-2xl font-semibold">Upload Product Images</h2>

        <p>
          Please select all product images in one go, you cannot add them one by
          one
        </p>

        <div className="mb-4 flex flex-col md:flex-row">
          <div className="w-full">
            <input
              className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
              type="file"
              id="formFile"
              multiple
              onChange={onChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 my-5">
          {imagesPreview?.map((img) => (
            <Image
              src={img}
              key={img}
              alt="Preview"
              className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
              width="50"
              height="50"
            />
          ))}
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-lime-600 border border-transparent rounded-md hover:bg-lime-700"
          disabled={loading ? true : false}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AdminUploadProductImage;
