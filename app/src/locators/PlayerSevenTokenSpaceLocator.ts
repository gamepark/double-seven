import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class PlayerSevenTokenSpaceLocator extends ListLocator {
  gap = { y: 1.5 }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const base = this.getBaseCoordinates(location, context)
    const locationY = location.y ?? 0
    return { x: base.x, y: base.y + locationY * this.gap.y }
  }

  getBaseCoordinates(location: Location, context: MaterialContext) {
    const playerTilesRackCoordinates = playerTilesInRackLocator.getCoordinates(location, context)
    return { x: playerTilesRackCoordinates.x! - 7, y: playerTilesRackCoordinates.y! - 2 }
  }
}

export const playerSevenTokenSpaceLocator = new PlayerSevenTokenSpaceLocator()
