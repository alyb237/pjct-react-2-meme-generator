/** @jsxImportSource @emotion/react */
import './App.css';
import { css } from '@emotion/react';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';

const buttonStyle = css`
  color: black;
  border-radius: 10px;
  border-color: pink;
  background-color: beige;
  font-family: sans-serif;
  font-size: 20px;
  padding: 15px;
`;

const imgStyle = css`
  height: 300px;
  width: 300px;
`;

const buttonPosition = css`
  display: flex;
  border-radius: 8px;
  font-size: 15px;
  justify-content: center;
  gap: 20px;
  padding: 5px 10px 5px 10px;
`;

// test URL by putting directly into useState and then returning it to the browser
// create useState variables to change the top and bottom text and template
// set condition for states if not all input boxes are used

export function App() {
  // displays first image on site and passes the link to the useState
  const url = 'https://api.memegen.link/images/aag.png';

  const [memeUrl, setMemeUrl] = useState(url);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [template, setTemplate] = useState('');

  const download = `https://api.memegen.link/images/${template}/${top}/${bottom}.png`;

  const downloadMeme = () => {
    if (template || top || bottom) {
      setMemeUrl(
        `https://api.memegen.link/images/${template}/${top}/${bottom}.png`,
        console.log('all'),
      );
    } else if (template && top) {
      setMemeUrl(`https://api.memegen.link/images/${template}/${top}.png`);
      console.log('template & top');
    } else if (template && bottom) {
      setMemeUrl(
        `https://api.memegen.link/images/${template}/${top}/${bottom}.png`,
      );
      console.log('template &  bottom');
    } else if (template) {
      setMemeUrl(`https://api.memegen.link/images/${template}.png`);
      console.log('template only');
    } else {
      setMemeUrl(`https://api.memegen.link/images`);
      console.log('none');
    }
    console.log(memeUrl);
  };

  return (
    <div className="App">
      <h3>React Meme Generator</h3>

      <div>
        <label>
          Meme template
          <br />
          <input
            value={template}
            onChange={(event) => {
              setMemeUrl(
                `https://api.memegen.link/images/${event.currentTarget.value}.png`,
              );
              setTemplate(event.currentTarget.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Top text
          <br />
          <input
            value={top}
            onChange={(event) => {
              setMemeUrl(
                `https://api.memegen.link/images/${template}/${event.currentTarget.value}/${bottom}.png`,
              );
              setTop(event.currentTarget.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Bottom text
          <br />
          <input
            value={bottom}
            onChange={(event) => {
              setMemeUrl(
                `https://api.memegen.link/images/${template}/${top}/${event.currentTarget.value}.png`,
              );
              setBottom(event.currentTarget.value);
            }}
          />
        </label>
      </div>
      <br />
      <img
        css={imgStyle}
        data-test-id="meme-image"
        src={memeUrl}
        alt="generated-meme"
      />
      <div css={buttonPosition}>
        <div>
          <button
            css={buttonStyle}
            data-test-id="generate-meme"
            onClick={downloadMeme}
          >
            Generate
          </button>
        </div>

        <button
          css={buttonStyle}
          onClick={() => {
            setMemeUrl(download);
            saveAs(download, 'meme.jpg');
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
export default App;
