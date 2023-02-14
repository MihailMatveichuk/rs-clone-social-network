import { Link } from "react-router-dom";

const errorSrc = require('../assets/images/error.png');

const Error = () => {
  return (
    <div className="error">
      <div className="error__inner">
        <img className="error__logo" src={errorSrc} alt="logo" />
        <h1 className='error__title'>Something went wrong</h1>
        <div className="error__text">Return home or contact our team at Наша почта</div>
        <Link to="/" className="btn btn--primary">
          Return home
        </Link>
      </div>
    </div>
  );
};

export default Error;