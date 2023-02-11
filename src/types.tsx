import { User } from 'firebase/auth';

export interface IMessage {
  author: string;
}

export enum AuthType {
  EMAIL,
  PHONE,
}

export type ContextUser = {
  currentUser: User | null | undefined;
};

export type authUser = {
  displayName: string;
  photoURL: string;
  uid: string;
};

export interface IChatContext {
  data: IChatState;
  dispatch: React.Dispatch<IChangeUserAction>;
}

export enum ActionType {
  ChangeUser = 'CHANGE_USER',
}

export const initialState: IChatState = {
  chatId: 'null',
  user: {
    displayName: '',
    photoURL: '',
    uid: '',
  },
};

export interface IChangeUserAction {
  type: ActionType;
  payload: authUser;
}
export interface IChatState {
  chatId: string;
  user: authUser;
}
export interface IMessageFirebase {
  id: string;
  senderId: string;
  img: string;
  text: string;
  date: {
    seconds: number;
  };
}
export interface IMessageProp {
  message: IMessageFirebase;
}
