function useRegex(input, regex) {
  if (regex == undefined)
    throw new Error(
      `"missing regex params, try useRegex("🎾⛹️‍♀️🤾‍♀️","emojiRegex")`
    );
  let regexArray = {
    emojiRegex: /<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu,
    commandRegex: /![a-zA-Z]+/,
    flagRegex: /-[a-zA-Z]+/,
    dateRegex:
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    textRegex: /^!-/,
  };
  let regexParameter = regexArray[regex];
  return regexParameter.exec(input) != null && regexParameter
    ? regexParameter.exec(input)
    : false;
}

const getRegex = (msgArray, regex) => {
  try {
    return msgArray.reduce((acc, curr) => {
      return useRegex(curr, regex) ? curr : acc;
    }, "");
  } catch (error) {
    console.log(error);
  }
};

const getText = (msgArray) => {
  const filteredText = msgArray.reduce((acc, curr) => {
    return getRegex([curr], "emojiRegex") ||
      getRegex([curr], "commandRegex") ||
      getRegex([curr], "flagRegex") ||
      getRegex([curr], "dateRegex")
      ? acc
      : [...acc, curr];
  }, []);
  return filteredText;
};

const objectify = (msg) => {
  const array = msg.split(" ");
  const obj = {
    flag: getRegex(array, "flagRegex") || false,
    emoji: getRegex(array, "emojiRegex") || false,
    command: getRegex(array, "commandRegex") || false,
    date: getRegex(array, "dateRegex") || false,
    text: getText(array) || false,
    array: { ...array },
  };
  return obj;
};

module.exports = objectify;
