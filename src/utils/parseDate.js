export const parseDate = date => {
  const dateInstance = new Date(date);
  return dateInstance.getDate() + '/' + (dateInstance.getMonth() + 1) + '/' + dateInstance.getFullYear();
}