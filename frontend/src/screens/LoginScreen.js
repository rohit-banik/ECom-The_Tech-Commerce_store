import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer, Loader, MessageFull } from "../components";
import { login } from "../actions/userActions";
import { motion } from "framer-motion";
import { RiEmotionSadLine } from "react-icons/ri";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const search = useLocation().search;
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

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
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <div className="flex flex-col items-center">
        <div className="md:p-0 px-4 w-full md:w-4/12">
          <h1 className="uppercase text-xl font-semibold md:text-3xl mb-3">
            Sign In
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
              <div className="md:text-lg text-sm">Email Address</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="md:mt-4 mt-2  ">
              <div className="md:text-lg text-sm">Password</div>
              <input
                className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="md:mt-5 mt-3 text-right">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-secondary-800 text-light py-2 md:py-3 w-full md:px-8 uppercase text-sm md:text-lg border hover:bg-secondary-600"
                type="submit"
              >
                Sign In
              </motion.button>
            </div>
          </form>
          <div className="mt-2">
            <h1 className="md:text-base text-sm text-primary-800">
              New Customer?{" "}
              <Link
                className="font-bold uppercase"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
