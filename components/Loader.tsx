import React from "react";
import { L74 } from "react-isloading";

const Loader = () => {
  return (
    <L74
      style={{
        height: "15rem",
        width: "15rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Loader;
