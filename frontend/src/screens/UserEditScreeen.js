import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer, Loader, MessageFull } from "../components";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { motion } from "framer-motion";
import { MdArrowBackIosNew } from "react-icons/md";

const UserEditScreen = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link
        to={"/admin/userlist"}
        className="absolute md:pl-20 -left-4 flex top-16 md:top-20 cursor-pointer flex-row items-center w-fit py-2 px-5 rounded-full hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
      >
        <MdArrowBackIosNew className="mr-2" />
        Go Back
      </Link>
      <FormContainer>
        <div className="flex flex-col items-center">
          <div className="md:p-0 px-4 w-full md:w-4/12">
            <h1 className="uppercase text-xl font-semibold md:text-3xl mt-5 mb-1">
              Edit User
            </h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && (
              <MessageFull type="danger">{errorUpdate}</MessageFull>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <MessageFull type="danger">{error}</MessageFull>
            ) : (
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
                <div className="mt-2 md:mt-4 flex flex-row gap-2">
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <span className="md:text-lg text-sm">Mark as Admin</span>
                </div>

                <div className="mt-5 text-right">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-secondary-800 text-light py-2 md:py-3 w-full md:px-8 uppercase text-sm md:text-lg border hover:bg-secondary-600"
                    type="submit"
                  >
                    Update
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
