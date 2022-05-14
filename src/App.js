import { saveAs } from 'file-saver';
import React, { useState } from 'react';

// test URL by putting directly into useState and then returning it to the browser
// create useState variables to change the top and bottom text and template

// generate button does not generate meme
// entering doge and pressing enter does not work

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
      <div>
        <label>
          Meme template
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

      <div>
        <div>
          <button data-test-id="generate-meme" onClick={downloadMeme}>
            Generate
          </button>
          <img data-test-id="meme-image" src={memeUrl} alt="generated-meme" />
        </div>

        <button
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
