import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tilesRackDescription } from '../material/TilesRackDescription'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class TilesRackLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    const base = playerTilesInRackLocator.getCoordinates(location, context)

    return { x: base.x! + tilesRackDescription.width / 3.7, y: base.y! + tilesRackDescription.height / 2.1 }
  }
}

export const tilesRackLocator = new TilesRackLocator()
