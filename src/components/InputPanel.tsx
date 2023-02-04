import React from 'react';
const Attach = require('./assets/images/Attached.png');
const Smile = require('./assets/images/Smile.png');
const Send = require('./assets/images/Send.png');

const InputPanel = () => {
  return (
    <div className="input-panel">
      <input type="file" style={{ display: 'none' }} id="file" />
      <label htmlFor="file">
        <img src={Attach} alt="" />
      </label>
      <div className="input_container">
        <input type="text" placeholder="Insert message" />
        <img src={Smile} alt="" />
      </div>
      <img src={Send} alt="" />
    </div>
  );
};

export default InputPanel;
