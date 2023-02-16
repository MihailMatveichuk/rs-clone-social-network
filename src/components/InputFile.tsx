import React, { useState, useEffect } from 'react';
const logoSrc = require('../assets/images/Avatar.png');

const InputFile = () => {
  const [src, setSrc] = useState(logoSrc)
  const fileReader = new FileReader();

  const changePhoto = () => {
    console.log(fileReader.result);
    
    setSrc(fileReader.result)
  }
  fileReader.addEventListener('load', changePhoto)
  // return () => {
  //   fileReader.removeEventListener('load', changePhoto)
  // }
  fileReader.onabort = (e) => console.log(e)
  fileReader.onerror = (e) => console.log(e)

  useEffect(() => {
    fileReader.addEventListener('load', changePhoto)
    // return () => {
    //   fileReader.removeEventListener('load', changePhoto)
    // }
    fileReader.onabort = (e) => console.log(e)
    fileReader.onerror = (e) => console.log(e)

  }, [])

  const onFileLoad = (e) => {
    const [file] = e.target.files;
    console.log(file);
    if (file) {
      console.log('in file');
      
      fileReader.readAsDataURL(file)
    }
    
  }
  return (
    <div className='logo-choose'>
      <input style={{ display: 'none' }} type="file" id="file" onChange={onFileLoad} />
      <label htmlFor="file">
        <img src={src}/>
      </label>
    </div>
  );
};

export default InputFile;
