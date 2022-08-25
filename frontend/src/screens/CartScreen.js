import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MessageFull } from "../components";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { ImCart } from "react-icons/im";
import { motion } from "framer-motion";

const CartScreen = () => {
  const params = useParams();
  const search = useLocation().search;
  const productId = params.id;

  const qty = new URLSearchParams(search).get("qty")
    ? Number(new URLSearchParams(search).get("qty"))
    : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    window.location.assign(`/login?redirect=shipping`);
    // navigate(`/login?redirect=shipping`);
  };

  return (
    <div className="flex flex-col items-center">
      <Link
        to={"/"}
        className="absolute md:pl-20 -left-4 flex top-20 md:top-20 cursor-pointer flex-row items-center w-fit py-2 px-5 rounded-full hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
      >
        <MdArrowBackIosNew className="mr-2" />
      </Link>
      <h1 className="flex flow-row gap-3 items-center text-center text-seconday-800 text-2xl md:text-4xl font-extralight mb-3">
        <ImCart />
        Shopping Cart
      </h1>
      <div className="flex mt-1 flex-col md:flex-row">
        <div className="w-full">
          {cartItems.length === 0 ? (
            <div className="w-max">
              <MessageFull>
                Your Cart is Empty{" "}
                <div className="font-semibold text-xl">
                  <Link to={"/"}>Go Back</Link>
                </div>
              </MessageFull>
            </div>
          ) : (
            <div className="flex flex-col lg:w-auto xl:w-max gap-y-1 md:gap-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex flex-row border md:p-0 p-3 border-secondary-100 bg-light shadow-sm md:rounded-lg"
                >
                  <div className="max-w-[100px] min-w-[100px] md:min-w-[150px] md:max-w-[150px] lg:max-w-[180px]">
                    <img
                      src={item.image}
                      className="md:rounded-l-lg rounded-sm max-h-40 p-2"
                      alt={item.name}
                    />
                  </div>
                  <div className="px-2 md:p-4 flex flex-col md:flex-row w-full">
                    <div className="text-sm lg:text-lg w-full lg:w-2/4">
                      <Link to={`/product/${item.product}`}>
                        {item.name.length > 45 ? (
                          <span>{item.name.slice(0, 44)}...</span>
                        ) : (
                          item.name
                        )}
                      </Link>
                    </div>
                    <div className="md:text-md lg:text-2xl text-md lg:w-1/4 text-right md:text-left mx-4 lg:ml-8">
                      $<span className="font-bold">{item.price}</span>
                    </div>
                    <div className="lg:text-base md:text-sm flex flex-row items-start text-xs lg:w-1/4">
                      Qty:
                      <select
                        className="lg:ml-2 ml-1 py-1 lg:px-5 md:px-0 px-1 h-fit rounded-md text-center border border-secondary-200 outline-none bg-light shadow-md"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].length > 5
                          ? [...Array(item.countInStock).keys()]
                              .slice(0, 5)
                              .map((x) => (
                                <option
                                  className="text-center lg:text-xl text-sm bg-light"
                                  key={x + 1}
                                  value={x + 1}
                                >
                                  {x + 1}
                                </option>
                              ))
                          : [...Array(item.countInStock).keys()].map((x) => (
                              <option
                                className="text-center lg:text-xl text-sm bg-light"
                                key={x + 1}
                                value={x + 1}
                              >
                                {x + 1}
                              </option>
                            ))}
                        {/* {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            className="text-center text-xl bg-green-100"
                            key={x + 1}
                            value={x + 1}
                          >
                            {x + 1}
                          </option>
                        ))} */}
                      </select>
                      <div className="flex items-center lg:hidden md:ml-0 ml-5 text-xl md:px-2">
                        <button
                          type="button"
                          className="text-primary-500"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <IoIosCloseCircle />
                        </button>
                      </div>
                    </div>
                    <div className=" hidden lg:flex items-start text-3xl">
                      <button
                        type="button"
                        className="text-primary-500"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <IoIosCloseCircle />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:my-0 my-4 md:px-0 px-2 md:ml-2 lg:ml-6 w-full md:w-5/12 h-fit">
          {cartItems.length === 0 ? (
            ""
          ) : (
            <div className="border border-secondary-700">
              <div className="flex flex-col justify-center items-center">
                <div className=" bg-secondary-800 text-light border-b w-full text-center border-secondary-700">
                  <h2 className="p-4">
                    Total Qty:{" "}
                    <span className="font-bold text-xl">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>{" "}
                    items
                  </h2>
                </div>
                <h2 className="border-b w-full text-2xl text-center border-secondary-700 text-secondary-700 p-2">
                  Subtotal:{" "}
                  <span className="font-semibold text-secondary-800">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </h2>
              </div>
              <div className="flex justify-center items-center p-1 md:p-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="bg-primary-500 py-3 md:py-5 w-full text-light text-sm rounded-sm uppercase hover:bg-primary-400 hover:text-light transition-all duration-200"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
