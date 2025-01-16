import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData.products);
      console.log(newProductsData);
    } catch (error) {
      console.error('Failed to fetch products', error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    productsHandler();
    console.log('this is useEffect');
  }, []);

  const deleteProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        if (confirm('Are you sure you want to delete?')) {
          alert('Product deleted successfully');
        }
      }
    } catch (error) {
      console.error('Failed to delete product');
      alert('Failed to delete product');
    }
  };

  return (
    <div className="ml-24  mt-2 p-6 border-2 border-black bg-white ">
      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products added</p>
      ) : (
        <div className="  border-2 border-black" >
          <table className="table-auto  border-collapse border border-black bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Product Name</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Price</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Image</th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{item.productName}</td>
                  <td className="px-4 py-2 border-b">₹{item.price}</td>
                  <td className="px-4 py-2 border-b">
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.productName}
                        className="w-12 h-12 rounded shadow"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => deleteProductById(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
