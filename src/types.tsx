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
  //setCurrentUser: (currentUser: User | null | undefined) => void;
};

export type authUser = {
  displayName: string;
  photoURL: string;
  uid: string;
};
export interface IChatContext {
  chatId: string;
  user: authUser;
}
export interface IData {
  data: IChatContext;
  // dispatch: (action: MapViewerAction) => void;
  // dispatch: () => {};
}

export enum ActionType {
  ChangeUser = 'CHANGE_USER',
}

export const initialState: IChatState = {
  chatId: 'null',
  user: {},
};

export interface IChangeUserAction {
  type: ActionType;
  payload: authUser;
}
export interface IChatState {
  chatId: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: {};
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
