function changeTimezone(date, timezone) {
  var invdate = new Date(
    date.toLocaleString("en-US", {
      timeZone: timezone,
    })
  );
  var diff = date.getTime() - invdate.getTime();
  return new Date(date.getTime() - diff);
}

function daysDiff(date1, date2, score) {
  var diff = Math.abs(date1.getTime() - date2.getTime());
  if (score === 0) {
    return 1;
  }
  if (diff < 1000 * 60 * 60 * 24) {
    return 0;
  }

  return Math.ceil(diff / (1000 * 3600 * 18));
}

module.exports = { changeTimezone, daysDiff };
