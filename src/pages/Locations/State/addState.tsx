import React, { useEffect } from 'react';
import { Button, TextField, IconButton, } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import {Snackbar,Alert} from '../../../components/feedBack/feedBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useAddStateMutation } from '../../../services/Api/locationApi/mutationState';
import { useCountry } from '../../../services/Api/locationApi/mutationCountry';
import {Autocomplete} from '@mui/material';
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
  height: '300px',
  backgroundColor: '#f0f0f0',
  padding: '16px',
};

const dialogContentStyle: SxProps<Theme> = {
  backgroundColor: '#e0e0e0',
  padding: '16px',
};

// Dummy list of countries for autocomplete

const AddCountryModal: React.FC<AddStateModalProps> = ({ open, onClose, onAdd }) => {
  const { mutateAsync: addState } = useAddStateMutation();
  const { data: countriesData } = useCountry(); 
const[countrylist,setCountryList] = React.useState([])
console.log(countrylist)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  useEffect(() => {
    if(countriesData){
      setCountryList(countriesData.map(c=>c.countryname))
    }
  }, [countriesData])
  



  const formik = useFormik({
    initialValues: {
      statename: '',
      countryname: '', // Adding countryname to form state
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Submitting form with values:', values); // Debug log
      try {
        await addState(values);
        formik.resetForm(); // Reset the form fields after successful submission
        setSnackbarMessage('State added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        onClose();
      } catch (error) {
        console.error('Failed to add State:', error); // Debug log
        setSnackbarMessage('Failed to add State. Please try again.');
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
          Add New State
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
          

            <Autocomplete
              options={countrylist}
              getOptionLabel={(option) => option}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country*"
                  margin="dense"
                  error={formik.touched.countryname && Boolean(formik.errors.countryname)}
                  helperText={formik.touched.countryname && formik.errors.countryname}
                />
              )}
              value={formik.values.countryname}
              onChange={(event, value) => formik.setFieldValue('countryname', value)}
              onBlur={formik.handleBlur}
            />
            {/* State */}
            <TextField
              margin="dense"
              label="State*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('statename')}
              error={formik.touched.statename && Boolean(formik.errors.statename)}
              helperText={formik.touched.statename && formik.errors.statename}
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="success" variant='contained' onClick={() => formik.handleSubmit()} label='Add'/>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{marginTop:'24%'}}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCountryModal;
