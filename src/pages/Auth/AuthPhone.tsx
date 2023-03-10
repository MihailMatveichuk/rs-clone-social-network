import { useState, useEffect } from 'react';
import {
  browserSessionPersistence,
  setPersistence,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { auth } from '../../firebase';
import StepOne from '../../components/OnBoarding/StepOne';
import OtpInput from '../../components/OnBoarding/OtpInput';
import { useNavigate } from 'react-router-dom';
import { checkUser, createUserViaPhone } from '../../api';

const AuthPhone = () => {
  const [step, setStep] = useState<number>(1);
  const [phone, setPhone] = useState<string>('');
  const [rec, setRec] = useState<RecaptchaVerifier | null>(null);
  const [otp, setOtp] = useState<string>('');
  const [confirmRes, setConfirmRes] = useState<ConfirmationResult | null>(null);
  const navigate = useNavigate();

  const onBackClick = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate('/auth');
    }
  };

  useEffect(() => {
    if (step === 1) {
      try {
        setRecaptchaVerifier();
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  const setRecaptchaVerifier = async () => {
    if (rec) return;
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {},
        auth
      );
      setRec(recaptchaVerifier);
      await recaptchaVerifier.render();
    } catch (e) {
      if (rec) {
        setRec(null);
        setRecaptchaVerifier();
      }
    }
  };
  const onCodeSubmitHandler = async () => {
    if (!confirmRes) return;
    try {
      await setPersistence(auth, browserSessionPersistence);
      const res = await confirmRes.confirm(otp);
      const user = await checkUser(res.user.uid);
      if (!user) {
        await createUserViaPhone({
          uid: res.user.uid,
          phone: res.user.phoneNumber!,
        });
        navigate('/register');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log('onCodeSubmitHandler', err);
    }
  };

  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onSignInSubmit = async () => {
    if (phone) {
      try {
        console.log(rec);

        if (!rec) return;
        await setPersistence(auth, browserSessionPersistence);
        const res = await signInWithPhoneNumber(auth, phone, rec);
        window.confirmationResult = res;
        setConfirmRes(res);
        setStep(2);
        document.getElementById('recaptcha-container')!.style.display = 'none';
      } catch (e) {
        console.log('signInWithPhoneNumber', e);
      }
    }
  };

  return (
    <div className="on-boarding">
      <div className="on-boarding__inner">
        <div id="recaptcha-container"></div>
        <div className="on-boarding__top">
          <button
            title="button"
            className="on-boarding__go-back"
            onClick={onBackClick}
          >
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
          </button>
        </div>
        {step === 1 && (
          <StepOne
            title="What???s your phone?"
            text="We???ll send you a sign-in code"
            onSubmit={onSignInSubmit}
            id={'sign-in-button'}
          >
            <input
              type="text"
              placeholder="Insert mobile phone"
              required
              pattern="^([+]{1}[0-9]{11,20})?$"
              className="input on-boarding__email"
              onInput={changePhone}
            />
          </StepOne>
        )}
        {step === 2 && (
          <StepOne
            title="Enter sign-in code"
            text={`We just sent it to?? ${phone}.`}
            onSubmit={onCodeSubmitHandler}
          >
            <OtpInput value={otp} valueLength={6} onChange={setOtp}></OtpInput>
          </StepOne>
        )}
      </div>
    </div>
  );
};

export default AuthPhone;
