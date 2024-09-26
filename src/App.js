import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from './components/vendor/vendor form/vendorForm.js';
import Home from './pages/home.js';
import Layout from './components/layout/layout.js';
import VendorDetail from './components/vendor/vendor details/vendorDetail.js';
import Dashboard from './components/dashboard/dashboard.js';
import Profile from './components/profile/profile.js';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index exact element={<Dashboard />} />
        </Route>
        <Route path='/vendor/form/:id' element={<Layout />}>
          <Route index exact element={<VendorForm />} />
        </Route>
        <Route path='/vendor' element={<Layout />}>
          <Route index exact element={<VendorForm />} />
        </Route>
        <Route path='/profile' element={<Layout />}>
          <Route index exact element={<Profile />} />
        </Route>
        <Route path="/home" element={<Home />} />
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
