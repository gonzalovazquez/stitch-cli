import {Command, flags} from '@oclif/command'
import Lifx from './modules/lifx'
import Weather from './modules/weather'
import TPLink from './modules/kasa'

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
    light: flags.boolean({
      char: 'l',
      description: 'toggle Key light',
    }),
    key: flags.boolean({
      char: 'k',
      description: 'toggle TPLink Key Light',
    }),
  }

  static args = [
    {
      name: 'city',
      required: false,
      description: 'the city',
      default: 'toronto',
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
  }
}

export = Stitch
