import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class PlayerDoubleSevenTokenSpaceLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerTilesRackCoordinates = playerTilesInRackLocator.getCoordinates(location, context)
    return { x: playerTilesRackCoordinates.x! + 19, y: playerTilesRackCoordinates.y! - 1 }
  }

  navigationSorts = []
}

export const playerDoubleSevenTokenSpaceLocator = new PlayerDoubleSevenTokenSpaceLocator()
