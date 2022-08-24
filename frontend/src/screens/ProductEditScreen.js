import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer, Loader, MessageFull } from "../components";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { motion } from "framer-motion";
import { MdArrowBackIosNew } from "react-icons/md";
import { PRODUCT_UPDATE_RESET } from "../constants/productContants";

const ProductEditScreen = () => {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
      window.location.reload(false);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link
        to={"/admin/productlist"}
        className="absolute md:pl-20 -left-4 flex top-16 md:top-20 cursor-pointer flex-row items-center w-fit py-2 px-5 rounded-full hover:bg-primary-500 hover:text-light transition-all duration-100 ease-in-out"
      >
        <MdArrowBackIosNew className="mr-2" />
        Go Back
      </Link>
      <FormContainer>
        <div className="flex flex-col items-center">
          <div className="md:p-0 px-4 w-full md:w-4/12">
            <h1 className="uppercase text-xl font-semibold md:text-3xl mt-5 mb-1">
              Edit Product
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
                  <div className="md:text-lg text-sm">Price</div>
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mt-2 md:mt-4">
                  <div className="md:text-lg text-sm">Image</div>
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="mt-2 md:mt-4">
                  <div className="md:text-lg text-sm">Upload Image</div>
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="file"
                    id="image-file"
                    onChange={uploadFileHandler}
                  />
                </div>
                {uploading && <Loader />}
                <div className="mt-2 md:mt-4">
                  <div className="md:text-lg text-sm">Brand</div>
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="mt-2 md:mt-4">
                  <div className="md:text-lg text-sm">Stock Count</div>
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="number"
                    placeholder="Enter stock count"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
                <div className="mt-2 md:mt-4">
                  <div className="md:text-lg text-sm">Category</div>
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="mt-2 md:mt-4">
                  <div className="md:text-lg text-sm">Description</div>
                  <input
                    className="py-2 md:py-4 px-3 md:px-6 bg-secondary-100 w-full mt-2 focus:border-secondary-500 placeholder:text-secondary-300 outline-none border border-secondary-200 transition-all duration-300 ease-in-out"
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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

export default ProductEditScreen;
