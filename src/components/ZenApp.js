import React, {useState, useEffect} from 'react';
import {getData} from '../services/zenService';
import ZenString from './ZenString';
import './ZenApp.css';
import ZenNewPhrase from './ZenNewPhrase';
import ZenList from './ZenList';

const ZenApp = () => {
  const [datos, setDatos] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    getData('https://api.github.com/zen')
      .then((res) => {
        setDatos([res]);
      })
      .catch((err) => {
        setDatos([`error number default`]);
        console.log(err);
      });

    setLoading(false);
  }, []);

  useEffect(() => {
    console.log(datos, datos.length);
    if (datos.length > 1) {
      console.log(datos[1], datos[1].length);
    }
  }, [datos]);

  const nextClicked = () => {
    if (index + 1 === datos.length) {
      getData('http://api.github.com/zen')
        .then((res) => {
          setLoading(true);
          if (datos.includes(res)) {
            return setTimeout(() => {
              nextClicked();
            }, 5000);
          } else {
            setLoading(false);
            setDatos([...datos, res]);
            return setIndex((prevIndex) => prevIndex + 1);
          }
        })
        .catch((err) => {
          setDatos([...datos, `error number${index}`]);
          setIndex((prevIndex) => prevIndex + 1);
          console.log(err);
        });
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevClicked = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="bg-zenapp">
      {datos && (
        <ZenString
          datos={datos}
          index={index}
          loading={loading}
          nextClicked={nextClicked}
          prevClicked={prevClicked}
        />
      )}
      <div className="div-container__btn-actions">
        <button
          className="btn-actionsPhrases"
          onClick={() => setChecked(!checked)}
        >
          {checked ? 'Show all phrases' : 'Add new phrase'}
        </button>
      </div>
      {checked ? (
        <ZenNewPhrase datos={datos} setDatos={setDatos} setIndex={setIndex} />
      ) : (
        <ZenList datos={datos} setDatos={setDatos} setIndex={setIndex} />
      )}
    </div>
  );
};

export default ZenApp;
