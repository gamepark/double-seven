import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tileDescription } from '../material/TileDescription'
import { tilesRackLocator } from './TilesRackLocator'

class PlayerTilesInGameLocator extends ListLocator {
  maxCount = 7
  gap = { x: tileDescription.width }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y = 0 } = tilesRackLocator.getCoordinates(location, context)
    return { x: x - 8, y: y - tileDescription.height * location.id - 10 }
  }

  navigationSorts = []
}

export const playerTilesInGameLocator = new PlayerTilesInGameLocator()
