import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { ActionType, IChangeUserAction, IChatState, IData } from '../types';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext<Partial<IData>>({});

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  const chatReducer = (state: IChatState, action: IChangeUserAction) => {
    console.log('action: ', action);
    console.log('state: ', state);
    switch (action.type) {
      case ActionType.ChangeUser:
        return {
          user: action.payload,
          chatId:
            currentUser!.uid > action.payload.uid
              ? currentUser?.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  console.log('INITIAL_STATE: ', INITIAL_STATE);
  console.log('dispatch: ', dispatch);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
