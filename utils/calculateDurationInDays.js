export const calculateDurationInDays = (checkIn, checkOut) => {
  const millisecondsInDay = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const differenceInMilliseconds = endDate - startDate;
  return Math.floor(differenceInMilliseconds / millisecondsInDay);
};