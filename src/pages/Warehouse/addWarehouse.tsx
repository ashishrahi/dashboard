import React, { useState } from 'react';
import { Button, TextField, IconButton, MenuItem } from '../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { Box, Avatar, Typography, Select, InputLabel, FormControl } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import { useAddWarehouseMutation } from '../../services/Api/warehouseApi/mutationWarehouse';

interface WarehouseRegistrationProps {
  open: boolean;
  onClose: () => void;
  onRegister: (warehouseData: FormData) => void; // Update here
}

const validationSchema = Yup.object({
  name: Yup.string().required('Warehouse name is required*'),
  email: Yup.string().email('Invalid email address').required('Email is required*'),
  mobile: Yup.string().required('Mobile number is required*'),
  password: Yup.string().required('Password is required*'),
  type: Yup.string().required('Warehouse type is required*'),
  house: Yup.string().required('House is required*'),
  pincode: Yup.string().required('Pincode is required*'),
  city: Yup.string().required('City is required*'),
  country: Yup.string().required('Country is required*'),
});

const modalStyle: SxProps<Theme> = {
  width: '500px',
  height: '600px',
  backgroundColor: '#f0f0f0',
  padding: '16px',
};

const dialogContentStyle: SxProps<Theme> = {
  backgroundColor: '#e0e0e0',
  padding: '16px',
};

const closeIconStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: '#000',
};

const WarehouseRegistration: React.FC<WarehouseRegistrationProps> = ({ open, onClose, onRegister }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { mutateAsync: addWarehouse } = useAddWarehouseMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      type: '',
      house: '',
      pincode: '',
      city: '',
      country: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      const { name, email, mobile, password, type, house, pincode, city, country } = values;

      // Append form fields to FormData
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('password', password);
      formData.append('type', type);
      formData.append('address[house]', house);
      formData.append('address[pincode]', pincode);
      formData.append('address[city]', city);
      formData.append('address[country]', country);

      // Append the image file if it exists
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      try {
        await addWarehouse(formData);
        formik.resetForm(); // Reset form fields
        setSelectedImage(null); // Reset selected image
        onClose();
      } catch (error) {
        console.error('Failed to add warehouse:', error);
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: modalStyle }}
    >
      <DialogTitle>
        Warehouse Registration
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={closeIconStyle}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={dialogContentStyle}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="dense"
            label="Warehouse Name"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="dense"
            label="Mobile"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('mobile')}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Warehouse Type</InputLabel>
            <Select
              label="Warehouse Type"
              {...formik.getFieldProps('type')}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <MenuItem value="Main">Main</MenuItem>
              <MenuItem value="Sub">Sub</MenuItem>
            </Select>
            {formik.touched.type && formik.errors.type && (
              <Typography variant="body2" color="error">
                {formik.errors.type}
              </Typography>
            )}
          </FormControl>

          <TextField
            margin="dense"
            label="House"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('house')}
            error={formik.touched.house && Boolean(formik.errors.house)}
            helperText={formik.touched.house && formik.errors.house}
          />
          <TextField
            margin="dense"
            label="Pincode"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('pincode')}
            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
            helperText={formik.touched.pincode && formik.errors.pincode}
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('city')}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            margin="dense"
            label="Country"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('country')}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </form>
        
        {/* Image Upload Section */}
        <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="warehouse-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="warehouse-image-upload">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <Avatar
                alt="Warehouse Image"
                src={selectedImage ? URL.createObjectURL(selectedImage) : undefined}
                sx={{ width: 100, height: 100 }}
              />
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button label='Register' color="success" onClick={() => formik.handleSubmit()}>Register</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarehouseRegistration;
