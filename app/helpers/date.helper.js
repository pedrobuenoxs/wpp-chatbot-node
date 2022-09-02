function changeTimezone(date, timezone) {
  var invdate = new Date(
    date.toLocaleString("en-US", {
      timeZone: timezone,
    })
  );
  var diff = date.getTime() - invdate.getTime();
  return new Date(date.getTime() - diff);
}

function daysDiff(date1, date2) {
  var diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diff / (1000 * 3600 * 24));
}

var here = new Date(1662081996000);
var there = changeTimezone(here, "America/Sao_Paulo");
console.log("five:" + here); // 1

var diff = daysDiff(here, there);
console.log(diff);

module.exports = { changeTimezone, daysDiff };
