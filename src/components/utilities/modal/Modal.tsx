// src/components/AddCountryModal.tsx
import React from 'react';
import { Button, TextField } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';

interface AddCountryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCountry: { name: string }) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Country name is required*'),
});

const modalStyle: SxProps<Theme> = {
  width: '500px',
  height: '300px',
  backgroundColor: '#f0f0f0', // Set background color here
  padding: '16px', // Add padding if needed
};

const dialogContentStyle: SxProps<Theme> = {
  backgroundColor: '#e0e0e0', // Set background color for the content area
  padding: '16px', // Padding for content
};

const AddCountryModal: React.FC<AddCountryModalProps> = ({ open, onClose, onAdd }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onAdd(values);
      onClose();
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: modalStyle }}
    >
      <DialogTitle>Add New Country</DialogTitle>
      <DialogContent sx={dialogContentStyle}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            label="Country Name"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" label='Cancel'>
          Cancel
        </Button>
        <Button type="submit" color="success" onClick={() => formik.handleSubmit()} label='Add'>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCountryModal;
