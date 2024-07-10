import React from "react";

const CustomInput = ({ name, id, type, onChange, value }) => {
  return (
    <div className="">
      <input
        className="rounded-lg px-4 bg-white/20 border-none text-slate-700 hover:bg-white/10 hover:shadow focus:ring-white/10"
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
