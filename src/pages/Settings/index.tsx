import { useContext, useEffect, useState  } from 'react';
import UserInfo from '../../components/Main/UserInfo';
import Layout from '../Layout';
import { AuthContext } from '../../context/AuthContext';
import { changeUserTheme, checkUser } from '../../api';
import { DocumentData } from 'firebase/firestore';
import { changeTheme, Themes, getTheme } from '../../utlis/theme';
import CustomInput from '../../components/UI/Input';
import InputFile from '../../components/InputFile';

const SettingsPage = () => {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<DocumentData | null>(null)
  const [name, setName] = useState<string>('')
  const [about, setAbout] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  
  useEffect(() => {
    getUser()
  },[])

  const onChangeThemeHandler = async (theme: Themes) => {
    changeTheme(theme)
    sessionStorage.setItem('theme', theme);
    await changeUserTheme(currentUser!.uid, theme)
  }

  const getUser = async () => {
    const u = await checkUser(currentUser!.uid)
    if (u) {
      setUser(u)
    }
  }
  return (
    <Layout>
      <main className="user-info settings">
        {user && <div className="settings__content">
          <div className="settings__block">
            <h4 className="settings__block-title">Change theme</h4>
            <div className='settings__button-wrapper'>
              <button className='btn btn--primary'
                onClick={() => onChangeThemeHandler(Themes.LIGHT)}
              >
                Light (default)
              </button>
              <button className='btn btn--primary'
                      onClick={() => onChangeThemeHandler(Themes.DARK)}
              >
                Dark
              </button>
              <button className='btn btn--primary'
                      onClick={() => onChangeThemeHandler(Themes.NORTHERN_SHINING)}
              >
                Northern shining
              </button>
            </div>
          </div>
          <div className="settings__block">
            <h4 className="settings__block-title">Edit profile</h4>
            <div className='settings__block-content'>
            <form>
              <CustomInput
                placeholder='First name'
                onChange={(val) =>setName(val)}
                value={name}
                errorText=""
              />
              <CustomInput
                placeholder='Last name'
                onChange={(val) =>setLastName(val)}
                value={lastName}
                errorText=""
              />
              <CustomInput
                placeholder='Email'
                onChange={(val) =>setEmail(val)}
                value={lastName}
                errorText=""
              />
              <CustomInput
                placeholder='Phone'
                onChange={(val) =>setEmail(val)}
                value={lastName}
                errorText=""
              />
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder='About'
              ></textarea>
              <button className="btn btn--primary">Save changes</button>
            </form>
            <InputFile />
            </div>

          </div>
        </div>}
      </main>
    </Layout>
  );
};

export default SettingsPage;
