import React from "react";
import ZenButtons from "./ZenButtons";
import "./ZenString.css";
import Loader from "./Loader";

const ZenString = ({ datos, index, loading, nextClicked, prevClicked }) => {
  return (
    <div className="div-container">
      <h2 className="h2-string">{datos[index]}</h2>
      {loading ? (
        <Loader />
      ) : (
        <ZenButtons
          index={index}
          nextClicked={nextClicked}
          prevClicked={prevClicked}
        />
      )}
    </div>
  );
};

export default ZenString;
