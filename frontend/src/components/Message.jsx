import React from "react";

const Message = ({ type, children }) => {
  return (
    <div
      className={`py-5 px-7 rounded-sm text-center w-fit ml-auto mr-auto ${
        type === "danger"
          ? "bg-red-200 text-red-700"
          : type === "success"
          ? "bg-green-200 text-green-600"
          : "bg-blue-200 text-blue-600"
      }`}
    >
      <div>{children}</div>
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
