/* eslint-disable no-console */
/**
 * Module: TPlink Kasa
 * Description:
 * Responsable for controlling TPLink HS100 plulgs
 * Ref: https://github.com/adumont/tplink-cloud-api
 */

const {login} = require('./tplink/tplink')
const config = require('../config/config')

const TPLink = function () { }

TPLink.toggle = async function () {
  const tplink = await login(config.tpLink_username, config.tpLink_password)
  await tplink.getDeviceList()
  const myPlug = tplink.getHS100('Key Light')
  await myPlug.toggle()
  const status = await myPlug.getRelayState()
  const statusName = status ? 'on' : 'off'
  console.log(`Key light is ${statusName}`)
}

export default TPLink
