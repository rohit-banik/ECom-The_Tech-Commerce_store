import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader, MessageFull } from "../components";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { motion } from "framer-motion";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoCloseCircleSharp } from "react-icons/io5";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    dispatch(listMyOrders());
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-x-10 w-full px-4 md:px-2 xl:px-40">
      <div className="flex flex-col items-center w-full md:w-5/12">
        <div className="w-full">
          <h1 className="uppercase text-lg font-semibold md:font-normal md:text-3xl mb-3">
            User Profile
          </h1>
          {message ? (
            <div className="mt-3">
              <MessageFull type="warning">
                <span className="flex flex-row items-center gap-2">
                  <RiErrorWarningFill />
                  {message}
                </span>
              </MessageFull>
            </div>
          ) : (
            ""
          )}
          {error && <MessageFull type="danger">{error}</MessageFull>}
          {success ? (
            <MessageFull type="success">
              <span className="flex flex-row items-center gap-2">
                <BsFillPatchCheckFill /> Profile Updated
              </span>
            </MessageFull>
          ) : (
            ""
          )}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="mt-1 md:mt-4">
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

            <div className="mt-5 text-right">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-secondary-800 text-light py-2 md:py-3 w-full md:w-fit md:px-8 uppercase text-sm md:text-lg border hover:bg-secondary-600"
                type="submit"
              >
                Update
              </motion.button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col md:mt-0 mt-4 w-full md:border-l border-gray-300 md:pl-5">
        <div className="w-full">
          <h2 className="uppercase text-xl md:font-normal font-semibold md:text-3xl mb-3">
            My Orders
          </h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <MessageFull type="danger">{errorOrders}</MessageFull>
          ) : orders.length !== 0 ? (
            <div>
              {/* pc & laptop */}
              <table className="table-auto hidden md:table md:mt-4 w-full">
                <thead>
                  <tr className="text-left text-lg uppercase font-medium bg-secondary-800 text-primary-100 border-b">
                    <td className="pl-2 py-2 border-r border-secondary-100">
                      Order Id
                    </td>
                    <td className="pl-2 py-2 border-r border-secondary-100">
                      Date
                    </td>
                    <td className="pl-2 py-2 border-r border-secondary-100">
                      Total
                    </td>
                    <td className="pl-2 py-2 border-r border-secondary-100">
                      Paid
                    </td>
                    <td className="pl-2 py-2">Delivered</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="odd:bg-light text-secondary-800 even:bg-secondary-100 border-b"
                    >
                      <td className="pl-2 py-4">{order._id}</td>
                      <td className="pl-2 py-4">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="pl-2 py-4">$ {order.totalPrice}</td>
                      <td className="text-center">
                        {order.isPaid ? (
                          <span className="py-4">
                            {order.paidAt.substring(0, 10)}{" "}
                          </span>
                        ) : (
                          <span className="text-3xl pt-3 text-primary-500">
                            <IoCloseCircleSharp className="ml-auto mr-auto" />
                          </span>
                        )}
                      </td>
                      <td className="justify-center">
                        {order.isDelivered ? (
                          <span className="py-4">
                            {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className=" text-3xl pt-3 text-primary-500">
                            <IoCloseCircleSharp className="ml-12" />
                          </span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/order/${order._id}`}
                          className="bg-secondary-700 py-2 rounded-sm px-3 text-light"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* mobile */}
              <table className="table-auto h-fit md:hidden table w-full mb-3 border">
                <thead>
                  <tr className="border-b bg-secondary-800 text-light">
                    <td className="pl-2 py-2">Your Orders</td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="odd:bg-light text-sm pt-2 text-secondary-800 flex flex-col even:bg-secondary-100 border-b"
                    >
                      <td className="pl-2">
                        Order Id:{" "}
                        <span className="font-semibold">{order._id}</span>
                      </td>
                      <td className="pl-2">
                        Date:{" "}
                        <span className="font-semibold">
                          {order.createdAt.substring(0, 10)}
                        </span>{" "}
                      </td>
                      <td className="pl-2">
                        Total:{" "}
                        <span className="font-semibold">
                          ${order.totalPrice}
                        </span>
                      </td>
                      <td className="pl-2 flex flex-row items-center">
                        Paid:{" "}
                        {order.isPaid ? (
                          <span className="font-semibold">
                            {order.paidAt.substring(0, 10)}{" "}
                          </span>
                        ) : (
                          <span className="text-xl text-primary-500 ml-2">
                            <IoCloseCircleSharp />
                          </span>
                        )}
                      </td>
                      <td className="pl-2 flex flex-row items-center">
                        Delivered:{" "}
                        {order.isDelivered ? (
                          <span className="font-semibold">
                            {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="text-xl ml-2 text-primary-500">
                            <IoCloseCircleSharp />
                          </span>
                        )}
                      </td>
                      <td className="flex justify-end pr-2 py-2">
                        <Link
                          to={`/order/${order._id}`}
                          className="bg-secondary-600 py-2 rounded-sm px-3 text-light"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <div className="mb-4 shadow-md">
                <MessageFull>
                  No Orders <span className="text-lg md:text-2xl">😔</span>
                </MessageFull>
              </div>
              <div className="shadow-md">
                <MessageFull type="success">
                  Want to place your order!{" "}
                  <span className="text-lg md:text-2xl">🥺</span>{" "}
                  <Link
                    to={"/"}
                    className="uppercase font-semibold md:text-base text-sm"
                  >
                    Click Here
                  </Link>
                </MessageFull>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
