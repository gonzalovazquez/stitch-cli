/**
 * Module: Weather
 * Description:
 * The responsability of this module is to fetch weather and
 * expose an interface to the resolved data
 */
const fetch = require('node-fetch')

const Weather = function () { }

Weather.api = function<T> (url: string): Promise<T> {
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<T>
  })
}

Weather.getWeather = function (city: string, weatherToken: string) {
  return Weather.api<{
    main: string;
    name: string;
  }>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${weatherToken}&units=metric`).then(({main, name}) => {
    console.log(`The weather in ${name} is: ${JSON.stringify(main)}`)
    return {main, name}
  })
  .catch(error => {
    console.log(error)
  })
}

export default Weather
