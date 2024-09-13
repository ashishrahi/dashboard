// src/components/AddCountryModal.tsx
import React from 'react';
import { Button, TextField, IconButton } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import {useCountriesQuery} from '../../../services/fetchApi/locationApi/mutationCountry'

interface UpdateCountryModalProps {
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

const UpdateCountryModal: React.FC<UpdateCountryModalProps> = ({ open, onClose, onAdd }) => {
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
      <DialogTitle>
        Update New Country
        <IconButton 
          aria-label="close" 
          onClick={onClose} 
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
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
        <Button type="submit" color="success" onClick={() => formik.handleSubmit()} label='Update'/>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCountryModal;
