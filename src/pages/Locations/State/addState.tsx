import React from 'react';
import { Button, TextField, IconButton,Autocomplete  } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useAddCountry } from '../../../services/fetchApi/locationApi/mutationCountry';

interface AddCountryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCountry: { countryname: string; state: string }) => void;
}

const validationSchema = Yup.object({
  countryname: Yup.string().required('Country name is required*'),
  state: Yup.string().required('State is required*'),
});

const modalStyle: SxProps<Theme> = {
  width: '500px',
  height: '350px',
  backgroundColor: '#f0f0f0',
  padding: '16px',
};

const dialogContentStyle: SxProps<Theme> = {
  backgroundColor: '#e0e0e0',
  padding: '16px',
};

const countries = [
  { label: 'United States' },
  { label: 'Canada' },
  { label: 'Mexico' },
  // Add more countries as needed
];

const AddCountryModal: React.FC<AddCountryModalProps> = ({ open, onClose, onAdd }) => {
  const { mutateAsync: addCountry } = useAddCountryMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const formik = useFormik({
    initialValues: {
      countryname: '',
      state: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Submitting form with values:', values); // Debug log
      try {
        await addCountry(values);
        formik.resetForm(); // Reset the form fields after successful submission
        setSnackbarMessage('Country and state added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onClose();
      } catch (error) {
        console.error('Failed to add country:', error); // Debug log
        setSnackbarMessage('Failed to add country. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    },
  });

  const handleSnackbarClose = () => {
    console.log('Snackbar closing'); // Debug log
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: modalStyle }}
      >
        <DialogTitle>
          Add New Country and State
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
            {/* Autocomplete for Country */}
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  margin="dense"
                  variant="outlined"
                  error={formik.touched.countryname && Boolean(formik.errors.countryname)}
                  helperText={formik.touched.countryname && formik.errors.countryname}
                  {...formik.getFieldProps('countryname')}
                />
              )}
            />

            {/* Text field for State */}
            <TextField
              margin="dense"
              label="State"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('state')}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="success" onClick={() => formik.handleSubmit()} label="Add" />
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCountryModal;
