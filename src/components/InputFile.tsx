import React, { useState, useEffect } from 'react';
const logoSrc = require('../assets/images/Avatar.png');

const InputFile = () => {
  const [src, setSrc] = useState(logoSrc);
  const fileReader = new FileReader();

  const changePhoto = () => {
    if (!fileReader.result) return;
    setSrc(fileReader.result);
  };
  fileReader.addEventListener('load', changePhoto);
  fileReader.onabort = (e) => console.log(e);
  fileReader.onerror = (e) => console.log(e);

  useEffect(() => {
    fileReader.addEventListener('load', changePhoto);
    return () => {
      fileReader.removeEventListener('load', changePhoto);
    };
  }, []);

  const onFileLoad = (e) => {
    const [file] = e.target.files;
    if (file && file.type.includes('image')) {
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div className="logo-choose">
      <input
        style={{ display: 'none' }}
        type="file"
        id="file"
        onChange={onFileLoad}
      />
      <label htmlFor="file">
        <img src={src} alt="file" id="input_img" />
      </label>
    </div>
  );
};

export default InputFile;
