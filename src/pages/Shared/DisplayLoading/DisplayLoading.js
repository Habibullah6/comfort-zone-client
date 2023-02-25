import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const DisplayLoading = () => {
  return (
    <div className="flex justify-center items-center h-[400px]">
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={["#ff0000", "#00ff00", "#0000ff"]}
        backgroundColor="#F4442E"
      />
    </div>
  );
};

export default DisplayLoading;
