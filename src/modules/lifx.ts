/**
 * Module: Lifx
 * Description:
 * The responsability of this module is to provide two methods
 * on and off to the lifx lights
 * Ref: https://api.developer.lifx.com/
 */
const fetch = require('node-fetch')
const config = require('../config/config')

const Lifx = function () { }

Lifx.apiLifx = function<T> (url: string, token: string): Promise<T> {
  return fetch(url, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<T>
  })
}

Lifx.getLifxToggle = function () {
  return Lifx.apiLifx<{
    results: string;
  }>(config.lifx_url, config.lifx_token).then(({results}) => {
    console.log(`The beam is ${results[0]['power']}`)
    return results
  })
  .catch(error => {
    console.log(error)
  })
}

export default Lifx
