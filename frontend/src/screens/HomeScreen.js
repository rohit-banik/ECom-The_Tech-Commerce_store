import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product, Loader, MessageFull, Meta } from "../components";
import { listProducts } from "../actions/productActions";
import { Link, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  const dispatch = useDispatch();

  // const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {/* {!keyword && <ProductCarousel />} */}
      {keyword && (
        <Link
          to={"/"}
          className="absolute md:pl-20 -left-4 flex top-20 cursor-pointer flex-row items-center w-fit py-2 px-5 rounded-full hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
        >
          <MdArrowBackIosNew className="mr-2" />
          <span className="hidden md:block">Go Back</span>
        </Link>
      )}
      <h1 className="font-semibold text-2xl pb-5 md:border-none border-b md:text-4xl text-center">
        Browse our Products
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageFull type="danger">{error}</MessageFull>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 ml-auto mr-auto md:gap-1 w-full xl:w-full lg:w-full md:w-full">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
