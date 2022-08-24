import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { ImCart, ImProfile } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import { MdAdminPanelSettings } from "react-icons/md";
import SearchBox from "./SearchBox";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(false);
  const [isAdminMenu, setIsAdminMenu] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const openMenu = () => {
    setIsMenu(!isMenu);
    setIsAdminMenu(false);
  };
  const openAdminMenu = () => {
    setIsAdminMenu(!isAdminMenu);
    setIsMenu(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    setIsMenu(false);
    setIsAdminMenu(false);
  };

  return (
    <div className="fixed z-50 w-screen bg-secondary-800 md:py-3 px-6 lg:px-16 text-light shadow-md">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full">
        {/* Brand */}
        <Link
          to={"/"}
          className="flex items-center"
          onClick={() => setIsMenu(false)}
        >
          <motion.p
            whileTap={{ scale: 0.9 }}
            className="text-4xl font-bold"
            id="brand"
          >
            <span className="text-primary-500">EC</span>om
          </motion.p>
        </Link>
        {/* <Route render={() => <SearchBox history={history}} /> */}
        <ul className="flex items-center gap-3 lg:gap-10 ml-auto">
          <SearchBox />

          {/* Cart */}
          <Link to={`/cart`}>
            <motion.li
              whileTap={{ scale: 0.9 }}
              className="text-base cursor-pointer flex items-center justify-center uppercase"
              // onClick={(() => setIsMenu(false), () => setIsAdminMenu(false))}
            >
              <ImCart className="text-2xl mx-2 text-light hover:text-primary-500 cursor-pointer" />
              Cart
              {cartItems.length >= 0 ? (
                <div className="w-5 h-5 ml-1 rounded-full bg-primary-500 flex items-center justify-center">
                  <p className="text-xs text-light font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              ) : (
                ""
              )}
            </motion.li>
          </Link>
          {/* Admin Menu */}
          {userInfo && userInfo.isAdmin && (
            <div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className=" flex flex-row cursor-pointer uppercase"
                onClick={openAdminMenu}
              >
                <MdAdminPanelSettings className="text-2xl mr-1 hover:text-primary-500" />
                Admin Panel
              </motion.div>
              {isAdminMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-40 bg-light shadow-md rounded-md flex flex-col absolute top-14 right-64 text-secondary-800 text-lg"
                >
                  <Link
                    className="py-3 text-secondary-900 rounded-t-md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsAdminMenu(false)}
                    to={"/admin/userlist"}
                  >
                    <FaUsers /> Users
                  </Link>
                  <Link
                    className="py-3 text-secondary-900 md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsAdminMenu(false)}
                    to={"/admin/productlist"}
                  >
                    <FaUsers /> Products
                  </Link>
                  <Link
                    className="py-3 text-secondary-900 rounded-b-md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsAdminMenu(false)}
                    to={"/admin/orderlist"}
                  >
                    <FaUsers /> Orders
                  </Link>
                </motion.div>
              )}
            </div>
          )}
          {/* User Menu & Login */}
          {userInfo ? (
            <div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className=" flex flex-row cursor-pointer uppercase"
                onClick={openMenu}
              >
                <FaUserCircle className="text-2xl mr-1 hover:text-primary-500" />
                Hi, {userInfo.name}
              </motion.div>
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-44 bg-light shadow-md rounded-md flex flex-col absolute top-14 right-14 text-secondary text-lg"
                >
                  <Link
                    className="py-3 text-secondary-900 rounded-t-md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsMenu(false)}
                    to={"/profile"}
                  >
                    <ImProfile /> My Profile
                  </Link>
                  <div
                    className="py-3 text-secondary-900 rounded-b-md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out "
                    onClick={logoutHandler}
                  >
                    <AiOutlineLogout />
                    Logout
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <Link to={"/login"} onClick={() => setIsMenu(false)}>
              <motion.li
                whileTap={{ scale: 0.9 }}
                className="text-base cursor-pointer flex items-center justify-center uppercase"
              >
                <FaUserCircle className="text-2xl mx-1 cursor-pointer hover:text-primary-500" />{" "}
                Sign In
              </motion.li>
            </Link>
          )}
        </ul>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full py-3">
        {/* Brand */}
        <Link
          to={"/"}
          className="flex items-center"
          onClick={() => setIsMenu(false)}
        >
          <motion.p
            whileTap={{ scale: 0.9 }}
            className="text-3xl font-bold"
            id="brand"
          >
            <span className="text-primary-500">EC</span>om
          </motion.p>
        </Link>
        <ul className="flex items-center ml-auto gap-2">
          {/* <button
            className="text-2xl text-light hover:text-primary-500 cursor-pointer"
            onClick={openSearch}
          >
            <BiSearchAlt />
          </button> */}
          {/* Cart */}
          <SearchBox />

          <Link to={`/cart`}>
            <li className="text-sm cursor-pointer flex items-center justify-center uppercase">
              <ImCart className="text-xl text-light hover:text-primary-500 cursor-pointer" />

              {cartItems.length >= 0 ? (
                <div className="relative -top-3 right-2  w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center">
                  <p className="text-xs text-light font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              ) : (
                ""
              )}
            </li>
          </Link>
          {/* Admin Menu */}
          {userInfo && userInfo.isAdmin && (
            <div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className=" flex flex-row cursor-pointer uppercase"
                onClick={openAdminMenu}
              >
                <MdAdminPanelSettings className="text-2xl hover:text-primary-500" />
              </motion.div>
              {isAdminMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-40 bg-light shadow-md rounded-md flex flex-col absolute top-14 right-1 text-secondary-800 text-lg"
                >
                  <Link
                    className="py-3 text-secondary-900 rounded-t-md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsAdminMenu(false)}
                    to={"/admin/userlist"}
                  >
                    <FaUsers /> Users
                  </Link>
                  <Link
                    className="py-3 text-secondary-900 md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsAdminMenu(false)}
                    to={"/admin/productlist"}
                  >
                    <FaUsers /> Products
                  </Link>
                  <Link
                    className="py-3 text-secondary-900 rounded-b-md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsAdminMenu(false)}
                    to={"/admin/orderlist"}
                  >
                    <FaUsers /> Orders
                  </Link>
                </motion.div>
              )}
            </div>
          )}
          {/* User Menu & Login */}
          {userInfo ? (
            <div>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className=" flex flex-row cursor-pointer uppercase"
                onClick={openMenu}
              >
                <FaUserCircle className="text-xl hover:text-primary-500" />
              </motion.div>
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-52 bg-light shadow-md rounded-md flex flex-col absolute top-14 right-1 text-secondary-800 text-lg"
                >
                  <div className="bg-primary-200 text-secondary-800 rounded-t-md">
                    <div className="text-center py-2">
                      Hi, <span className="font-semibold">{userInfo.name}</span>
                    </div>
                  </div>
                  <Link
                    className="py-3 flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
                    onClick={() => setIsMenu(false)}
                    to={"/profile"}
                  >
                    <ImProfile /> My Profile
                  </Link>
                  <div
                    className="py-2 rounded-b-md flex justify-center items-center gap-3 cursor-pointer hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out "
                    onClick={logoutHandler}
                  >
                    <AiOutlineLogout />
                    Logout
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <Link to={"/login"} onClick={() => setIsMenu(false)}>
              <motion.li
                whileTap={{ scale: 0.9 }}
                className="text-base cursor-pointer flex items-center justify-center uppercase"
              >
                <FaUserCircle className="text-2xl mx-1 cursor-pointer hover:text-primary-500" />{" "}
              </motion.li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
