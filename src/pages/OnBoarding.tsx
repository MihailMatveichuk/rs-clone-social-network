const logoSrc = require('../assets/images/logo.png');
import { Link } from 'react-router-dom';
const gitHub = require('../assets/images/github.png');
const rsLogo = require('../assets/images/RS_logo.png');
import '../assets/styles/info_page.scss';

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
      <div className="bottom_part">
        <div className="team_logo">
          <a href="https://github.com/MihailMatveichuk">
            <img
              src={gitHub}
              alt=""
              title="Mikhail Matveichuk"
              width={30}
              height={30}
            />
          </a>

          <a href="https://github.com/wlladislaw">
            <img
              src={gitHub}
              alt=""
              title="Vlad Stepanov"
              width={30}
              height={30}
            />
          </a>

          <a href="https://github.com/KashinGen">
            <img
              src={gitHub}
              alt=""
              title="Gennady Kashin"
              width={30}
              height={30}
            />
          </a>
        </div>
        <div className="year">
          <span>2023</span>
        </div>
        <div className="rs_logo">
          <a href="https://rs.school/js/">
            <img src={rsLogo} alt="" width={70} height={30} title="RS" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { logoSrc };
