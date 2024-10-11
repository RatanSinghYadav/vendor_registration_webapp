import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from './components/vendor/vendor form/vendorForm.js';
import Layout from './components/layout/layout.js';
import VendorDetail from './components/vendor/vendor details/vendorDetail.js';
import Dashboard from './components/dashboard/dashboard.js';
import Profile from './components/profile/profile.js';
import EditVendor from './components/vendor/vendor edit/editVendor.js';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* vendor route */}
        {/* vendor form route for vendor */}
        <Route path='/vendor/form/:id' element={<VendorForm />} />


        {/* user route */}

        {/* home route */}
        <Route path='/' element={<Layout />}>
          <Route index exact element={<Dashboard />} />
        </Route>
        {/* form route */}
        <Route path='/vendor/form/' element={<Layout />}>
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
