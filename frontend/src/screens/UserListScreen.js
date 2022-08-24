import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader, MessageFull } from "../components";
import { deleteUser, listUsers } from "../actions/userActions";
import { VscCheckAll, VscClose } from "react-icons/vsc";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="mr-auto ml-auto w-full lg:px-0 xl:w-10/12 md:mt-4 mt-1">
      <h1 className="text-center text-3xl font-medium uppercase">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageFull type="danger">{error}</MessageFull>
      ) : (
        <div className="px-2 md:px-0">
          <table className="table-auto mt-2 md:mt-4 w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-center lg:text-left text-xs md:text-sm lg:text-lg uppercase font-medium bg-primary-800 text-primary-100 border-b">
                <td className="py-1 md:py-3 lg:pl-5 rounded-tl-md">
                  <div className=" lg:table hidden">User Id</div>
                  <div className="lg:hidden">Id</div>
                </td>
                <td className="py-1 md:py-3">Name</td>
                <td className="py-1 md:py-3">Email</td>
                <td className="py-1 md:py-3">Admin</td>
                <td className="py-1 md:py-3">
                  <div className=" md:table hidden">Edit</div>
                  <div className="md:hidden"></div>
                </td>
                <td className="rounded-tr-md">
                  <div className="md:table hidden">Delete</div>
                  <div className="md:hidden"></div>
                </td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-primary-100 md:text-base text-xs odd:hover:bg-primary-200 even:hover:bg-secondary-200 odd:text-primary-900 even:bg-secondary-100 even:text-secondary-800 mt-2"
                >
                  <td className="py-2 md:py-4 pl-1 lg:hidden">
                    {user._id.substring(19, 24)}
                  </td>
                  <td className="py-4 pl-5 hidden lg:table">{user._id}</td>
                  <td className="text-center lg:text-left">
                    <div className="md:table hidden">{user.name}</div>
                    <div className="lg:text-left md:hidden">
                      {user.name.split(" ")[0]}
                    </div>
                  </td>
                  <td className="text-center lg:text-left">
                    <a
                      href={`mailto:${user.email}`}
                      className="hidden md:table"
                    >
                      {user.email}
                    </a>
                    <a href={`mailto:${user.email}`} className="md:hidden">
                      {user.email.substring(0, 6)}...
                    </a>
                  </td>
                  <td className="text-base md:text-2xl md:px-4">
                    {user.isAdmin ? (
                      <VscCheckAll className="text-green-500 md:ml-0 md:mr-0 ml-auto mr-auto" />
                    ) : (
                      <VscClose className="text-primary-500 md:ml-0 md:mr-0 ml-auto mr-auto" />
                    )}
                  </td>
                  <td className=" md:px-4 text-sm md:text-2xl">
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button>
                        <RiEditFill />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="md:px-5 text-sm md:text-2xl"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
