import { string } from '@oclif/command/lib/flags'
import {expect, test} from '@oclif/test'

import cmd = require('../src')

/**
 * @TODO: Fix test, nock is not matching the path
 */
describe('weather', () => {
  test
  .nock('https://api.openweathermap.org:443', api => api
  .get('/data/2.5/weather')
  .reply(200, {name: 'Oslo'})
  )
  .stdout()
  .do(() => cmd.run(['-w', 'Oslo']))
  .it('runs weather -w Oslo', ctx => {
    expect(ctx.stdout).to.contain('Oslo')
  })
})
