import React from "react";
import PropTypes from "prop-types";
import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";

const Rating = ({ value, text, color }) => {
  return (
    <div className={`flex flex-col md:flex-row ${color}`}>
      <div className="flex flex-row">
        <span className="flex items-center">
          {value >= 1 ? (
            <MdStar />
          ) : value >= 0.5 ? (
            <MdStarHalf />
          ) : (
            <MdStarBorder />
          )}
        </span>
        <span className="flex items-center">
          {value >= 2 ? (
            <MdStar />
          ) : value >= 1.5 ? (
            <MdStarHalf />
          ) : (
            <MdStarBorder />
          )}
        </span>
        <span className="flex items-center">
          {value >= 3 ? (
            <MdStar />
          ) : value >= 2.5 ? (
            <MdStarHalf />
          ) : (
            <MdStarBorder />
          )}
        </span>
        <span className="flex items-center">
          {value >= 4 ? (
            <MdStar />
          ) : value >= 3.5 ? (
            <MdStarHalf />
          ) : (
            <MdStarBorder />
          )}
        </span>
        <span className="flex items-center">
          {value >= 5 ? (
            <MdStar />
          ) : value >= 4.5 ? (
            <MdStarHalf />
          ) : (
            <MdStarBorder />
          )}
        </span>
      </div>
      <span className="md:pl-2 flex ml-auto md:ml-0 md:mt-0 -mt-3 text-xs md:text-base font-semibold text-primary-900">
        {text && text}
      </span>
    </div>
  );
};

Rating.defaultProps = {
  color: "text-secondary-800",
  value: 0,
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
