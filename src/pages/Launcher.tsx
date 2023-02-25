const logoSrc = require('../assets/images/logo.png');

const Launcher = () => {
  return (
    <div className="launcher">
      <img className="launcher__logo" src={logoSrc} alt="logo" />
    </div>
  );
};

export default Launcher;
