import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Navigation/Breadcrumbs/Breadcrumb';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../store/adminSlice';
import { Eye, EyeOff } from 'react-feather'; // Importing Feather icons for visibility toggle

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

  return (
    <>
      <Breadcrumb pageName="Sign In" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <div className="mb-5.5 inline-block">
                <img className="hidden dark:block" src={LogoDark} alt="Logo" />
                <img className="dark:hidden" src={Logo} alt="Logo" />
              </div>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
              </p>
              <span className="mt-15 inline-block">
                {/* SVG illustration here */}
              </span>
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
                  placeholder='admin@admin.com'
                  id="email"
                  name="email"
                  className={`w-full rounded-md border ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
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
                  placeholder='password'
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`w-full rounded-md border ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : 'border-gray-300'
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

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  {/* <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.rememberMe}
                  /> */}
                  {/* <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label> */}
                </div>
                {/* <div className="text-sm">
                  <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div> */}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
              <p className="mt-5 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
