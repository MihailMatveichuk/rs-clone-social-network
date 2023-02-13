const logoSrc = require('../assets/images/logo.png');
import { Link } from 'react-router-dom';

export const OnBoarding = () => {
  return (
    <div className="on-boarding">
      <div className="on-boarding__inner">
        <div className="on-boarding__top"></div>
        <div className="on-boarding__step">
          <img className="on-boarding__logo" src={logoSrc} alt="logo" />
          <h1 className="on-boarding__title title">Openland</h1>
          <div className="on-boarding__text text">
            Modern social network built for you, not advertisers
          </div>
          <div className="on-boarding__btn-container">
            <Link to={'/auth/phone'} className="btn btn--primary">
              Continue with phone
            </Link>
            <Link to={'/auth/email'} className="btn btn--grey">
              Continue with email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { logoSrc };
