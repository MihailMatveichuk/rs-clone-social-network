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
  dispatch: () => {};
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
