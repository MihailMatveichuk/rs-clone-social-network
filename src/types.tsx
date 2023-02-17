import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
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
  chatId: null,
  user: null
};



export interface IChangeUserAction {
  type: ActionType;
  payload: {
    user: string,
    uid: string;
  };
}
export interface IChatState {
  chatId: string | null;
  user: string | null;
}
export interface IMessageFirebase {
  id: string;
  senderId: string;
  img: string;
  text: string;
  date: Timestamp;
  // date: {
  //   seconds: number;
  // };
}
export interface IMessageProp {
  message: IMessageFirebase;
}

// export interface IFile {
//   lastModified: number;
//   lastModifiedDate: Timestamp;
//   name: string;
//   size: number;
//   type: string;
//   webkitRelativePath: string;
// }
