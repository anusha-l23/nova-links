import React from 'react'
import { useState, useEffect } from 'react';
import Register from "../components/Registration/Register";
import Header from '../components/Header';
const BookingPage = () => {
const [loading, setloading] = useState(false);
    const renderSpinner = () => {
        return (
          <div
            className="loading-overlay text-center d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner"></div>
          </div>
        );
      };

  return (
    <>
      <div className="header-margin"></div>

      {/* <Header /> */}
      {/* End Header 1 */}
      {loading && <> {renderSpinner()}</>}
      <section className="pt-10 layout-pb-md">
        <div className="container">
        <Register />
</div>
</section>
</>
  )
}

export default BookingPage