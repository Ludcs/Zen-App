import React, {useState} from 'react';
import './ZenNewPhrase.css';

const ZenNewPhrase = ({datos, setDatos, setIndex}) => {
  const [newPhrase, setNewPhrase] = useState('');

  const handleChange = (e) => {
    setNewPhrase(e.target.value);
  };

  const addPhraseClicked = () => {
    if (datos.includes(newPhrase)) {
      alert('This phrase already exists in the list. Change it');
    } else {
      setDatos([...datos, newPhrase]);
      setIndex(datos.length);
      setNewPhrase('');
    }
  };

  return (
    <div className="divNewPhrase">
      <input
        disabled={datos.length > 13}
        type="text"
        placeholder="Write your phrase..."
        onChange={handleChange}
        value={newPhrase}
      />
      <button
        className="okNewPhrase"
        disabled={newPhrase.length === 0 || datos.length > 13}
        onClick={addPhraseClicked}
      >
        OK
      </button>
    </div>
  );
};

export default ZenNewPhrase;
