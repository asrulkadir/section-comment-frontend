//convert time to localstring
export const convertTime = (time: string) => {
  return new Date(time).toLocaleString();
};
