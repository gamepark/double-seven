import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { tilesRackLocator } from './TilesRackLocator'

class PlayerDoubleSevenTokenSpaceLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const { x = 0, y = 0 } = tilesRackLocator.getCoordinates(location, context)
    return { x: x + 10, y: y + 7 }
  }

  navigationSorts = []
}

export const playerDoubleSevenTokenSpaceLocator = new PlayerDoubleSevenTokenSpaceLocator()
