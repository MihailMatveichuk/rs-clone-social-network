import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { defaultSrc } from '../assets/images/avatar_logo';
import { storage } from '../firebase';

const InputFile = () => {
  const [logo, setLogo] = useState('');
  const logoRef = ref(storage, `logo/${logo.name}`);
  const logoUrl = ref(storage, `logo/`);

  const onSelected = async () => {
    await uploadBytes(logoRef, logo).then((snapshot) => {
      getDownloadURL(snapshot.ref);
    });
  };

  useEffect(() => {
    listAll(logoUrl).then((res) => {
      res.items.forEach((item) => {
        console.log(item);
        getDownloadURL(item).then((url) => {
          setLogo((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <input
        style={{ display: 'none' }}
        type="file"
        id="file"
        onChange={onSelected}
        accept=".jpg, .jpeg, .png"
      />
      <label htmlFor="file">
        <img width={50} height={50} src={logo || defaultSrc} alt="" />
        {/* <AvatarLogo /> */}
      </label>
    </div>
  );
};

export default InputFile;
