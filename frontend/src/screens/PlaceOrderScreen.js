import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckoutSteps, Message } from "../components";
import { createOrder } from "../actions/orderActions";
import { clearCart } from "../actions/cartActions";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);

  cart.taxPrice = addDecimals(Number((0.18 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col items-center">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="w-full px-4 md:px-0 lg:w-7/12">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col w-full">
            <div className="border-b pb-4 mt-4 md:pb-10 md:mt-8">
              <h2 className="text-lg font-medium md:text-2xl uppercase">
                Shipping
              </h2>
              <div className="mt-1 md:mt-4 md:text-base text-sm text-justify font-semibold">
                Address:{" "}
                <span className="font-normal">
                  {cart.shippingAddress.address} {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </span>
              </div>
            </div>

            <div className="border-b pb-4 mt-4 md:pb-10 md:mt-5">
              <h2 className="text-lg font-medium md:text-2xl uppercase">
                Payment Method
              </h2>
              <div className="mt-1 md:mt-4 md:text-base text-sm text-justify font-semibold">
                Method:{" "}
                <span className="font-normal">{cart.paymentMethod}</span>
              </div>
            </div>

            <div className="pb-4 mt-4 md:pb-10 md:mt-5">
              <h2 className="text-lg font-medium md:text-2xl uppercase">
                Order Items
              </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is Empty</Message>
              ) : (
                <table className="table-fixed mt-2 md:mt-4 w-full">
                  <tbody>
                    {cart.cartItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="w-1/5 md:w-2/12 py-2">
                          <img
                            src={item.image}
                            className="w-10 md:w-14 rounded-md"
                            alt={item.name}
                          />
                        </td>
                        <td className=" w-2/5 md:w-7/12">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-xs md:text-base"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td className=" text-xs md:text-base">
                          {item.qty} x ${item.price} ={" "}
                          <span className=" font-semibold">
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

          <table className="table-fixed md:ml-10 h-fit w-full mb-3 md:w-6/12 border">
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
                <td className="font-medium">${cart.itemsPrice}</td>
              </tr>
              <tr className="border-b md:text-base text-sm">
                <td className="px-4 h-8 md:h-14">Shipping</td>
                <td className="font-medium">${cart.shippingPrice}</td>
              </tr>
              <tr className="border-b md:text-base text-sm">
                <td className="px-4 h-8 md:h-14">Tax</td>
                <td className="font-medium">${cart.taxPrice}</td>
              </tr>
              <tr className="border-b md:text-xl text-base">
                <td className="px-4 h-8 md:h-14 font-medium">Total</td>
                <td className="font-semibold">${cart.totalPrice}</td>
              </tr>
              {error && (
                <tr className="border-b md:text-xl text-base">
                  <td colSpan={2} className="md:px-4 md:h-14">
                    <Message type="danger">{error}</Message>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="p-2 md:p-4 md:h-14">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                    className=" bg-primary-500 py-2 md:py-5 md:px-10 w-full text-light text-sm rounded-sm uppercase hover:bg-primary-600"
                  >
                    Place Order
                  </motion.button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
