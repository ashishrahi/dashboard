import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector, UseSelector } from 'react-redux';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import Orders from './pages/Orders/Orders';


import Warehouse from './pages/Warehouse/Warehouse';
import Activewarehouse from './pages/Warehouse/ActiveWarehouse'
import InactiveWarehouse from './pages/Warehouse/InactiveWarehouse'

import Subcategory from './pages/Sub Category/SubCategory';
import ActiveSubcategory from './pages/Sub Category/ActiveSubCategory'
import InactiveSubcategory from './pages/Sub Category/InActiveSubcategory'

import Drivers from './pages/Drivers/Drivers';
import ActiveDriver from './pages/Drivers/ActiveDrivers'
import InactiveDriver from './pages/Drivers/InactiveDrivers'

import DefaultLayout from './layout/DefaultLayout';

import Users from '../src/pages/Users/Users';
import ActiveUser from './pages/Users/ActiveUser';
import InActiveUser from './pages/Users/InActiveUser';

import Category from '../src/pages/Category/Category';
import ActiveCategory from './pages/Category/ActiveCategory'
import InactiveCategory from './pages/Category/InactiveCategory'

import PaymentRequest from './pages/Payment Request/PaymentRequest';
import Pending from './pages/Payment Request/Pending'
import Transferred from './pages/Payment Request/Transferred'

import RoleMangers from './pages/Role Mangers/RoleMangers';
import RoleCreation from './pages/Role Mangers/RoleCreation';


import Collection from '../src/pages/Collections/Collections';
import Today from '../src/pages/Collections/Today';

import ContactUs from './pages/Contact Us/ContactUs';

import Profile from './components/Profile';
import Settings from './components/Settings';
import SignIn from './pages/Authentication/SignIn';

import FinanceDepartment from './pages/Finance Department/FinanceDepartment'
import ActiveFinanceDepartment from './pages/Finance Department/ActiveFinanceDepart'
import InactiveFinanceDepartment from './pages/Finance Department/InactiveFinanceDepart'
  // Location
import Country from './pages/Locations/Country/Country'
import State from './pages/Locations/State'
import City from './pages/Locations/City'
import Pincode from './pages/Locations/Pincode'

// User App Component
import About from './pages/UserAppContent/Aboutus'
import PrivacyPolicy from './pages/UserAppContent/PrivacyPolicy'
import Contactus from './pages/UserAppContent/Contactus'
import TermsAndConditions from './pages/UserAppContent/TermsandConditions'
import ContactSupport from './pages/UserAppContent/ContactSupport'
import Howitworks from './pages/UserAppContent/HowitWorks'
import Scrapimpact from './pages/UserAppContent/ImpactScrap'



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const isAuthenticate = useSelector((state)=>state.admin.isAuthenticated); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticate ? element : <Navigate to="/signin" replace />;
  };

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Signin */}
      <Route path="/signin" element={<><PageTitle title="Signin" /><SignIn /></>} />

      {/* Other routes wrapped with DefaultLayout */}
      <Route
        path="*"
        element={
          <DefaultLayout>
            <Routes>
              {/* Dashboard */}
              <Route index  element={<ProtectedRoute element={<><PageTitle title="Dashboard" /> <ECommerce /></>} />} />

            {/*Locations */}
             <Route path="/location/country" element={<ProtectedRoute element={<><PageTitle title="Country" /><Country /></>} />} />
              <Route path="/location/state" element={<ProtectedRoute element={<><PageTitle title="State" /><State/></>} />} />
              <Route path="/location/city" element={<ProtectedRoute element={<><PageTitle title="City" /><City /></>} />} />
              <Route path="/location/pincode" element={<ProtectedRoute element={<><PageTitle title="Pincode" /><Pincode /></>} />} />


              {/* Users */}
              <Route path="/users" element={<ProtectedRoute element={<><PageTitle title="Users" /><Users /></>} />} />
              <Route path="/profile" element={<ProtectedRoute element={<><PageTitle title="Profile" /><Profile /></>} />} />
              <Route path="/settings" element={<ProtectedRoute element={<><PageTitle title="Settings" /><Settings /></>} />} />
              <Route path="/users/active" element={<ProtectedRoute element={<><PageTitle title="Active Users" /><ActiveUser /></>} />} />
              <Route path="/users/inactive" element={<ProtectedRoute element={<><PageTitle title="Inactive Users" /><InActiveUser /></>} />} />

              {/* Category */}
              <Route path="/category" element={<ProtectedRoute element={<><PageTitle title="Category" /><Category /></>} />} />
              <Route path="/category/active" element={<ProtectedRoute element={<><PageTitle title="Category" /><ActiveCategory /></>} />} />
              <Route path="/category/inactive" element={<ProtectedRoute element={<><PageTitle title="Category" /><InactiveCategory /></>} />} />

              {/* Sub Category */}
              <Route path="/subcategory" element={<ProtectedRoute element={<><PageTitle title="Subcategory" /> <Subcategory /></>} />} />
              <Route path="/subcategory/active" element={<ProtectedRoute element={<><PageTitle title="Subcategory" /> <ActiveSubcategory /></>} />} />
              <Route path="/subcategory/inactive" element={<ProtectedRoute element={<><PageTitle title="Subcategory" /> <InactiveSubcategory /></>} />} />

              {/* Orders */}
              <Route path="/orders" element={<ProtectedRoute element={<><PageTitle title="Orders" /><Orders /></>} />} />

              {/* Warehouse */}
              <Route path="/warehouse" element={<ProtectedRoute element={<><PageTitle title="Warehouse" /> <Warehouse /></>} />} />
              <Route path="/warehouse/active" element={<ProtectedRoute element={<><PageTitle title="Warehouse" /> <Activewarehouse /></>} />} />
              <Route path="/warehouse/inactive" element={<ProtectedRoute element={<><PageTitle title="Warehouse" /> <InactiveWarehouse /></>} />} />

              {/* Drivers */}
              <Route path="/drivers" element={<ProtectedRoute element={<><PageTitle title="Drivers" /> <Drivers /></>} />} />
              <Route path="/drivers/active" element={<ProtectedRoute element={<><PageTitle title="Drivers" /> <ActiveDriver /></>} />} />
              <Route path="/drivers/inactive" element={<ProtectedRoute element={<><PageTitle title="Drivers" /> <InactiveDriver /></>} />} />

              {/* Finance Department */}
              <Route path="/finacedepartment" element={<ProtectedRoute element={<><PageTitle title="Finance Department" /><FinanceDepartment /></>} />} />
              <Route path="/finacedepartment/active" element={<ProtectedRoute element={<><PageTitle title="Active Finance Department" /><ActiveFinanceDepartment /></>} />} />
              <Route path="/finacedepartment/inactive" element={<ProtectedRoute element={<><PageTitle title="Inactive Finance Department" /><InactiveFinanceDepartment /></>} />} />

              {/* Payment Request */}
              <Route path="/paymentrequest" element={<ProtectedRoute element={<><PageTitle title="Payment Request" /><PaymentRequest /></>} />} />
              <Route path="/paymentrequest/pending" element={<ProtectedRoute element={<><PageTitle title="Payment Request" /><Pending /></>} />} />
              <Route path="/paymentrequest/transferred" element={<ProtectedRoute element={<><PageTitle title="Payment Request" /><Transferred /></>} />} />
              
              {/*Role Manager  */}
              <Route path="/rolemanager" element={<ProtectedRoute element={<><PageTitle title="Role Manager" /><RoleMangers /></>} />} />
              <Route path="/rolemanager/rolecreation" element={<ProtectedRoute element={<><PageTitle title="Role Creation" /><RoleCreation /></>} />} />
              <Route path="/rolemanager/users" element={<ProtectedRoute element={<><PageTitle title="Role Manager" /><RoleMangers /></>} />} />

              {/*CollectionList  */}
              <Route path="/collectionlist" element={<ProtectedRoute element={<><PageTitle title="Collection" /><Collection /></>} />} />
              <Route path="/collectionlist/today" element={<ProtectedRoute element={<><PageTitle title="Today" /><Today /></>} />} />
              {/* Contact Us */}
              <Route path="/contactus" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              
              {/* UserApp */}
              <Route path="/userapp/privacypolicy" element={<ProtectedRoute element={<><PageTitle title="Privacy Policy" /><PrivacyPolicy /></>} />} />
              <Route path="/userapp/aboutus" element={<ProtectedRoute element={<><PageTitle title="About Us" /><About /></>} />} />
              <Route path="/userapp/contactus" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><Contactus /></>} />} />
              <Route path="/userapp/termsandconditions" element={<ProtectedRoute element={<><PageTitle title="Terms & Conditions" /><TermsAndConditions /></>} />} />
              <Route path="/userapp/contactsupport" element={<ProtectedRoute element={<><PageTitle title="Contact Support" /><ContactSupport /></>} />} />
              <Route path="/userapp/scrapimpact" element={<ProtectedRoute element={<><PageTitle title="Scrap Impact" /><Scrapimpact /></>} />} />
              <Route path="/userapp/howitworks" element={<ProtectedRoute element={<><PageTitle title="How it works" /><Howitworks /></>} />} />
            
              
              {/* VenderApp */}
              <Route path="/vendorapp/privacy-policy" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              <Route path="/vendorapp/aboutus" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              <Route path="/vendorapp/contactus" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              <Route path="/vendorapp/terms-conditions" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              <Route path="/vendorapp/contact-support" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              <Route path="/vendorapp/how-it-works" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              <Route path="/vendorapp/scrap-impact" element={<ProtectedRoute element={<><PageTitle title="Contact Us" /><ContactUs /></>} />} />
              
              {/*Auth  */}
              <Route path="/auth/signup" element={<><PageTitle title="Signup" /><SignUp /></>} />
            </Routes>
          </DefaultLayout>
        }
      />
    </Routes>
  );
}

export default App;
