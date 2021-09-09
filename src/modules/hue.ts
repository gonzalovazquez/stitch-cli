/* eslint-disable no-console */
/**
 * Module: Hue
 * Description:
 * Responsable for controlling Hue lights
 * Ref: https://developers.meethue.com/develop/get-started-2/
 */

const huejay = require('huejay')
const config = require('../config/config')

const Hue = function () { }

/**
 * Light Ids:
 * 13 // Hue Go - Mum
 * 14 // Hue Play - Right
 * 15 // Hue Play - Left
 * 16 // Hue Go - Gonzalo
 * 17 .. Filament
 * 18 // Filament
 * 19 // Lightbulb
 * 20 // Lightbulm
 */

// Create client
const client = new huejay.Client({
  username: config.hue_username,
  host: config.hue_ip,
  port: 80,
})

Hue.changeStateLight = function (id: number, state: boolean) {
  return client.lights.getById(id)
  .then(light => {
    light.on = state
    return client.lights.save(light)
  })
  .then(light => {
    const statusName = light.on ? 'on' : 'off'
    console.log(`Desk Light id: #${light.id} is ${statusName}`)
  })
  .catch(error => {
    console.log('Something went wrong')
    console.log(error.stack)
  })
}

export default Hue
