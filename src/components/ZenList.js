import React from "react";
import "./ZenList.css";

const ZenList = ({ datos, setDatos, setIndex }) => {
  const deletePhrase = (el) => {
    let isDelete = window.confirm(`Estas seguro de querer eliminar la frase?`);
    if (isDelete) {
      let newData = datos.filter((item) => item !== el);
      setDatos(newData);
      setIndex((prevIndex) => prevIndex - 1);
    } else {
      return;
    }
  };

  return (
    <div className="div-list">
      <ul>
        {datos.map((el, i) => (
          <div className="div-ul-li" key={i}>
            <li>{el}</li>
            <button className="btn-delete" onClick={() => deletePhrase(el)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ZenList;
