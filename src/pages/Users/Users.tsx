import React, { useState } from 'react';
import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';

const initialBrandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
    status: 'Active',
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
    status: 'Inactive',
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
    status: 'Active',
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
    status: 'Inactive',
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
    status: 'Active',
  },
];

const TableOne = () => {
  const [brands, setBrands] = useState<BRAND[]>(initialBrandData);
  const [newBrand, setNewBrand] = useState<BRAND>({
    logo: '',
    name: '',
    visitors: 0,
    revenues: '',
    sales: 0,
    conversion: 0,
    status: 'Active',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const openModal = (index: number | null) => {
    setEditIndex(index);
    setIsModalOpen(true);
    if (index === null) {
      resetForm();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const createBrand = () => {
    if (newBrand.name) {
      setBrands([...brands, newBrand]);
      closeModal();
    }
  };

  const updateBrand = () => {
    if (editIndex !== null) {
      const updatedBrands = [...brands];
      updatedBrands[editIndex] = newBrand;
      setBrands(updatedBrands);
      closeModal();
    }
  };

  const deleteBrand = (index: number) => {
    setBrands(brands.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setNewBrand({
      logo: '',
      name: '',
      visitors: 0,
      revenues: '',
      sales: 0,
      conversion: 0,
      status: 'Active',
    });
    setImagePreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBrand({ ...newBrand, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBrand({ ...newBrand, logo: file.name });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const changeStatus = (index: number, status: string) => {
    const updatedBrands = [...brands];
    updatedBrands[index].status = status;
    setBrands(updatedBrands);
    setOpenMenuIndex(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h4 className="text-xl font-semibold mb-4">Top Channels</h4>

      <button
        onClick={() => openModal(null)}
        className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
      >
        Add Brand
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Revenues</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {brands.map((brand, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <img src={brand.logo} alt={brand.name} className="w-8 h-8 mr-3" />
                <span>{brand.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{brand.visitors}K</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">${brand.revenues}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{brand.sales}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{brand.conversion}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full ${brand.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {brand.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center relative">
                <button onClick={() => toggleMenu(index)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  •••
                </button>
                {openMenuIndex === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <button
                          onClick={() => openModal(index)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteBrand(index)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => changeStatus(index, 'Active')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Set Active
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => changeStatus(index, 'Inactive')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Set Inactive
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-blue-500 p-6 rounded shadow-lg"> {/* Modal background updated */}
            <h2 className="text-xl font-semibold mb-4 text-white">
              {editIndex !== null ? 'Edit Brand' : 'Add Brand'}
            </h2>
            <input
              type="text"
              name="name"
              value={newBrand.name}
              onChange={handleInputChange}
              placeholder="Brand Name"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              name="visitors"
              value={newBrand.visitors}
              onChange={handleInputChange}
              placeholder="Visitors (K)"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              name="revenues"
              value={newBrand.revenues}
              onChange={handleInputChange}
              placeholder="Revenues ($)"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              name="sales"
              value={newBrand.sales}
              onChange={handleInputChange}
              placeholder="Sales"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              name="conversion"
              value={newBrand.conversion}
              onChange={handleInputChange}
              placeholder="Conversion (%)"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <select
              name="status"
              value={newBrand.status}
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editIndex !== null ? updateBrand : createBrand}
                className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
              >
                {editIndex !== null ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableOne;
