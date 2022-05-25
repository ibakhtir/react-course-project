export function displayDate(data) {
  const date = new Date(parseInt(data));
  const dateNow = new Date();

  const yearDif = dateNow.getFullYear() - date.getFullYear();
  const dayDif = dateNow.getDate() - date.getDate();
  const hourDif = dateNow.getHours() - date.getHours();
  const minutesDif = dateNow.getMinutes() - date.getMinutes();

  const day =
    date.getDate().toString().length === 2
      ? date.getDate()
      : "0" + date.getDate();

  const dateOfData =
    yearDif !== 0
      ? day + "." + (date.getMonth() + 1) + "." + date.getFullYear()
      : dayDif !== 0
      ? day + "." + (date.getMonth() + 1)
      : hourDif !== 0
      ? `${date.getHours()}:${date.getMinutes()}`
      : minutesDif >= 0 && minutesDif < 5
      ? "1 минуту назад"
      : minutesDif >= 5 && minutesDif < 10
      ? "5 минут назад"
      : minutesDif >= 10 && minutesDif < 30
      ? "10 минут назад"
      : "30 минут назад";

  return dateOfData;
}
