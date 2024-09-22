import React, { useEffect } from 'react';
import { Button, IconButton } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useStateById, useUpdateMutationState } from '../../../services/Api/location/mutationState';
import { useCountry } from '../../../services/Api/location/mutationCountry';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface UpdateCountryModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
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
  maxHeight: '300px', // Set max height for scrolling
  overflowY: 'auto',   // Enable vertical scrolling
};

const UpdateCountryModal: React.FC<UpdateCountryModalProps> = ({ open, onClose, id }) => {
  const { data, isLoading, isSuccess } = useStateById(id);
  const { mutateAsync: updateState } = useUpdateMutationState();
  const { data: countryData, isLoading: isCountryLoading } = useCountry();

  const formik = useFormik({
    initialValues: {
      countryname: '',
      statename: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await updateState({ id, values });
      onClose();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isSuccess && data) {
      formik.setValues({
        countryname: data.countryname || '',
        statename: data.statename || '',
      });
    }
  }, [data, isSuccess]);

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: modalStyle }}>
      <DialogTitle>
        Update State
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
          <CircularProgress />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Autocomplete
              sx={{ marginTop: '4%' }}
              options={countryData || []}
              getOptionLabel={(option) => option.countryname || ''}
              value={countryData?.find(country => country.countryname === formik.values.countryname) || null} // Set the selected value
              onChange={(event, newValue) => {
                formik.setFieldValue('countryname', newValue ? newValue.countryname : '');
                formik.setFieldValue('statename', ''); // Reset state when country changes
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country Name*"
                  error={formik.touched.countryname && Boolean(formik.errors.countryname)}
                  helperText={formik.touched.countryname && formik.errors.countryname}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isCountryLoading ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <TextField
              margin="dense"
              label="State Name*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('statename')}
              error={formik.touched.statename && Boolean(formik.errors.statename)}
              helperText={formik.touched.statename && formik.errors.statename}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          label='Update'
          type="submit"
          color="success"
          variant="contained"
          disabled={formik.isSubmitting} // Disable button when submitting
          onClick={formik.handleSubmit} // Handle submit on button click
        >
          {formik.isSubmitting ? <CircularProgress size={20} /> : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCountryModal;
