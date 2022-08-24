import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps, FormContainer } from "../components";
import { savePaymentMethod } from "../actions/cartActions";
import { motion } from "framer-motion";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <div className="flex flex-col items-center">
        <CheckoutSteps step1 step2 step3 />
        <div className="md:w-10/12 w-full md:px-0 px-4 lg:w-4/12">
          <h1 className="text-secondary-800 uppercase text-xl font-semibold md:mt-5 mt-3 md:text-left text-center md:text-3xl mb-3">
            Payment Method
          </h1>
          <form onSubmit={submitHandler}>
            <div className="mt-2 md:mt-5">
              <div className="md:text-xl text-primary-500 text-base font-medium">
                Select Method
              </div>
              <div className="flex md:mt-2 mt-1 gap-x-4">
                <input
                  type="radio"
                  id="PayPal"
                  className="accent-primary-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={true}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="text-sm">Paypal or Credit Card</label>
              </div>
            </div>
            <div className="mt-5 md:text-left">
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

export default PaymentScreen;
