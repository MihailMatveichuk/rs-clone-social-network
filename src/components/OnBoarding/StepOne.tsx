type StepOneProps = {
  title: string;
  text: string;
  children: React.ReactNode;
  onSubmit: () => void;
  id?: string;
};

const StepOne = ({
  title,
  text,
  children,
  id = 'id',
  onSubmit,
}: StepOneProps) => {
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="on-boarding__step">
      <h1 className="on-boarding__title title">{title}</h1>
      <div className="on-boarding__text text">{text}</div>
      <form onSubmit={onSubmitHandler} className="on-boarding__form">
        {children}
        <div className="on-boarding__btn-container">
          <button className="btn btn--primary" type="submit" id={id}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
