import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer, Loader, MessageFull } from "../components";
import { register } from "../actions/userActions";
import { motion } from "framer-motion";
import { RiEmotionSadLine, RiErrorWarningFill } from "react-icons/ri";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const search = useLocation().search;
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = new URLSearchParams(search).get("redirect")
    ? new URLSearchParams(search).get("redirect")
    : "";

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <div className="flex flex-col items-center">
        <div className="md:p-0 px-4 w-full md:w-4/12">
          <h1 className="uppercase text-xl font-semibold md:text-3xl mb-3">
            Sign Up
          </h1>
          {error && (
            <MessageFull type="danger">
              <span className="flex flex-row items-center gap-2">
                <RiEmotionSadLine />
                {error}
              </span>
            </MessageFull>
          )}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Name</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Email Address</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Password</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-2 md:mt-4">
              <div className="md:text-lg text-sm">Confirm Password</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {message && (
              <div className="mt-3">
                <MessageFull type="danger">
                  <span className="flex flex-row items-center gap-2">
                    <RiErrorWarningFill />
                    {message}
                  </span>
                </MessageFull>
              </div>
            )}
            <div className="mt-5 text-right">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-secondary-800 text-light py-2 md:py-3 w-full md:px-8 uppercase text-sm md:text-lg border hover:bg-secondary-600"
                type="submit"
              >
                Sign Up
              </motion.button>
            </div>
          </form>
          <div className="mt-2">
            <h1 className="md:text-base text-sm text-primary-800">
              Already have an Account?{" "}
              <Link
                className="font-bold uppercase"
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
              >
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
