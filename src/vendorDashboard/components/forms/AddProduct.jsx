import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller = (event) => {
    const value = event.target.value === "true";
    setBestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");

      if (!loginToken || !firmId) {
        console.error("user not authenticated");
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("bestSeller", bestSeller);
      formData.append("image", image);

      category.forEach((value) => {
        formData.append("category", value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully");
      }
      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller(false);
      setImage(null);
      setDescription("");
    } catch (error) {
      alert("Failed to add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white ">
      {loading && (
        <div className="flex flex-col items-center">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p className="text-gray-700 mt-4">Please wait, your product is being added...</p>
        </div>
      )}
      {!loading && (
        <form
          className="bg-white p-8 mt-2 mb-16 ml-40 rounded-lg shadow-md w-full border-2 border-black max-w-5xl"
          onSubmit={handleAddProduct}
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Product</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Category</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="veg"
                    checked={category.includes("veg")}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  Veg
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="non-veg"
                    checked={category.includes("non-veg")}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  Non-Veg
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Best Seller</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="true"
                    checked={bestSeller === true}
                    onChange={handleBestSeller}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="false"
                    checked={bestSeller === false}
                    onChange={handleBestSeller}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600 mb-2">Image</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
