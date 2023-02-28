import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

export const getLastSeenText = (lastSeen: Timestamp) => {
  const date = lastSeen?.toDate();
  const diff = moment(date).fromNow();
  return `last seen ${diff}`;
};
