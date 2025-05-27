import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class TilesRackLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const base = playerTilesInRackLocator.getCoordinates(location, context)

    return { x: base.x! + 5.3, y: base.y! - 0.2}
  }

  navigationSorts = []
}

export const tilesRackLocator = new TilesRackLocator()
