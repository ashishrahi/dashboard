import React from 'react';
import { Button, TextField, IconButton } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Snackbar, Alert } from '../../../components/feedBack/feedBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useAddCategoryMutation } from '../../../services/Api/categoryApi/mutationCategory';

interface AddStateModalProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  categoryname: Yup.string().required('Category name is required*'),
  categorydescription: Yup.string().required('Category description is required*'),
  image: Yup.mixed()
    .required('Image is required*')
    .test('fileSize', 'The file is too large', (value) => value && value.size <= 2 * 1024 * 1024) // Limit to 2MB
    .test('fileType', 'Unsupported file format', (value) =>
      ['image/jpeg', 'image/png', 'image/gif'].includes(value?.type)
    ),
});

const modalStyle: SxProps<Theme> = {
  width: '500px',
  height: '300px',
  backgroundColor: '#f0f0f0',
  padding: '16px',
};

const dialogContentStyle: SxProps<Theme> = {
  backgroundColor: '#e0e0e0',
  padding: '16px',
};

const AddCategoryModal: React.FC<AddStateModalProps> = ({ open, onClose }) => {
  const { mutateAsync: addCategory } = useAddCategoryMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const [selectedFileName, setSelectedFileName] = React.useState('');

  const formik = useFormik({
    initialValues: {
      categoryname: '',
      categorydescription: '',
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('categoryname', values.categoryname);
      formData.append('categorydescription', values.categorydescription);
      if (values.image) {
        formData.append('image', values.image);
      }

      try {
        console.log(formData)
        await addCategory(formData);
        formik.resetForm();
        setSelectedFileName(''); // Reset the file name after successful submission
        setSnackbarMessage('Category added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onClose();
      } catch (error) {
        console.error('Failed to add Category:', error);
        setSnackbarMessage('Failed to add Category. Please try again.');
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
          Add New Category
          <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={dialogContentStyle}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              label="Category Name*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('categoryname')}
              error={formik.touched.categoryname && Boolean(formik.errors.categoryname)}
              helperText={formik.touched.categoryname && formik.errors.categoryname}
            />
            <TextField
              margin="dense"
              label="Category Description*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('categorydescription')}
              error={formik.touched.categorydescription && Boolean(formik.errors.categorydescription)}
              helperText={formik.touched.categorydescription && formik.errors.categorydescription}
            />
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
          <Button type="submit" color="success" variant="contained" onClick={formik.handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

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
