import moment from 'moment';

export const calcDateDifference = (date: string): string => {
  const dateDifference = moment(date).fromNow();
  return dateDifference;
};
