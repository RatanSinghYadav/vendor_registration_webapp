import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from './components/vendor/vendor form/vendorForm.js';
import Layout from './components/layout/layout.js';
import VendorDetail from './components/vendor/vendor details/vendorDetail.js';
import Profile from './components/profile/profile.js';
import EditVendor from './components/vendor/vendor edit/editVendor.js';
import Login from './components/auth/login.js';
import Signup from './components/auth/signup.js';
import LE2_Dashboard from './components/dashboard/LE2_dashboard/le2_dashboard.js';
import BRLY_Dashboard from './components/dashboard/BRLY_dashboard/brly_dashboard.js';
import Admin_Dashboard from './components/dashboard/Admin_dashboard/admin_dashboard.js';
import UserManagement from './components/dashboard/Admin_dashboard/user_management.js';
import { useSelector } from 'react-redux';


const App = () => {
  const role = useSelector((state) => state.role);



  return (
    <Router>
      <Routes>
        {/* vendor route */}
        {/* vendor form route for vendor */}
        <Route path='/vendor/form/:id' element={<VendorForm />} />


        {/* public route */}

        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>

        {/* protected routes */}

        {/* Protected routes based on role */}
        {role === 'Admin' && (
          <>
            <Route path='/admin-dashboard' element={<Layout />}>
              <Route index exact element={<Admin_Dashboard />} />
            </Route>
            <Route path='/le2-dashboard' element={<Layout />}>
              <Route index exact element={<LE2_Dashboard />} />
            </Route>
            <Route path='/brly-dashboard' element={<Layout />}>
              <Route index exact element={<BRLY_Dashboard />} />
            </Route>
          </>
        )}

        {role === 'LE2' && (
          <Route path='/le2-dashboard' element={<Layout />}>
            <Route index exact element={<LE2_Dashboard />} />
          </Route>
        )}

        {role === 'BRLY' && (
          <Route path='/brly-dashboard' element={<Layout />}>
            <Route index exact element={<BRLY_Dashboard />} />
          </Route>
        )}

        {/* Super Admin Route */}
        {role === 'Admin' && (
          <Route path='/super-admin' element={<Layout />}>
            <Route index exact element={<UserManagement />} />
          </Route>
        )}

        {/* form route */}
        <Route path='/vendor/form/fill/:id' element={<Layout />}>
          <Route index exact element={<VendorForm />} />
        </Route>
        {/* profile route */}
        <Route path='/profile' element={<Layout />}>
          <Route index exact element={<Profile />} />
        </Route>

        <Route path='/vendor/edit/:id' element={<Layout />}>
          <Route index exact element={<EditVendor />} />
        </Route>

        <Route path='/vendor/details/' element={<Layout />}>
          <Route index exact element={<VendorDetail />} />
        </Route>
        <Route path='/vendor/details/:id' element={<Layout />}>
          <Route index exact element={<VendorDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;



