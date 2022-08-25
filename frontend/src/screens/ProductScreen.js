import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader, MessageFull, Meta, Rating } from "../components";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productContants";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params, successProductReview]);

  const addToCartHandler = () => {
    // history.push(`/cart/${params.id}?qty=${qty}`);
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Link
        to={"/"}
        className="absolute md:pl-20 -left-4 flex top-16 md:top-20 cursor-pointer flex-row items-center w-fit py-2 px-5 rounded-full hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
      >
        <MdArrowBackIosNew className="mr-2" />
        <span className="hidden md:block">Go Back</span>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="mx-5 md:mx-0 mt-[45%] md:mt-14">
          <MessageFull type="danger">{error}</MessageFull>
        </div>
      ) : (
        <div>
          <Meta title={product.name} />
          <div className="flex flex-col md:flex-row mt-6 md:mt-10 md:bg-light bg-light border-t md:border-t-0">
            <div className="flex flex-col w-full md:p-4 md:mx-2 lg:mx-4 md:border-r">
              <img
                src={product.image}
                alt={product.name}
                className="md:rounded-md shadow-sm max-h-72 md:w-auto w-min ml-auto mr-auto md:pt-0 pt-2 md:max-h-[620px]"
              />
            </div>
            <div className="flex flex-col md:mx-0 mx-4 lg:mx-4">
              <h3 className="font-base uppercase w-fit text-sm text-justify md:text-xl lg:text-4xl mt-2 lg:mt-10 text-primary-900">
                {product.name}
              </h3>
              <div className="text-xl md:mt-2 lg:mt-6 md:border-t pr-2 md:p-1 lg:p-4">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="text-yellow-600"
                />
              </div>
              <p className="text-right md:text-left text-lg md:text-xl lg:text-3xl md:border-t md:p-1 lg:p-4 text-secondary-800">
                Price:{" "}
                <span className="text-2xl lg:text-7xl text-secondary-900">
                  $<span className="font-bold">{product.price}</span>
                </span>
              </p>

              <p className="text-sm lg:text-base font-semibold border-t pt-3 pb-2 text-justify md:p-1 lg:p-4 md:border-b md:border-secondary-100 border-secondary-900 text-primary-600">
                Description:{" "}
                <span className="text-xs md:text-sm lg:text-lg font-normal justify-start text-primary-900">
                  {product.description}
                </span>
              </p>

              <div className="flex flex-row text-sm lg:text-xl md:mb-0 mb-5 mr-auto ml-auto md:mr-0 md:mt-2 lg:mt-10 md:border border-gray-400 w-fit md:rounded-full">
                <p className="p-2 lg:p-5 md:flex justify-center hidden text-secondary-600 font-medium">
                  Status:{" "}
                </p>
                {product.countInStock > 0 ? (
                  <p className="p-2 lg:p-5 border border-green-400 md:border-0 md:border-l md:border-l-green-500 uppercase font-semibold lg:text-2xl bg-green-100 rounded-md md:rounded-r-full">
                    <span className="text-green-600">Product is Available</span>
                  </p>
                ) : (
                  <p className="p-2 lg:p-5 border md:border-l border-l-red-300 uppercase font-semibold lg:text-2xl bg-red-100 rounded-md md:rounded-r-full">
                    <span className="text-red-600">Out of Stock</span>
                  </p>
                )}
              </div>

              <div className="fixed flex flex-row justify-center items-center bottom-0 left-0 right-0 text-light md:text-secondary-900 p-4 bg-secondary-900 md:bg-transparent md:relative lg:mt-3 lg:mb-0 md:ml-auto md:mr-auto">
                {product.countInStock > 0 && (
                  <div className="flex flex-row">
                    <div className="flex flex-col px-2 items-center justify-center font-semibold">
                      Qty:
                    </div>
                    <div className="flex flex-col pl-1 pr-4 items-center justify-center">
                      <select
                        className="p-2 rounded-md text-center outline-none text-secondary-900 bg-light md:shadow-md md:shadow-secondary-200"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {/* {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))} */}
                        {[...Array(product.countInStock).keys()].length > 5
                          ? [...Array(product.countInStock).keys()]
                              .slice(0, 5)
                              .map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                          : [...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* {product.countInStock > 0 ? ( */}
                <button
                  onClick={addToCartHandler}
                  className={`flex ${
                    product.countInStock === 0
                      ? "bg-secondary-100 text-secondary-200 font-semibold"
                      : "bg-secondary-900 text-light hover:border-gray-700 hover:bg-white hover:text-black"
                  } py-3 lg:py-5 px-10 lg:px-28 xl:px-40 text-xs md:text-base rounded-sm uppercase border transition-all duration-200`}
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </button>
              </div>

              <div>
                {userInfo ? (
                  <div className="w-full border-t pt-4">
                    <h2 className="mb-0 md:mb-2 font-medium uppercase text-xl">
                      Write a Review
                    </h2>
                    <form onSubmit={submitHandler} className="p-4">
                      {/* PC & Laptop */}
                      <div className="md:flex hidden flex-row gap-4">
                        <div className="flex flex-col">
                          <label className="text-sm">Set Rating</label>
                          <select
                            className="py-2 pl-1 text-left w-full mt-2 rounded-md outline-none text-secondary-900 bg-light md:shadow-md md:shadow-secondary-200"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option className="text-left" hidden value="">
                              Select
                            </option>
                            <option className="text-left" value="1">
                              1 - Poor
                            </option>
                            <option className="text-left" value="2">
                              2 - Fair
                            </option>
                            <option className="text-left" value="3">
                              3 - Good
                            </option>
                            <option className="text-left" value="4">
                              4 - Very Good
                            </option>
                            <option className="text-left" value="5">
                              5 - Excellent
                            </option>
                          </select>
                          <button
                            className="bg-secondary-800 rounded-md text-light mt-2 py-2 md:py-3 w-full md:px-8 uppercase text-sm md:text-lg border hover:bg-secondary-600"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="text-sm">Write a Comment</label>
                          <textarea
                            type="textarea"
                            rows={3}
                            className="py-2 md:py-2 px-3 max-h-24 h-24 rounded-md bg-blue-50 mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                            value={comment}
                            placeholder="Your Review here...."
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Mobile */}
                      <div className="flex md:hidden flex-col gap-4">
                        <div className="flex flex-col">
                          <label className="text-sm">Set Rating</label>
                          <select
                            className="py-2 pl-1 text-left w-full mt-2 rounded-md outline-none text-secondary-900 bg-light md:shadow-md md:shadow-secondary-200"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option className="text-left" hidden value="">
                              Select
                            </option>
                            <option className="text-left" value="1">
                              1 - Poor
                            </option>
                            <option className="text-left" value="2">
                              2 - Fair
                            </option>
                            <option className="text-left" value="3">
                              3 - Good
                            </option>
                            <option className="text-left" value="4">
                              4 - Very Good
                            </option>
                            <option className="text-left" value="5">
                              5 - Excellent
                            </option>
                          </select>
                        </div>
                        <div className="flex flex-col w-full">
                          <label className="text-sm">Write a Comment</label>
                          <textarea
                            type="textarea"
                            rows={3}
                            className="py-2 md:py-2 px-3 max-h-24 h-24 rounded-md bg-blue-50 mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                            value={comment}
                            placeholder="Your Review here...."
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <button
                          className="bg-secondary-800 rounded-md text-light py-2 md:py-3 w-full md:px-8 uppercase text-sm md:text-lg border hover:bg-secondary-600"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <MessageFull>
                    Please <Link to="/login">sign in</Link> to write a review
                  </MessageFull>
                )}
              </div>
            </div>
          </div>
          <div className="border-t py-2 md:py-4">
            <div className="flex flex-col">
              <h2 className="pb-2 text-center font-medium uppercase text-xl md:text-3xl">
                Reviews
              </h2>
              {product.reviews.length === 0 && (
                <MessageFull>No reviews</MessageFull>
              )}
              <div className="flex flex-col md:pb-4 pb-16 mb-4 mx-2 lg:mx-28">
                {product.reviews.map((review) => (
                  <div
                    className={`${
                      review.rating >= 3
                        ? "bg-green-100 text-secondary-800"
                        : "bg-primary-100 text-primary-600"
                    } p-4 md:mb-4 mb-2 rounded-sm shadow-lg`}
                    key={review._id}
                  >
                    <h2 className="font-semibold text-sm">{review.name}</h2>
                    <Rating value={review.rating} />
                    <div className="md:pt-0 pt-3 text-xs">
                      {review.createdAt.substring(0, 10)}
                    </div>
                    <p className="bg-light p-2 md:px-4 border border-secondary-800 rounded-md mt-2 text-base md:text-xl">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {errorProductReview && (
              <MessageFull type="danger">{errorProductReview}</MessageFull>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
