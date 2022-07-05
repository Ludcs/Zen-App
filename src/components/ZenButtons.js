import React from "react";
import "./ZenButtons.css";

const ZenButtons = ({ index, prevClicked, nextClicked }) => {
  return (
    <div className="zen-buttons">
      <button disabled={index <= 0} className="prev" onClick={prevClicked}>
        Previous
      </button>

      <button disabled={index > 13} className="next" onClick={nextClicked}>
        Next
      </button>
    </div>
  );
};

export default ZenButtons;
