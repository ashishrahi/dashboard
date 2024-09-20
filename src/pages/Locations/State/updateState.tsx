// src/components/AddCountryModal.tsx
import React from 'react';
import { Button, TextField, IconButton } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import {useUpdateCountryMutation,useCountryByIdMutation} from '../../../services/fetchApi/locationApi/mutationCountry'


interface UpdateCountryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newCountry: { countryname: string }) => void;
  id:number
}

const validationSchema = Yup.object({
  name: Yup.string().required('Country name is required*'),
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

const UpdateCountryModal: React.FC<UpdateCountryModalProps> = ({ open, onClose,id }) => {
 const {mutateAsync:updateCountry} = useUpdateCountryMutation()
 const {data} = useCountryByIdMutation(id)
   console.log(data) 


  const formik = useFormik({
    initialValues: {
      countryname: '',
    },
    validationSchema,
    onSubmit:async (values) => {
      console.log(id)
      await updateCountry({id,values});
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
            {...formik.getFieldProps('countryname')}
            error={formik.touched.countryname && Boolean(formik.errors.countryname)}
            helperText={formik.touched.countryname && formik.errors.countryname}
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
