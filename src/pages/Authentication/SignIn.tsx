import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../store/adminSlice';
import { Eye, EyeOff } from 'react-feather';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Typography, CircularProgress, Container, Box } from '@mui/material';
import AdminLogo from '../../images/logo/icon.png'; // Replace with your logo path

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await dispatch(loginAdmin(values));
      setLoading(false);
    },
  });

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleLoginSuccess = (response: any) => {
    const token = response.credential;
    dispatch(loginAdmin({ token }));
  };

  const handleGoogleLoginFailure = (error: any) => {
    console.error('Google Login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Container maxWidth="xs" className="flex items-center justify-center min-h-screen bg-gray-100">
        <Box
          className="rounded-sm border border-gray-300 bg-white shadow-lg p-10"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="text-center mb-7">
            <img className="mb-5 mx-auto" src={AdminLogo} alt="Admin Logo" />
            <Typography variant="h4" className="mb-2">Sign In</Typography>
            <Typography variant="body2" color="textSecondary">Enter your credentials to access your account</Typography>
          </div>

          <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <div className="mb-5">
              <TextField
                label="Email*"
                type="email"
                placeholder="admin@admin.com"
                id="email"
                name="email"
                fullWidth
                variant="outlined"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <div className="mb-5 relative">
              <TextField
                label="password*"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                fullWidth
                variant="outlined"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handlePasswordToggle} aria-label="Toggle password visibility">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  ),
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <div className="text-center my-5">Or</div>

            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              shape="rectangular"
              theme="outline"
              text="signin_with"
              width="100%"
            />
          </form>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
