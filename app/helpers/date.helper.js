function changeTimezone(date, timezone) {
  var date = new Date(
    date.toLocaleString("en-US", {
      timeZone: timezone,
    })
  );
  var diff = date.getTime() - invdate.getTime();
  return new Date(date.getTime() - diff);
}

function isToday(date1, date2) {
  const now = date1.toDateString();
  const today = date2.toDateString();
  if (now === today) {
    return true;
  }
  return false;
}

function isTomorrow(date1, date2) {
  const now = date1.toDateString();
  const tomorrow = new Date(date2.getTime() + 24 * 60 * 60 * 1000);
  if (now === tomorrow.toDateString()) {
    return true;
  }
  return false;
}
module.exports = { changeTimezone, isTomorrow, isToday };
