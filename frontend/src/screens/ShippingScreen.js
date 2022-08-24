import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps, FormContainer } from "../components";
import { saveShippingAddress } from "../actions/cartActions";
import { motion } from "framer-motion";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ phone, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <FormContainer>
      <div className="flex flex-col items-center">
        <CheckoutSteps step1 step2 />
        <div className="md:w-10/12 w-full md:px-0 px-4 lg:w-4/12">
          <h1 className="uppercase text-xl font-semibold md:text-3xl mb-3">
            Shipping
          </h1>
          <form onSubmit={submitHandler}>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Contact Number</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="number"
                placeholder="Enter phone number"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Address</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">City</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Postal Code</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Country</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="mt-5 md:text-right">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-secondary-800 text-light py-2 md:py-3 w-full md:w-fit md:px-8 uppercase text-sm md:text-lg border hover:bg-secondary-600"
                type="submit"
              >
                Continue
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default ShippingScreen;
