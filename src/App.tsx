import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import Orders from './pages/Orders/Orders';
import Warehouse from './pages/Warehouse/Warehouse';
import Subcategory from './pages/Sub Category/SubCategory';
import FinanceDepartment from './pages/Finance Department/FinanceDepartment';
import Drivers from './pages/Drivers/Drivers';
import DefaultLayout from './layout/DefaultLayout';
import Users from '../src/pages/Users/Users'
import Category from '../src/pages/Category/Category'
import PaymentRequest from './pages/Payment Request/PaymentRequest';
import RoleMangers from './pages/Role Mangers/RoleMangers';
import Collection from '../src/pages/Collections/Collections'
import ContactUs from './pages/Contact Us/ContactUs';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        {/* Dashboard */}
        <Route index element={
            <>
              <PageTitle title="eCommerce Dashboard" />
              <ECommerce />
            </>
          }
        />
        {/* Users */}
            <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users" />
              <Users />
            </>
          }
        />
        {/* Category */}
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Category" />
              <Category />
            </>
          }
        />
        {/* Sub Category */}
        <Route
          path="/subcategory"
          element={
            <>board T
              <PageTitle title="Subcategory" />
              <Subcategory />
            </>
          }
        />
        {/* Orders */}
        <Route
          path="/orders"
          element={
            <>
              <PageTitle title="Orders" />
              <Orders />
            </>
          }
        />
        {/* Warehouse */}
        <Route
          path="/warehouse"
          element={
            <>
              <PageTitle title="Warehouse" />
              <Warehouse />
            </>
          }
        />
        {/* Drivers */}
        <Route
          path="/drivers"
          element={
            <>
              <PageTitle title="Tables" />
              <Drivers />
            </>
          }
        />
        {/* Finance Department */}
        <Route
          path="/finacedepartment"
          element={
            <>
              <PageTitle title="Finance Department" />
              <FinanceDepartment />
            </>
          }
        />
        {/* Payment Request */}
        <Route
          path="/paymentrequest"
          element={
            <>
              <PageTitle title="Payment Request" />
              <PaymentRequest />
            </>
          }
        />
        <Route
          path="/rolemanager"
          element={
            <>
              <PageTitle title="Role Manager" />
              <RoleMangers />
            </>
          }
        />
        <Route
          path="/collectionlist"
          element={
            <>
              <PageTitle title="Collection" />
              <Collection />
            </>
          }
        />
        <Route
          path="contactus"
          element={
            <>
              <PageTitle title="Contact Us" />
              <ContactUs />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
