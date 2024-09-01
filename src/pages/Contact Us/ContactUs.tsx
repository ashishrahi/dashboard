import React, { useState, useMemo, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import { Formik, Form, Field,  } from 'formik';
import * as Yup from 'yup';

const initialBrandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Brand One',
    visitors: 100,
    revenues: '5000',
    sales: 200,
    conversion: 5,
    status: 'Active',
  },
  // Add more brands as needed
];

const validationSchema = Yup.object({
  name: Yup.string().required('Brand name is required'),
  logo: Yup.string().required('Logo is required'),
  visitors: Yup.number().required('Visitors is required').min(0),
  revenues: Yup.string().required('Revenues is required'),
  sales: Yup.number().required('Sales is required').min(0),
  conversion: Yup.number().required('Conversion is required').min(0),
  status: Yup.string().required('Status is required'),
});

const TableOne = () => {
  const [brands, setBrands] = useState<BRAND[]>(initialBrandData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;  // Optimal number of items per page

  // Memoize paginated data for efficiency
  const paginatedBrands = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return brands.slice(start, start + itemsPerPage);
  }, [brands, currentPage, itemsPerPage]);

  const pageCount = Math.ceil(brands.length / itemsPerPage);

  // Memoize page click handler to avoid unnecessary re-renders
  const handlePageClick = useCallback((data: { selected: number }) => {
    setCurrentPage(data.selected);
  }, []);

  const openModal = useCallback((index: number | null) => {
    setEditIndex(index);
    setIsModalOpen(true);
    if (index === null) {
      resetForm();
    } else {
      setImagePreview(brands[index].logo);
    }
  }, [brands]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
  }, []);

  const handleFormSubmit = useCallback((values: BRAND) => {
    if (editIndex === null) {
      setBrands([...brands, values]);
    } else {
      const updatedBrands = [...brands];
      updatedBrands[editIndex] = values;
      setBrands(updatedBrands);
    }
    closeModal();
  }, [editIndex, brands, closeModal]);

  const deleteBrand = useCallback((index: number) => {
    setBrands(brands.filter((_, i) => i !== index));
  }, [brands]);

  const resetForm = () => {
    setImagePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue('logo', file.name);
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
      <h4 className="text-xl font-semibold mb-4">Contact Us</h4>

      {/* <button
        onClick={() => openModal(null)}
        className="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600"
      >
        Add Finance Department
      </button> */}

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
          {paginatedBrands.map((brand, index) => (
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
                          onClick={() => changeStatus(index, brand.status === 'Active' ? 'Inactive' : 'Active')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {brand.status === 'Active' ? 'Deactivate' : 'Activate'}
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

      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-4"}
        activeClassName={"text-blue-500 font-bold"}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        previousClassName={"cursor-pointer px-3 py-1 border border-gray-300 rounded-md"}
        nextClassName={"cursor-pointer px-3 py-1 border border-gray-300 rounded-md"}
      />

      {/* Modal */}
      {isModalOpen && (
        <Formik
          initialValues={{
            logo: '',
            name: '',
            visitors: 0,
            revenues: '',
            sales: 0,
            conversion: 0,
            status: 'Active',
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ setFieldValue }) => (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
                <h3 className="text-lg font-semibold mb-4">
                  {editIndex === null ? 'Add Brand' : 'Edit Brand'}
                </h3>
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Logo</label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                      className="mt-1 block w-full"
                    />
                    {imagePreview && <img src={String(imagePreview)} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Visitors</label>
                    <Field
                      type="number"
                      name="visitors"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Revenues</label>
                    <Field
                      type="text"
                      name="revenues"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sales</label>
                    <Field
                      type="number"
                      name="sales"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Conversion (%)</label>
                    <Field
                      type="number"
                      name="conversion"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <Field as="select" name="status" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      {editIndex === null ? 'Create' : 'Update'}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
};

export default TableOne;
