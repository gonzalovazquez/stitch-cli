/* eslint-disable no-console */
/**
 * Module: TPlink Kasa
 * Description:
 * Responsable for controlling TPLink HS100 plulgs
 * Ref: https://github.com/adumont/tplink-cloud-api
 */

const {login} = require('./tplink/tplink')

const TPLink = function () { }

TPLink.toggle = async function (tplinkUsername, tplinkPassword) {
  const tplink = await login(tplinkUsername, tplinkPassword)
  await tplink.getDeviceList()
  const myPlug = tplink.getHS100('Key Light')
  await myPlug.toggle()
  const status = await myPlug.getRelayState()
  const statusName = status ? 'on' : 'off'
  console.log(`Key light is ${statusName}`)
}

export default TPLink
