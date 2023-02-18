import React, { createContext, PropsWithChildren } from 'react';
import {
  ActionType,
  IChangeUserAction,
  IChatContext,
  IChatState,
  initialState,
} from '../types';

export const ChatContext = createContext<IChatContext>({
  data: {
    chatId: null,
    user: null,
    // user: {
    //   displayName: '',
    //   photoURL: '',
    //   uid: '',
    // },
  },
  dispatch: function (): void {
    null;
  },
});

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const INITIAL_STATE = initialState;

  const chatReducer = (state: IChatState, action: IChangeUserAction) => {
    switch (action.type) {
      case ActionType.ChangeUser:
        return {
          user: action.payload.user,
          chatId: action.payload.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer<
    React.Reducer<IChatState, IChangeUserAction>
  >(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
