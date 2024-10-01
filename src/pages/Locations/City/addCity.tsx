import React, { useEffect } from 'react';
import { Button, TextField, IconButton } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Snackbar, Alert } from '../../../components/feedBack/feedBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useAddCityMutation } from '../../../services/Api/locationApi/mutationCity';
import { useStates } from '../../../services/Api/locationApi/mutationState';
import { Autocomplete } from '@mui/material';

interface AddStateModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newState: { statename: string; countryname: string }) => void;
}

const validationSchema = Yup.object({
  statename: Yup.string().required('State name is required*'),
  countryname: Yup.string().required('Country name is required*'),
});

const modalStyle: SxProps<Theme> = {
  width: '500px',
  height: '400px',
  backgroundColor: '#f0f0f0',
  padding: '16px',
};

const dialogContentStyle: SxProps<Theme> = {
  backgroundColor: '#e0e0e0',
  padding: '16px',
};

const AddCountryModal: React.FC<AddStateModalProps> = ({ open, onClose }) => {
  const { mutateAsync: addCity } = useAddCityMutation();
  const { data: statesData } = useStates();

  const [countryList, setCountryList] = React.useState<string[]>([]);
  const [stateList, setStateList] = React.useState<string[]>([]);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  useEffect(() => {
    if (statesData) {
      const countries = Array.from(new Set(statesData.map((state: any) => state.countryname))); // Unique countries
      const states = statesData.map((state: any) => state.statename);
      setCountryList(countries);
      setStateList(states);
    }
  }, [statesData]);

  const formik = useFormik({
    initialValues: {
      statename: '',
      countryname: '',
      cityname: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await addCity(values);
        formik.resetForm();
        setSnackbarMessage('City added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onClose();
      } catch (error) {
        setSnackbarMessage('Failed to add city. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: modalStyle }}>
        <DialogTitle>
          Add New City
          <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={dialogContentStyle}>
          <form onSubmit={formik.handleSubmit}>
            <Autocomplete
              options={countryList}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country Name*"
                  margin="dense"
                  error={formik.touched.countryname && Boolean(formik.errors.countryname)}
                  helperText={formik.touched.countryname && formik.errors.countryname}
                />
              )}
              value={formik.values.countryname}
              onChange={(event, value) => formik.setFieldValue('countryname', value)}
              onBlur={formik.handleBlur}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <Autocomplete
              options={stateList}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State Name*"
                  margin="dense"
                  error={formik.touched.statename && Boolean(formik.errors.statename)}
                  helperText={formik.touched.statename && formik.errors.statename}
                />
              )}
              value={formik.values.statename}
              onChange={(event, value) => formik.setFieldValue('statename', value)}
              onBlur={formik.handleBlur}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <TextField
              margin="dense"
              label="City Name*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('cityname')}
              error={formik.touched.cityname && Boolean(formik.errors.cityname)}
              helperText={formik.touched.cityname && formik.errors.cityname}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button label='Add' type="submit" color="success" variant='contained' onClick={formik.handleSubmit}/>
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

export default AddCountryModal;
