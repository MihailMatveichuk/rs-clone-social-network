import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    // <ColorRing
    //   visible={true}
    //   height="50"
    //   width="50"
    //   ariaLabel="blocks-loading"
    //   wrapperStyle={{}}
    //   wrapperClass="blocks-wrapper"
    //   color='#C8C9CC'
    // />
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
