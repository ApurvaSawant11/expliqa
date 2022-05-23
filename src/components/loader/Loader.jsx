import React from "react";
import { loader } from "assets";
const Loader = () => {
  return (
    <div className="flex items-start justify-center w-full">
      <img src={loader} className="h-[5rem]" alt="animated pulse loader"></img>
    </div>
  );
};

export { Loader };
