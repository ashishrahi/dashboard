import React, { useEffect } from 'react';
import { Button, IconButton, TextField } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { useCityById, useUpdateMutationCity } from '../../../services/Api/locationApi/mutationCity';
import { useCountry } from '../../../services/Api/locationApi/mutationCountry';
import { useStates } from '../../../services/Api/locationApi/mutationState';
import Autocomplete from '@mui/material/Autocomplete';

interface UpdateCountryModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const validationSchema = Yup.object({
  countryname: Yup.string().required('Country name is required*'),
  statename: Yup.string().required('State name is required*'),
  cityname: Yup.string().required('City name is required*'),
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
  maxHeight: '300px',
  overflowY: 'auto',
};

const UpdateCountryModal: React.FC<UpdateCountryModalProps> = ({ open, onClose, id }) => {
  const { data, isLoading, isSuccess } = useCityById(id);
  const { mutateAsync: updateCity } = useUpdateMutationCity();
  const { data: countryData, isLoading: isCountryLoading } = useCountry();
  const { data: stateData, isLoading: isStateLoading } = useStates();

  const formik = useFormik({
    initialValues: {
      countryname: '',
      statename: '',
      cityname: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await updateCity({ id, values });
      onClose();
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isSuccess && data) {
      formik.setValues({
        countryname: data.countryname || '',
        statename: data.statename || '',
        cityname: data.cityname || '',
      });
    }
  }, [data, isSuccess]);

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: modalStyle }}>
      <DialogTitle>
        Update City
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
            {/* Country */}
            <Autocomplete
              sx={{ marginTop: '4%' }}
              options={countryData || []}
              getOptionLabel={(option) => option.countryname || ''}
              value={countryData?.find(country => country.countryname === formik.values.countryname) || null}
              onChange={(event, newValue) => {
                formik.setFieldValue('countryname', newValue ? newValue.countryname : '');
                formik.setFieldValue('statename', ''); // Reset state when country changes
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country*"
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
            {/* State */}
            <Autocomplete
              sx={{ marginTop: '4%' }}
              options={stateData || []}
              getOptionLabel={(option) => option.statename || ''}
              value={stateData?.find(state => state.statename === formik.values.statename) || null}
              onChange={(event, newValue) => {
                formik.setFieldValue('statename', newValue ? newValue.statename : '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State*"
                  error={formik.touched.statename && Boolean(formik.errors.statename)}
                  helperText={formik.touched.statename && formik.errors.statename}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isStateLoading ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            {/* City Name */}
            <TextField
              margin="dense"
              label="City*"
              type="text"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps('cityname')}
              error={formik.touched.cityname && Boolean(formik.errors.cityname)}
              helperText={formik.touched.cityname && formik.errors.cityname}
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
