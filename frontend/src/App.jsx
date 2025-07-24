import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import FarmerSignupForm from "./Components/FarmerSignupForm";
import FarmerLogin from "./Components/FarmerLogin";
import DistributorLogin from "./Components/DistributorLogin";
import DistributorSignup from "./Components/DistributorSignup";
import RetailerSignup from "./Components/RetailerSignup";
import RetailerLogin from "./Components/RetailerLogin";
import CustomerSignup from "./Components/CustomerSignup";
import CustomerLogin from "./Components/CustomerLogin";
import AddVegetables from "./Components/AddVegetables";
import ShowVegetables from "./Components/ShowVegetables";
import ShowIngredientsPage from "./Components/ShowIngredientsPage";
import GenerateQR from "./Components/GenerateQR";
import CustomerDashboard from "./Components/CustomerDashboard";
import ScanQRPage from "./Components/ScanQRPage";
import BlockchainViewer from "./Components/BlockchainViewer";
function App() {
  const [farmerId, setFarmerId] = useState(null);

  const handleFarmerLogin = (id) => {
    setFarmerId(id);
    console.log("Logged in Farmer ID:", id);
  };

  return (
    <>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmer-signup" element={<FarmerSignupForm />} />
          <Route path="/farmer-login" element={<FarmerLogin onLogin={handleFarmerLogin} />} />
          <Route path="/distributor-login" element={<DistributorLogin />} />
          <Route path="/distributor-signup" element={<DistributorSignup />} />
          <Route path="/retailer-signup" element={<RetailerSignup />} />
          <Route path="/retailer-login" element={<RetailerLogin />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/add-vegetables" element={<AddVegetables farmerId={farmerId} />} />
           <Route path="/showvegetables" element={<ShowVegetables />} />
           <Route path="/ingredients" element={<ShowIngredientsPage />} />
        <Route path="/generateqr/:id" element={<GenerateQR />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
         <Route path="/customer/scan" element={<ScanQRPage />} /> {/* NEW */}
         <Route path="/blockchain" element={<BlockchainViewer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
