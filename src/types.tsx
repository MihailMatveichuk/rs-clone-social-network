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
