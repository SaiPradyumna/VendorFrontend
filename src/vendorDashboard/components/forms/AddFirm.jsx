import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const firmname = localStorage.getItem('firmName');
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginToken = localStorage.getItem('loginToken');
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);

      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
      });

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Firm added Successfully');
        setFirmName('');
        setArea('');
        setCategory([]);
        setRegion([]);
        setOffer('');
        setFile(null);
        localStorage.setItem('firmName',firmName);
        const firmId=data.firmId
        localStorage.setItem('firmId',firmId);
        window.location.reload()
      } else {
        alert(data.message || 'Failed to add Firm');
      }
    } catch (error) {
      alert('Failed to add Firm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex ml-60 mt-16 min-h-screen bg-white p-6">
      <form
        className="flex flex-col w-full max-w-6xl h-full bg-white rounded-lg border-2 border-black p-8"
        onSubmit={handleFirmSubmit}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Firm</h3>

        {/* Input Fields */}
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-600">Firm Name</label>
            <input
              type="text"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-600">Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-600">Offer</label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-600">Firm Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Categories and Regions */}
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-600">Category</label>
            <div className="flex flex-wrap mt-2">
              {['veg', 'non-veg'].map((item) => (
                <label key={item} className="mr-4 flex items-center">
                  <input
                    type="checkbox"
                    value={item}
                    checked={category.includes(item)}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-600">Region</label>
            <div className="flex flex-wrap mt-2">
              {['south-indian', 'north-indian', 'chinese', 'bakery'].map((item) => (
                <label key={item} className="mr-4 flex items-center">
                  <input
                    type="checkbox"
                    value={item}
                    checked={region.includes(item)}
                    onChange={handleRegionChange}
                    className="mr-2"
                  />
                  {item
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 mt-4"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddFirm;
