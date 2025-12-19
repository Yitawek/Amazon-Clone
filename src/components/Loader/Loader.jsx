import React from "react";
import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh", // full height
      }}
    >
      <FadeLoader color="#36d7b7" height={15} width={5} radius={2} margin={5} />
    </div>
  );
}

export default Loader;
