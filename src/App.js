import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendorForm from './components/vendorForm.js';
import DashboardLayout from './components/dashboard/dashboardLayout.js';
import Home from './pages/home.js';
import ProfileLayout from './components/profile/profileLayout.js';
import VendorLayout from './components/vendor/vendor form/vendorLayout.js';
import VendorDetailLayout from './components/vendor/vendor details/vendorDetailLayout.js';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form/:email" element={<VendorForm />} />
        <Route path="/profile" element={<ProfileLayout />} />
        <Route path="/vendor" element={<VendorLayout />} />
        <Route path="/vendor/details" element={<VendorDetailLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
