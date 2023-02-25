import { DocumentData } from 'firebase/firestore';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkUser } from '../../api';
import { AuthContext } from '../../context/AuthContext';
const phoneSrc = require('../../assets/images/phone.svg');
const emailSrc = require('../../assets/images/mail.svg');
const joinedSrc = require('../../assets/images/joined.svg');
const Avatar = require('../../assets/images/Avatar.png');

type UserInfoProps = {
  userUid: string;
  isMain: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({
  // userUid = '',
  isMain = false,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<DocumentData | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const u = await checkUser(currentUser!.uid);
    if (u) {
      setUser(u);
    }
  };
  const date = user
    ? user.createdAt && user.createdAt.toDate().toLocaleString()
    : '-';
  const [isLinkCopied, setLinkCopied] = useState<boolean>(false);

  const copyLink = useCallback(() => {
    const link = window.location.origin + `/users?uid=${user!.uid}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 1500);
  }, [user]);

  return (
    <main className={['user-info', isMain ? 'main' : ''].join(' ')}>
      {user && (
        <div className="user-info__content">
          <div className="user-info__content-left">
            <div className="user-info__info">
              <img src={user.photoURL || Avatar} alt="photoURL" />
              <h2>{user.displayName}</h2>
              {!isMain && (
                <>
                  <div className="user-info__last-seen">
                    last seen 3 minutes ago
                  </div>
                  <div className="user-info__btn-container">
                    <button className="btn btn--primary">Send message</button>
                    <button className="btn btn--grey">Add to contacts</button>
                  </div>
                </>
              )}
            </div>
            <ul className="user-info__controls">
              <li onClickCapture={copyLink}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_18080_42961)">
                    <path
                      d="M11.2924 4.22182C10.9019 4.61234 10.9019 5.24551 11.2924 5.63603C11.6829 6.02655 12.3161 6.02655 12.7066 5.63603L13.9441 4.39859C15.5062 2.8365 18.0388 2.8365 19.6009 4.39859C21.163 5.96069 21.163 8.49335 19.6009 10.0554L16.4189 13.2374C14.8568 14.7995 12.3242 14.7995 10.7621 13.2374C10.3716 12.8469 9.7384 12.8469 9.34787 13.2374C8.95735 13.628 8.95735 14.2611 9.34787 14.6516C11.691 16.9948 15.49 16.9948 17.8332 14.6516L21.0151 11.4697C23.3583 9.12651 23.3583 5.32752 21.0151 2.98438C18.672 0.641234 14.873 0.641234 12.5299 2.98438L11.2924 4.22182Z"
                      className="svgFill"
                    />
                    <path
                      d="M2.98392 12.5303C0.640776 14.8735 0.640776 18.6724 2.98392 21.0156C5.32707 23.3587 9.12606 23.3587 11.4692 21.0156L12.7066 19.7782C13.0972 19.3876 13.0972 18.7545 12.7066 18.3639C12.3161 17.9734 11.683 17.9734 11.2924 18.3639L10.055 19.6014C8.49289 21.1635 5.96023 21.1635 4.39814 19.6014C2.83604 18.0393 2.83604 15.5066 4.39814 13.9445L7.58012 10.7625C9.14221 9.20045 11.6749 9.20045 13.237 10.7625C13.6275 11.1531 14.2607 11.1531 14.6512 10.7625C15.0417 10.372 15.0417 9.73886 14.6512 9.34833C12.308 7.00519 8.50905 7.00519 6.1659 9.34833L2.98392 12.5303Z"
                      className="svgFill"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_18080_42961">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {!isLinkCopied ? 'Copy link' : 'Copied'}
              </li>
              {!isMain && (
                <li>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_15105_90843)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.25 5.25012C7.25 2.62677 9.37665 0.500122 12 0.500122C14.6234 0.500122 16.75 2.62677 16.75 5.25012C16.75 7.87347 14.6234 10.0001 12 10.0001C9.37665 10.0001 7.25 7.87347 7.25 5.25012ZM12 2.50012C10.4812 2.50012 9.25 3.73134 9.25 5.25012C9.25 6.76891 10.4812 8.00012 12 8.00012C13.5188 8.00012 14.75 6.76891 14.75 5.25012C14.75 3.73134 13.5188 2.50012 12 2.50012Z"
                        fill="#71747A"
                      />
                      <path
                        d="M1.5 18.5001C1.5 16.2776 4.13498 12.0001 12 12.0001C12.5523 12.0001 13 12.4478 13 13.0001C13 13.5524 12.5523 14.0001 12 14.0001C4.86502 14.0001 3.5 17.7227 3.5 18.5001C3.5 19.0229 3.66989 19.3808 3.89461 19.6055C4.11933 19.8302 4.47725 20.0001 5 20.0001H11C11.5523 20.0001 12 20.4478 12 21.0001C12 21.5524 11.5523 22.0001 11 22.0001H5C4.02275 22.0001 3.13067 21.67 2.48039 21.0197C1.83011 20.3694 1.5 19.4774 1.5 18.5001Z"
                        fill="#71747A"
                      />
                      <path
                        d="M22.7071 14.293C23.0976 14.6835 23.0976 15.3167 22.7071 15.7072L20.4142 18.0001L22.7071 20.293C23.0976 20.6835 23.0976 21.3167 22.7071 21.7072C22.3166 22.0978 21.6834 22.0978 21.2929 21.7072L19 19.4143L16.7071 21.7072C16.3166 22.0978 15.6834 22.0978 15.2929 21.7072C14.9024 21.3167 14.9024 20.6835 15.2929 20.293L17.5858 18.0001L15.2929 15.7072C14.9024 15.3167 14.9024 14.6835 15.2929 14.293C15.6834 13.9025 16.3166 13.9025 16.7071 14.293L19 16.5859L21.2929 14.293C21.6834 13.9025 22.3166 13.9025 22.7071 14.293Z"
                        className="svgFill"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_15105_90843">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Remove from contacts
                </li>
              )}
            </ul>
          </div>
          <div className="user-info__content-right">
            <div className="user-info__content-about about">
              <h5 className="about__title">About</h5>
              <div className="about__text">
                {user.about ? (
                  user.about
                ) : (
                  <div>The user has not yet introduced himself</div>
                )}
              </div>
            </div>
            <ul className="user-info__short-info">
              <li>
                <img alt="phone" src={phoneSrc} />
                {user.phone ? user.phone : '-'}
              </li>
              <li>
                <img alt="email" src={emailSrc} />
                {user.email ? user.email : '-'}
              </li>
              <li>
                <img alt="joined" src={joinedSrc} />
                {`Joined: ${date}`}
              </li>
            </ul>
            {isMain && (
              <div className="user-info__main-info">
                If you don`t have contacts you can go and{' '}
                <Link to="/users">search for users to chat with</Link>.
                <br />
                if you already have chats, <Link to="/chats">go and chat!</Link>
              </div>
            )}
            <div className="changeTheme">
              <button>Dark</button>
              <button>Telegram</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserInfo;
