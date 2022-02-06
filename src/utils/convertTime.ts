//convert time to localstring
// export const convertTime = (time: string) => {
//   const created = new Date(time);
//   const now = new Date();
//   return new Date(time).toLocaleString();
// };

//show time ago
export const timeAgo = (time: string) => {
  const created = new Date(time);
  const now = new Date();
  const diff = now.getTime() - created.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  return months > 0
    ? `${months} months ago`
    : days > 0
    ? `${days} days ago`
    : hours > 0
    ? `${hours} hours ago`
    : minutes > 0
    ? `${minutes} minutes ago`
    : `${seconds} seconds ago`;
};
