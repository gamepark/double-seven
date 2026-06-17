import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { sevenTokenDescription } from '../material/SevenTokenDescription'
import { tilesRackLocator } from './TilesRackLocator'

class PlayerSevenTokenSpaceLocator extends ListLocator {
  gap = { x: sevenTokenDescription.width + 1 }
  maxCount = 3

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const { x = 0, y = 0 } = tilesRackLocator.getCoordinates(location, context)
    return { x: x - 7, y: y + 7 }
  }

  getPositionDependencies(_location: Location, context: MaterialContext) {
    return context.rules.players.length
  }

  navigationSorts = []
}

export const playerSevenTokenSpaceLocator = new PlayerSevenTokenSpaceLocator()
