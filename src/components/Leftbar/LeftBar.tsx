import React from 'react';
import { logoSrc } from '../../pages/OnBoarding';
const Compas = require('../assets/images/Compas.png');
const Shape = require('../assets/images/Shape.png');
const Message = require('../assets/images/Message.png');
const Gang = require('../assets/images/Gang.png');
const Setting = require('../assets/images/Setting.png');
const Keyboard = require('../assets/images/Keyboard.png');

const LeftBar = () => {
  return (
    <div className="menu">
      <div className="menu__top">
        <img className="left-bar__logo" src={logoSrc} alt="logo" />
        <img className="left-bar__logo compas" src={Compas} alt="logo" />
        <img className="left-bar__logo shape" src={Shape} alt="logo" />
        <img className="left-bar__logo message" src={Message} alt="logo" />
        <img className="left-bar__logo gang" src={Gang} alt="logo" />
        <img className="left-bar__logo setting" src={Setting} alt="logo" />
      </div>
      <div className="menu__low">
        <img className="left-bar__logo keyboard" src={Keyboard} alt="logo" />
      </div>
    </div>
  );
};

export default LeftBar;
