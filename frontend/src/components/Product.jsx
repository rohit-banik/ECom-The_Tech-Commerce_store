import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="bg-white">
      <div className="pb-3 px-0 md:p-3 min-h-full border-solid border-b odd:border-r md:border overflow-hidden border-secondary-200 rounded-sm md:shadow-md">
        <Link to={`/product/${product._id}`}>
          <motion.img
            whileHover={{ scale: 1.07 }}
            src={product.image}
            alt="product"
            className="rounded-sm ml-auto mr-auto max-h-40 md:max-h-44 lg:max-h-56"
          />
        </Link>
        <div>
          <Link to={`/product/${product._id}`}>
            <div className="md:text-base text-sm pt-3 px-2 font-medium">
              {product.name.length > 30 ? (
                <span>{product.name.slice(0, 30)}. . . .</span>
              ) : (
                product.name
              )}
            </div>
          </Link>
        </div>

        <div className="px-2 text-sm md:text-md">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <h3 className="md:text-xl text-2xl md:text-left mt-2 md:mt-0 text-right px-2 text-primary-800">
          $
          <span className="font-bold md:text-xl text-2xl ml-1 text-primary-500">
            {product.price}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Product;
