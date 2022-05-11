import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Meme() {
  const [meme, setMeme] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.memegen.link/templates')
      .then((res) => {
        console.log(res);
        setMeme(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      Meme Generator
      {meme.map((memes) => (
        <ul key={memes.name} />
      ))}
    </div>
  );
}

export default Meme;
