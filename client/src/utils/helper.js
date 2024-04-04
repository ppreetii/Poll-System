 export function daysLeftToExpire(expirationDate) {
  const expireDate = new Date(expirationDate);
  const currentDate = new Date();

  const difference = expireDate - currentDate;

  const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return daysLeft > 0 ? daysLeft : 0;
}
