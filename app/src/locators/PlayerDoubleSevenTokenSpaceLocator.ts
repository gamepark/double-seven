import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class PlayerDoubleSevenTokenSpaceLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerTilesRackCoordinates = playerTilesInRackLocator.getCoordinates(location, context)
    return { x: playerTilesRackCoordinates.x! + 15, y: playerTilesRackCoordinates.y! + 7 }
  }

  navigationSorts = []
}

export const playerDoubleSevenTokenSpaceLocator = new PlayerDoubleSevenTokenSpaceLocator()
