import React from "react";
import classNames from "classnames";

const CustomButton = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex items-center justify-center px-4 py-2 shadow-md border-black/10 border rounded-full cursor-pointer text-sm select-none hover:bg-black/10 text-slate-700 font-medium",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CustomButton;
