// src/components/UserRegistration.tsx
import React, { useState } from 'react';
import { Button, TextField, IconButton } from '../../../components/Input/Input';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SxProps, Theme } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

interface UserRegistrationProps {
  open: boolean;
  onClose: () => void;
  onRegister: (userData: {
    username: string;
    email: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    image: File | null;
  }) => void;
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required*'),
  email: Yup.string().email('Invalid email address').required('Email is required*'),
  street: Yup.string().required('Street address is required*'),
  city: Yup.string().required('City is required*'),
  state: Yup.string().required('State is required*'),
  postalCode: Yup.string().required('Postal code is required*'),
  image: Yup.mixed().required('Profile image is required*'),
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

const UserRegistration: React.FC<UserRegistrationProps> = ({ open, onClose, onRegister }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      onRegister({ ...values, image: selectedImage });
      onClose();
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      formik.setFieldValue('image', event.target.files[0]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: modalStyle }}
    >
      <DialogTitle>
        User Registration
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
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
            label="Street"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('street')}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
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
            label="State"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('state')}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
          <TextField
            margin="dense"
            label="Postal Code"
            type="text"
            fullWidth
            variant="outlined"
            {...formik.getFieldProps('postalCode')}
            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
            helperText={formik.touched.postalCode && formik.errors.postalCode}
          />
          <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image-upload">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <Avatar
                  alt="Profile Image"
                  src={selectedImage ? URL.createObjectURL(selectedImage) : undefined}
                  sx={{ width: 100, height: 100 }}
                />
                <PhotoCamera />
              </IconButton>
            </label>
            {formik.touched.image && formik.errors.image && (
              <Typography variant="body2" color="error">
                {formik.errors.image}
              </Typography>
            )}
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="success" onClick={() => formik.handleSubmit()} label='Register'>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserRegistration;
