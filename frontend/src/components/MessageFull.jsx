import React from "react";

const MessageFull = ({ type, children }) => {
  return (
    <div
      className={`py-3 px-7 rounded-sm w-full ml-auto mr-auto ${
        type === "danger"
          ? "bg-red-200 text-red-700"
          : type === "success"
          ? "bg-green-200 text-green-600"
          : type === "warning"
          ? "bg-yellow-200 text-yellow-600"
          : "bg-blue-200 text-blue-600"
      }`}
    >
      <div>{children}</div>
    </div>
  );
};

MessageFull.defaultProps = {
  variant: "info",
};

export default MessageFull;
