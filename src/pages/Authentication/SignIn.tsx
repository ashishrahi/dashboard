import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Navigation/Breadcrumbs/Breadcrumb';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../store/adminSlice';
import { Eye, EyeOff } from 'react-feather';
import LogoDark from '../../images/logo/logo-dark.svg'
import Logo from '../../images/logo/logo.svg';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Google OAuth

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(loginAdmin(values));
    },
  });

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleLoginSuccess = (response: any) => {
    const token = response.credential;
    console.log('Google token:', token);
    // Send the token to your backend for further authentication and verification
    dispatch(loginAdmin({ token }));
  };

  const handleGoogleLoginFailure = (error: any) => {
    console.error('Google Login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Breadcrumb pageName="Sign In" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              {/* Logo */}
              <div className="mb-5.5 inline-block">
                <img className="hidden dark:block" src={LogoDark} alt="Logo" />
                <img className="dark:hidden" src={Logo} alt="Logo" />
              </div>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
              </p>
            </div>
          </div>

          <div className="w-full xl:w-1/2 p-10">
            <div className="text-center mb-7">
              <h2 className="text-2xl font-semibold mb-1">Sign In</h2>
              <p className="text-sm text-gray-600">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@admin.com"
                  id="email"
                  name="email"
                  className={`w-full rounded-md border ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="mb-5 relative">
                <label className="block text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  placeholder="password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`w-full rounded-md border ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 pr-10 focus:border-indigo-500 focus:ring-indigo-500`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>

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
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
