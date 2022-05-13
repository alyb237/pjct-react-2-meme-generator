import { saveAs } from 'file-saver';
import React, { useState } from 'react';

// test URL by putting directly into useState and then returning it to the browser
// create useState variables to change the top and bottom text and template

// generate button does not generate meme
// download button works
// entering doge and pressing enter does not work

export function App() {
  const url = 'https://api.memegen.link/images/aag.png';

  const [memeUrl, setMemeUrl] = useState(url);
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [template, setTemplate] = useState('');

  const download = `https://api.memegen.link/images/${template}/${top}/${bottom}.png`;

  const downloadMeme = () => {
    if (top && bottom && template) {
      setMemeUrl(
        `https://api.memegen.link/images/${template}/${top}/${bottom}.png`,
      );
    } else if (top && template) {
      setMemeUrl(`https://api.memegen.link/images/${template}/${top}/.png`);
    } else if (bottom && template) {
      setMemeUrl(`https://api.memegen.link/images/${template}/${bottom}.png`);
    } else {
      setMemeUrl(`https://api.memegen.link/images/${template}`);
    }
    console.log(memeUrl);
  };

  return (
    <div className="App">
      <div>
        <label>
          Meme template
          <input
            onChange={(event) => {
              setTemplate(event.currentTarget.value);
              setMemeUrl(
                `https://api.memegen.link/images/${template}/${event.currentTarget.value}/.png`,
              );
            }}
            enter={(e) => {
              if (e.key === '') {
                e.preventDefault();
                downloadMeme(e.targe.value);
              }
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
                `https://api.memegen.link/images/${template}/${top}/${event.currentTarget.value}.png,`,
              );
              setBottom(event.currentTarget.value);
            }}
          />
        </label>
      </div>
      <div>
        <img data-test-id="meme-image" src={url} alt="generated-meme" />
      </div>
      <div>
        <button onClick={() => setMemeUrl(download)}>Generate</button>
        <button
          onClick={() => {
            // console.log(download);
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
