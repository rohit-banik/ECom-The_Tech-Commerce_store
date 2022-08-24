import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader, MessageFull } from "../components";
import { listOrders } from "../actions/orderActions";
import { VscClose } from "react-icons/vsc";
import { HiClipboardList } from "react-icons/hi";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure ?")) {
  //     dispatch(deleteOrders(id));
  //   }
  // };

  return (
    <div className="mr-auto ml-auto w-full lg:px-0 xl:w-10/12 md:mt-4 mt-1">
      <h1 className="text-center mt-2 md:mt-4 text-xl md:text-3xl font-medium uppercase">
        Orders
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageFull type="danger">{error}</MessageFull>
      ) : (
        <div className="px-2 md:px-0">
          <table className="table-auto w-full border-separate border-spacing-y-2">
            {orders.length !== 0 ? (
              <thead>
                <tr className="text-center lg:text-left text-[9px] md:text-sm lg:text-lg uppercase font-medium bg-primary-800 text-primary-100 border-b">
                  <td className="py-1 md:py-3 lg:pl-5 rounded-tl-md">
                    <span className=" lg:table hidden">User Id</span>
                    <span className="lg:hidden">Id</span>
                  </td>
                  <td className="py-1 md:py-3">User</td>
                  <td className="py-1 md:py-3">Date</td>
                  <td className="py-1 md:py-3">Total</td>
                  <td className="py-1 md:py-3">Paid</td>
                  <td className="py-1 md:py-3">Delivered</td>
                  <td></td>
                  <td className="rounded-tr-md"></td>
                </tr>
              </thead>
            ) : (
              <MessageFull>No orders for you</MessageFull>
            )}
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="odd:bg-primary-100 md:text-base text-[10px] odd:border-primary-200 even:border-secondary-200 odd:hover:bg-primary-200 even:hover:bg-secondary-200 odd:text-primary-900 even:bg-secondary-100 even:text-secondary-800 mt-2"
                >
                  <td className="py-2 md:py-4 pl-1 lg:hidden border-r md:border-r-0">
                    {order._id.substring(19, 24)}
                  </td>
                  <td className="py-4 pl-5 hidden lg:table">{order._id}</td>
                  <td className="text-center lg:text-left border-r md:border-r-0">
                    <span className="md:table hidden ">
                      {order.user && order.user.name}
                    </span>
                    <span className="lg:text-left md:hidden">
                      {order.user && order.user.name.split(" ")[0]}
                    </span>
                  </td>
                  <td className="text-center lg:text-left border-r md:border-r-0">
                    {order.createdAt.substring(2, 10)}
                  </td>
                  <td className="text-center lg:text-left border-r md:border-r-0">
                    {order.totalPrice}
                  </td>
                  <td className="text-center lg:text-left border-r md:border-r-0">
                    {order.isPaid ? (
                      order.paidAt.substring(2, 10)
                    ) : (
                      <VscClose className="text-primary-500 md:ml-0 md:mr-0 ml-auto mr-auto" />
                    )}
                  </td>
                  <td className="text-center lg:text-left border-r md:border-r-0">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(2, 10)
                    ) : (
                      <VscClose className="text-primary-500 md:ml-0 md:mr-0 ml-auto mr-auto" />
                    )}
                  </td>
                  <td className=" text-center lg:text-left">
                    <Link to={`/order/${order._id}`}>
                      <button className="text-sm md:text-2xl text-secondary-800">
                        <HiClipboardList />
                      </button>
                    </Link>
                  </td>
                  {/* <td>
                    <button
                      className="md:px-5 text-sm text-primary-500 md:text-2xl"
                      onClick={() => deleteHandler(order._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
