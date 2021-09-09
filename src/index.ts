import {Command, flags} from '@oclif/command'
import Lifx from './modules/lifx'
import Weather from './modules/weather'
import TPLink from './modules/kasa'
import Hue from './modules/hue'

class Stitch extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    weather: flags.boolean({
      char: 'w',
      description: 'print the weather',
    }),
    beam: flags.boolean({
      char: 'b',
      description: 'toggles Lifx beam',
    }),
    key: flags.boolean({
      char: 'k',
      description: 'toggle TPLink Key Light',
    }),
    desk: flags.boolean({
      char: 'd',
      description: 'toggle Hue Monitor Lights',
    }),
  }

  static args = [
    {
      name: 'city',
      required: false,
      description: 'the city',
      default: 'toronto',
    },
    {
      name: 'state',
      required: false,
      description: 'the state of the lights',
      default: true,
    },
  ]

  async run() {
    const {args, flags} = this.parse(Stitch)

    if (flags.beam) {
      Lifx.getLifxToggle()
    }

    if (flags.weather) {
      Weather.getWeather(args.city)
    }

    if (flags.key) {
      TPLink.toggle()
    }

    if (flags.desk) {
      // eslint-disable-next-line no-unneeded-ternary
      const lightState = args.state === 'true' ? true : false
      Hue.changeStateLight(14, lightState)
      Hue.changeStateLight(15, lightState)
    }
  }
}

export = Stitch
