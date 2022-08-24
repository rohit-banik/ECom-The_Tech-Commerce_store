import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { motion } from "framer-motion";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [isSearchBox, setIsSearchBox] = useState(false);
  const [showSearchBtn, setShowSearchBtn] = useState(true);

  const toggleSearchBox = () => {
    setIsSearchBox(!isSearchBox);
    setShowSearchBtn(!showSearchBtn);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      {showSearchBtn && (
        <motion.button
          whileTap={{ scale: 0.9, opacity: 0.8 }}
          className="flex flex-row text-light items-center text-lg gap-1 rounded-md uppercase"
          onClick={toggleSearchBox}
        >
          <span className="text-2xl">
            <BiSearchAlt />
          </span>
          <span className="hidden md:block">Search</span>
        </motion.button>
      )}
      {isSearchBox && (
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-row md:bg-white rounded-md md:px-0 px-2"
        >
          <input
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products"
            className="absolute md:top-0 left-0 top-16 md:relative px-2 py-1.5 w-[95%] md:mx-0 mx-2 md:w-[500px] text-base rounded-md md:rounded-r-none md:rounded-l-md text-secondary-800 outline-none border focus:border-primary-400"
          />
          <button
            type="submit"
            className="top-[53px] md:top-0 relative left-32 md:left-0 md:flex flex-row border border-primary-400 hover:border-primary-500 bg-primary-400 hover:bg-primary-500 px-2 py-2 md:py-1.5 text-secondary-800 items-center gap-1 uppercase"
            onClick={submitHandler}
          >
            <BiSearchAlt />
            <span className="md:block hidden">Search</span>
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="top-[53px] md:top-0 relative left-32 md:left-0 bg-green-300 hover:bg-teal-300 text-secondary-800 px-2 md:px-4 text-lg md:text-2xl items-center rounded-r-md uppercase"
            onClick={toggleSearchBox}
          >
            <VscClose />
          </motion.button>
        </motion.form>
      )}
    </div>
  );
};

export default SearchBox;
