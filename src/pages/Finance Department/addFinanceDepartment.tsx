import React from 'react';
import { Button, TextField, IconButton } from '../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Snackbar, Alert } from '../../components/feedBack/feedBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useAddSubCategoryMutation } from '../../services/Api/subcategoryApi/mutationSubcategory';
import Autocomplete from '@mui/material/Autocomplete';
import { useCategory } from '../../services/Api/categoryApi/mutationCategory';

interface AddStateModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  categoryname: Yup.string().required('Category name is required*'),
  subcategoryname: Yup.string().required('Subcategory name is required*'),
  subcategorydescription: Yup.string().required('Subcategory description is required*'),
  priceWithUnit: Yup.string()
    .required('Price is required*')
    .matches(/^\d+(\.\d+)?\/(kg|piece)$/, 'Enter a valid format, e.g., 50/kg or 30/piece'),
  image: Yup.mixed()
    .required('Image is required*')
    .test('fileSize', 'The file is too large', (value) => value && value.size <= 2 * 1024 * 1024)
    .test('fileType', 'Unsupported file format', (value) =>
      ['image/jpeg', 'image/png', 'image/gif'].includes(value?.type)
    ),
});

const modalStyle: SxProps<Theme> = {
  width: '500px',
  height: 'auto',
  backgroundColor: '#f0f0f0',
  padding: '16px',
};

const dialogContentStyle: SxProps<Theme> = {
  backgroundColor: '#e0e0e0',
  padding: '16px',
};

const AddCategoryModal: React.FC<AddStateModalProps> = ({ open, onClose }) => {
  const { data: categoriesData, isLoading, isError } = useCategory();
  const { mutateAsync: addSubCategory } = useAddSubCategoryMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const [selectedFileName, setSelectedFileName] = React.useState('');

  const formik = useFormik({
    initialValues: {
      categoryname: '',
      subcategoryname: '',
      subcategorydescription: '',
      priceWithUnit: '',
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('categoryname', values.categoryname);
      formData.append('subcategoryname', values.subcategoryname);
      formData.append('subcategorydescription', values.subcategorydescription);
      formData.append('priceWithUnit', values.priceWithUnit);
      if (values.image) {
        formData.append('image', values.image);
      }

      try {
        await addSubCategory(formData);
        formik.resetForm();
        setSelectedFileName('');
        setSnackbarMessage('Subcategory added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onClose();
      } catch (error) {
        console.error('Failed to add Subcategory:', error);
        setSnackbarMessage('Failed to add Subcategory. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    formik.setFieldValue('image', file);
    setSelectedFileName(file ? file.name : '');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: modalStyle }}>
        <DialogTitle>
          Add New Subcategory
          <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={dialogContentStyle}>
          <form onSubmit={formik.handleSubmit}>
            {/* Handle loading, error, or Autocomplete */}
            {isLoading ? (
              <p>Loading categories...</p>
            ) : isError ? (
              <p>Error loading categories</p>
            ) : (
              <Autocomplete
                options={categoriesData.map((category: any) => ({
                  label: category.categoryname,
                  value: category._id,
                }))}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => formik.setFieldValue('categoryname', value?.value || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Select Category*"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.categoryname && Boolean(formik.errors.categoryname)}
                    helperText={formik.touched.categoryname && formik.errors.categoryname}
                  />
                )}
              />
            )}

            {/* Subcategory Name Input */}
            <TextField
              margin="dense"
              label="Subcategory Name*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('subcategoryname')}
              error={formik.touched.subcategoryname && Boolean(formik.errors.subcategoryname)}
              helperText={formik.touched.subcategoryname && formik.errors.subcategoryname}
            />

            {/* Subcategory Description Input */}
            <TextField
              margin="dense"
              label="Subcategory Description*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('subcategorydescription')}
              error={formik.touched.subcategorydescription && Boolean(formik.errors.subcategorydescription)}
              helperText={formik.touched.subcategorydescription && formik.errors.subcategorydescription}
            />

            {/* Price and Unit Input */}
            <TextField
              margin="dense"
              label="Price (e.g., 50/kg or 30/piece)*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('priceWithUnit')}
              error={formik.touched.priceWithUnit && Boolean(formik.errors.priceWithUnit)}
              helperText={formik.touched.priceWithUnit && formik.errors.priceWithUnit}
            />

            {/* File Input for Image */}
            <input
              type="file"
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              accept="image/*"
            />
            {selectedFileName && <p>Selected file: {selectedFileName}</p>}
            {formik.touched.image && formik.errors.image && (
              <div style={{ color: 'red' }}>{formik.errors.image}</div>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button label="Add" type="submit" color="success" variant="contained" onClick={formik.handleSubmit} />
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ marginTop: '24%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCategoryModal;
