import { useState } from 'react';
import StepOne from '../../components/OnBoarding/StepOne';
import {
  browserSessionPersistence,
  signInWithEmailAndPassword,
  setPersistence,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';

const AuthEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const login = async () => {
  //   try {
  //     await setPersistence(auth, browserSessionPersistence);
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate('/');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onSubmitHandlerEmail = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      const err = e as Error;
      console.log(err.message);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/register');
    }
  };
  return (
    <div className="on-boarding">
      <div className="on-boarding__inner">
        <div className="on-boarding__top">
          <Link to={'/auth'} className="on-boarding__go-back">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17859_38408)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2071 2.79289C16.5976 3.18342 16.5976 3.81658 16.2071 4.20711L8.41421 12L16.2071 19.7929C16.5976 20.1834 16.5976 20.8166 16.2071 21.2071C15.8166 21.5976 15.1834 21.5976 14.7929 21.2071L6.29289 12.7071C5.90237 12.3166 5.90237 11.6834 6.29289 11.2929L14.7929 2.79289C15.1834 2.40237 15.8166 2.40237 16.2071 2.79289Z"
                  fill="#71747A"
                />
              </g>
              <defs>
                <clipPath id="clip0_17859_38408">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <StepOne
          title="What’s your email and password?"
          text="We’ll send you a sign-in code"
          onSubmit={onSubmitHandlerEmail}
        >
          <input
            type="email"
            placeholder="email"
            className="input on-boarding__email"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="password"
            className="input on-boarding__password"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </StepOne>
      </div>
    </div>
  );
};

export default AuthEmail;
