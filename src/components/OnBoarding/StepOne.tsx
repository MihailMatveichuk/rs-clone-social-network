import React, { ReactNode } from 'react';

type StepOneProps = {
  title: string;
  text: string;
  children: React.ReactNode;
  onSubmit: () => void;
}



const StepOne = ({title, text, children, onSubmit}: StepOneProps) => {

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit()
  }

  return (
    <div className='on-boarding__step'>
    <h1 className='on-boarding__title title'>
      {title}
    </h1>
    <div className='on-boarding__text text'>
      {text}
    </div>
    <form onSubmit={onSubmitHandler}>
      {children}
      <div className='on-boarding__btn-container'>
        <button className='btn btn--primary'
                type='submit'
                
        >
          Next
        </button>
    </div>
    </form>
  </div>
  );
};

export default StepOne;
