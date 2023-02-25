import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <TailSpin
      height="40"
      width="40"
      color="#C8C9CC"
      ariaLabel="tail-spin-loading"
      radius="4"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      visible={true}
    />
  );
};

export default Loading;
