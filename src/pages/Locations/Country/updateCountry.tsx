// src/components/UpdateCountryModal.tsx
import React, { useEffect } from 'react';
import { Button, TextField, IconButton } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useCountryById,useUpdateMutationCountry } from '../../../services/Api/location/mutationCountry';  // Updated to query hook

interface UpdateCountryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCountry: { countryname: string }) => void;
  id: number;
}

//////////////////////////// Validation of country //////////////////////////////////////////////////////////////////

const validationSchema = Yup.object({
  countryname: Yup.string().required('Country name is required*'),
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

// //////////////////////////// Update Country //////////////////////////////////////////////
const UpdateCountryModal: React.FC<UpdateCountryModalProps> = ({ open, onClose, id }) => {
  
  const { data, isLoading, isSuccess } = useCountryById(id);  // Fetch data with query hook

  const { mutateAsync: updateCountry } = useUpdateMutationCountry() 
  const formik = useFormik({
    initialValues: {
      countryname: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Updating country with id:', id);
      
      await updateCountry({ id, values });
      onClose();
    },
    enableReinitialize: true, // Ensures formik updates when data changes
  });
//////////////////////////////////////////// fetching country //////////////////////////////////////////
  useEffect(() => {
    if (isSuccess && data) {
      formik.setValues({
        countryname: data?.countryname || '',
      });
    }
  }, [data, isSuccess]);

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: modalStyle }}>
      <DialogTitle>
        Update Country
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={dialogContentStyle}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              label="Country Name*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('countryname')}
              error={formik.touched.countryname && Boolean(formik.errors.countryname)}
              helperText={formik.touched.countryname && formik.errors.countryname}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="success" variant='outlined' onClick={formik.handleSubmit} label="Update" />
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCountryModal;
