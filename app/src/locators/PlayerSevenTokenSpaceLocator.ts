import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class PlayerSevenTokenSpaceLocator extends ListLocator {
  gap = { x: 2.3 }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const base = this.getBaseCoordinates(location, context)
    const locationX = location.x ?? 0
    return { x: base.x + locationX * this.gap.x, y: base.y }
  }

  getBaseCoordinates(location: Location, context: MaterialContext) {
    const playerTilesRackCoordinates = playerTilesInRackLocator.getCoordinates(location, context)
    return { x: playerTilesRackCoordinates.x! - 1, y: playerTilesRackCoordinates.y! + 10 }
  }

  navigationSorts = []
}

export const playerSevenTokenSpaceLocator = new PlayerSevenTokenSpaceLocator()
