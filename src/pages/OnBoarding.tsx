import {useState} from 'react';
import logoSrc from '../assets/images/logo.png';
import OtpInput from '../components/OnBoarding/OtpInput';
import StepOne from '../components/OnBoarding/StepOne';
import { AuthType } from '../types';
export const OnBoarding = () => {
  const [step, setStep] = useState<number>(1);
  const [type, setAuthType] = useState<AuthType | null>(null)
  const [otp, setOtp] = useState<string>('');

  const onSubmitHandler = () => {
    setStep(previousStep => previousStep + 1);
    console.log(step)
  }

  const goToNextStep = (type: AuthType) => {
    if (type === AuthType.EMAIL) {
      setAuthType(AuthType.EMAIL)
      setStep(previousStep => previousStep + 1);
    }
    if (type === AuthType.PHONE) {
      setAuthType(AuthType.PHONE)
      setStep(previousStep => previousStep + 1);
    }
  }

  return (
    <div className='on-boarding'>
      <div className="on-boarding__inner">
        <div className="on-boarding__top">
          { step !== 1 && 
            <button className="on-boarding__go-back"
              onClick={() => setStep(prev => prev - 1)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_17859_38408)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2071 2.79289C16.5976 3.18342 16.5976 3.81658 16.2071 4.20711L8.41421 12L16.2071 19.7929C16.5976 20.1834 16.5976 20.8166 16.2071 21.2071C15.8166 21.5976 15.1834 21.5976 14.7929 21.2071L6.29289 12.7071C5.90237 12.3166 5.90237 11.6834 6.29289 11.2929L14.7929 2.79289C15.1834 2.40237 15.8166 2.40237 16.2071 2.79289Z" fill="#71747A"/>
                </g>
                <defs>
                  <clipPath id="clip0_17859_38408">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          }
        </div>
        {step === 1 && <div className="on-boarding__step">
          <img className="on-boarding__logo"
               src={logoSrc}
               alt='logo'
          />
          <h1 className="on-boarding__title title">
            Openland
          </h1>
          <div className="on-boarding__text text">
            Modern social network
            built for you, not advertisers
          </div>
          <div className="on-boarding__btn-container">
            <button className="btn btn--primary"
                    onClick={() => goToNextStep(AuthType.PHONE)}
            >
                      Continue with phone
            </button>
            <button className="btn btn--grey"
                    onClick={() => goToNextStep(AuthType.EMAIL)}
            >
              Continue with email
            </button>
          </div>
        </div>}
        {type === AuthType.EMAIL && step === 2 && 
          <StepOne
            title='What’s your email?'
            text='We’ll send you a sign-in code'
            onSubmit={onSubmitHandler}
          >
            <input
              type='text'
              placeholder='email'
              className="input on-boarding__email"
              />
          </StepOne>
        }
        {type === AuthType.PHONE && step === 2 && 
          <StepOne
            title='What’s your phone?'
            text='We’ll send you a sign-in code'
            onSubmit={onSubmitHandler}
          >
            <input
              type='text'
              placeholder='phone'
              className="input on-boarding__email"
              />
          </StepOne>
        }
        {type === AuthType.EMAIL && step === 2 && 
          <StepOne
            title='What’s your email?'
            text='We’ll send you a sign-in code'
            onSubmit={onSubmitHandler}
          >
            <input
              type='text'
              placeholder='email'
              className="input on-boarding__email"
              />
          </StepOne>
        }
        {type === AuthType.PHONE && step === 3 && 
        <StepOne
                title='Enter sign-in code?'
                text='We just sent it to +7 999 205-65-34. Haven’t received? Wait for 57 sec'
                onSubmit={onSubmitHandler}
              >
          <OtpInput value={otp} valueLength={6} onChange={setOtp}></OtpInput>
        </StepOne>
      }
      {type === AuthType.EMAIL && step === 3 && 
        <StepOne
          title='Enter sign-in code'
          text='We just sent it to mail@pvashenko.com Haven’t received? Resend'
          onSubmit={onSubmitHandler}
        >
          <OtpInput value={otp} valueLength={6} onChange={setOtp}></OtpInput>
        </StepOne>
      }
      </div>
    </div>
  );
};

