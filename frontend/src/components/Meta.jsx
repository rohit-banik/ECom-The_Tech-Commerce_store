import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ECom",
  description: "We sell best products for the cheapest price",
  keywords:
    "electronics, buy electronics, cheap electronics, games, buy games, cheap games",
};

export default Meta;
