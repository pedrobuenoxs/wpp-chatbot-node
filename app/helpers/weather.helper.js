var axios = require("axios");
const { API_KEY } = require("../../env.js");

async function getWeather() {
  try {
    const response = await axios.get("http://api.airvisual.com/v2/city", {
      params: {
        city: "Rio Claro",
        state: "Sao Paulo",
        country: "Brazil",
        key: API_KEY,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getWeather;
