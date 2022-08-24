import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiTruckFill } from "react-icons/ri";
import { FaBox, FaRegCreditCard } from "react-icons/fa";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div>
      <div className="flex flex-row md:gap-2 gap-1 md:w-full justify-evenly items-center text-xs md:text-lg mb-5">
        {step1 ? (
          <button
            disabled={true}
            className="flex flex-col md:flex-row md:gap-1 items-center text-secondary-800"
          >
            <AiOutlineUser />
            Sign In
          </button>
        ) : (
          <button
            disabled={true}
            className="flex flex-col md:flex-row md:gap-1 items-center text-secondary-200"
          >
            <AiOutlineUser />
            Sign In
          </button>
        )}

        {step2 ? (
          <div className=" w-5 md:w-16 bg-secondary-500 h-0.5"></div>
        ) : (
          <div className=" w-5 md:w-16 bg-secondary-200 h-0.5"></div>
        )}

        {step2 ? (
          <Link
            to={"/shipping"}
            className="flex flex-col md:flex-row md:gap-1 items-center text-secondary-800"
          >
            <RiTruckFill />
            Shipping
          </Link>
        ) : (
          <button
            disabled={true}
            className="flex flex-col md:flex-row md:gap-1 items-center text-secondary-200"
          >
            <RiTruckFill />
            Shipping
          </button>
        )}

        {step3 ? (
          <div className=" w-5 md:w-16 bg-secondary-500 h-0.5"></div>
        ) : (
          <div className=" w-5 md:w-16 bg-secondary-200 h-0.5"></div>
        )}

        {step3 ? (
          <Link
            to={"/payment"}
            className="flex flex-col md:flex-row md:gap-1 items-center text-secondary-800"
          >
            <FaRegCreditCard />
            Payment
          </Link>
        ) : (
          <div>
            <button
              disabled={true}
              className="text-secondary-200 flex flex-col md:flex-row md:gap-1 items-center"
            >
              <FaRegCreditCard />
              Payment
            </button>
          </div>
        )}

        {step4 ? (
          <div className=" w-5 md:w-16 bg-secondary-500 h-0.5"></div>
        ) : (
          <div className=" w-5 md:w-16 bg-secondary-200 h-0.5"></div>
        )}

        {step4 ? (
          <Link
            to={"/placeorder"}
            className="text-secondary-800 flex md:gap-1 flex-col md:flex-row items-center"
          >
            <FaBox />
            Place Order
          </Link>
        ) : (
          <button
            disabled={true}
            className="text-secondary-200 flex md:gap-1 flex-col md:flex-row items-center"
          >
            <FaBox />
            Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
