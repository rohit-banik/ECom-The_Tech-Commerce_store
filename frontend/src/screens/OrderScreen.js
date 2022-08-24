import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader, Message, MessageFull } from "../components";
import { MdArrowBackIosNew } from "react-icons/md";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

const OrderScreen = () => {
  const params = useParams();
  const orderId = params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const goToMyOrderHandler = () => {
    navigate(`/profile`);
    window.location.reload(false);
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  });

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : error ? (
    <Message type="danger">{error}</Message>
  ) : (
    <div className="flex flex-col items-center">
      {userInfo.isAdmin && (
        <Link
          to={"/admin/orderlist"}
          className="absolute md:pl-20 -left-4 flex top-[75px] md:top-20 cursor-pointer flex-row items-center w-fit py-2 px-5 rounded-full hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
        >
          <MdArrowBackIosNew className="mr-2" />
        </Link>
      )}
      <h1 className="text-sm md:text-2xl">
        Order id:{" "}
        <span className=" text-secondary-700 font-bold tracking-wide">
          {order._id}
        </span>
        {order ? (
          <div className="mt-2 text-sm md:text-base">
            <MessageFull type="success">Order placed successfully</MessageFull>
          </div>
        ) : (
          <div className="mt-2 text-sm md:text-base">
            <MessageFull type="danger">
              Oops! Your order can't be placed
            </MessageFull>
          </div>
        )}
        <button
          onClick={goToMyOrderHandler}
          className="mt-1 hover:text-secondary-500 hover:underline text-secondary-800 text-base w-full text-right"
        >
          View your orders
        </button>
      </h1>
      <div className="flex w-full xl:w-7/12">
        <div className="flex flex-col px-4 md:px-0 md:flex-row w-full">
          <div className="flex flex-col w-full">
            <div className="border-b pb-2 md:pb-5 mt-1 md:mt-8">
              <h2 className="text-lg font-medium text-secondary-800 md:text-2xl uppercase">
                Shipping
              </h2>

              <div className="md:mt-4 text-secondary-800 text-sm md:text-base md:mb-1">
                Name:{" "}
                <span className="font-bold text-black uppercase">
                  {order.user.name}
                </span>
              </div>
              <div className="text-secondary-800 text-sm md:text-base md:mb-1">
                Phone:{" "}
                <span className="font-bold text-black uppercase">
                  <a href={`tel:${order.shippingAddress.phone}`}>
                    {order.shippingAddress.phone}
                  </a>
                </span>
              </div>
              <div className="text-sm text-secondary-800 md:text-base md:mb-1">
                E-Mail:{" "}
                <a
                  href={`mailto:${order.user.email}`}
                  className=" text-secondary-500 hover:underline"
                >
                  {order.user.email}
                </a>
              </div>
              <div className="text-sm text-secondary-800 md:text-base md:mb-1">
                Address:{" "}
                <span className="font-bold text-black uppercase">
                  {order.shippingAddress.address} {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </span>
              </div>
              {order.isDelivered ? (
                <div className="mt-2 text-sm md:text-base">
                  <MessageFull type="success">
                    Delivered on {order.deliveredAt}
                  </MessageFull>
                </div>
              ) : (
                <div className="mt-2 text-sm md:text-base">
                  <MessageFull type="danger">Not Delivered</MessageFull>
                </div>
              )}
            </div>
            <div className="border-b pb-2 md:pb-5 mt-2 md:mt-5">
              <h2 className="text-lg font-medium text-secondary-800 md:text-2xl uppercase">
                Payment Method
              </h2>
              <div className="md:mt-4 text-secondary-800 text-sm md:text-base md:mb-1">
                Method:
                <span className="font-bold text-black uppercase">
                  {order.paymentMethod}
                </span>
              </div>
              {order.isPaid ? (
                <div className="mt-2 text-sm md:text-base">
                  <MessageFull type="success">
                    Paid on {order.paidAt}
                  </MessageFull>
                </div>
              ) : (
                <div className="mt-2 text-sm md:text-base">
                  <MessageFull type="danger">Not Paid</MessageFull>
                </div>
              )}
            </div>
            <div className="pb-2 md:pb-10 mt-2 md:mt-5">
              <h2 className="text-lg font-medium text-secondary-800 md:text-2xl uppercase">
                Ordered Items
              </h2>
              {order.orderItems.length === 0 ? (
                <Message type="info">Your order is Empty</Message>
              ) : (
                <table className="table-fixed md:mt-4 w-full">
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="w-1/5 md:w-2/12 py-2">
                          <img
                            src={item.image}
                            className="w-10 md:w-14 rounded-md"
                            alt={item.name}
                          />
                        </td>
                        <td className="w-2/5 md:w-7/12">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-xs md:text-base"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className=" text-xs md:text-base">
                          {item.qty} x ${item.price} ={" "}
                          <span className="font-semibold">
                            ${item.qty * item.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <table className="table-fixed md:ml-10 h-fit w-full md:mt-10 mb-3 md:w-6/12 border">
            <thead>
              <tr className="border-b bg-secondary-800 text-white">
                <td
                  colSpan={2}
                  className="md:p-4 p-2 uppercase md:text-2xl text-center"
                >
                  Order <span className="text-primary-200">Summary</span>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b md:text-base text-sm">
                <td className="px-4 h-8 md:h-14">Items</td>
                <td className="font-medium">${order.itemsPrice}</td>
              </tr>
              <tr className="border-b md:text-base text-sm">
                <td className="px-4 h-8 md:h-14">Shipping</td>
                <td className="font-medium">${order.shippingPrice}</td>
              </tr>
              <tr className="border-b md:text-base text-sm">
                <td className="px-4 h-8 md:h-14">Tax</td>
                <td className="font-medium">${order.taxPrice}</td>
              </tr>
              <tr className="border-b md:text-xl text-base">
                <td className="px-4 h-8 md:h-14">Total</td>
                <td className="font-semibold">${order.totalPrice}</td>
              </tr>
              {!order.isPaid && (
                <tr className="border-b md:text-xl text-base">
                  <td colSpan={2} className="px-4 pt-4">
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </td>
                </tr>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <tr>
                    <td colSpan={2} className="p-2 md:p-4 md:h-14">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={deliverHandler}
                        className=" bg-primary-500 py-2 md:py-5 md:px-10 w-full text-light text-sm rounded-sm uppercase hover:bg-primary-600"
                      >
                        Mark as Delivered
                      </motion.button>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
