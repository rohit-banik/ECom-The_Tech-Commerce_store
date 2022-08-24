import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader, MessageFull } from "../components";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { PRODUCT_CREATE_RESET } from "../constants/productContants";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="mr-auto ml-auto w-full lg:px-0 xl:w-10/12 md:mt-4 mt-1">
      <div className="flex flex-row mb-4 px-4">
        <h1 className="text-lg md:text-3xl font-medium uppercase">Products</h1>
        <div className="ml-auto">
          <button
            className="bg-secondary-700 md:text-base text-xs hover:bg-secondary-800 text-light py-2 px-4"
            onClick={createProductHandler}
          >
            + Create Product
          </button>
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <MessageFull type="danger">{errorDelete}</MessageFull>}
      {loadingCreate && <Loader />}
      {errorCreate && <MessageFull type="danger">{errorCreate}</MessageFull>}
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
                <td className="py-1 md:py-3">Price</td>
                <td className="py-1 md:py-3">Category</td>
                <td className="py-1 md:py-3">Brand</td>
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
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="odd:bg-primary-100 md:text-base text-xs odd:hover:bg-primary-200 even:hover:bg-secondary-200 odd:text-primary-900 even:bg-secondary-100 even:text-secondary-800 mt-2"
                >
                  <td className="py-2 md:py-4 pl-1 lg:hidden font-semibold">
                    {product._id.substring(19, 24)}
                  </td>
                  <td className="py-4 pl-5 hidden lg:table font-semibold">
                    {product._id}
                  </td>
                  <td className="text-center lg:text-left">
                    <div className="md:table hidden">{product.name}</div>
                    <div className="lg:text-left md:hidden">
                      {product.name.split(" ")[0]}
                    </div>
                  </td>
                  <td className="text-center lg:text-left">${product.price}</td>
                  <td className="text-center lg:text-left">
                    {product.category}
                  </td>
                  <td className="text-center lg:text-left">{product.brand}</td>
                  <td className=" md:px-4 text-sm md:text-2xl">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button>
                        <RiEditFill />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="md:px-5 text-sm md:text-2xl"
                      onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
