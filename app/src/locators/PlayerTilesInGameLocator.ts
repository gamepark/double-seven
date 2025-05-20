import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { DropAreaDescription, FlexLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { tileDescription } from '../material/TileDescription'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class PlayerTilesInGameLocator extends FlexLocator {
  lineSize = 11

  getGap(location: Location, context: MaterialContext): Partial<Coordinates> {
    const nbTilesInThisLine = context.rules
      .material(MaterialType.Tile)
      .location((loc) => loc.type === LocationType.PlayerTilesInGame && loc.player === location.player && loc.y === location.y).length
    if (nbTilesInThisLine < 9) {
      return { x: tileDescription.width }
    }
    return { x: tileDescription.width / 1.3 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const base = this.getBaseCoordinates(location, context)
    if (location.x === undefined) return { x: base.x - 1.2, y: base.y - 6 }
    return { x: base.x, y: base.y + yLocations[location.y ?? 0] }
  }
  getBaseCoordinates(location: Location, context: MaterialContext) {
    const playerTilesRackCoordinates = playerTilesInRackLocator.getCoordinates(location, context)
    return { x: playerTilesRackCoordinates.x! - 3, y: playerTilesRackCoordinates.y! - 17 }
  }

  getLocationDescription(location: Location): LocationDescription {
    if (location.x === undefined) return new PlayerTilesInGameDescription()
    return new PlayerTilesInGamePlaceDescription()
  }
}

const yLocations = [
  tileDescription.height * 3,
  tileDescription.height * 2,
  tileDescription.height,
  0,
  tileDescription.height * -1,
  tileDescription.height * -2,
  tileDescription.height * -3,
  tileDescription.height * -4,
  tileDescription.height * -5,
  tileDescription.height * -6,
  tileDescription.height * -7
]

export class PlayerTilesInGameDescription extends DropAreaDescription {
  width = tileDescription.width * 10
  height = tileDescription.height * 10
}

export class PlayerTilesInGamePlaceDescription extends DropAreaDescription {
  width = tileDescription.width
  height = tileDescription.height
}

export const playerTilesInGameLocator = new PlayerTilesInGameLocator()
