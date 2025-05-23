import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { DropAreaDescription, ListLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tileDescription } from '../material/TileDescription'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'

class PlayerTilesInGameLocator extends ListLocator {
  maxCount = 7
  gap = { x: tileDescription.width }

  getCoordinates(location: Location, context: MaterialContext) {
    const base = this.getBaseCoordinates(location, context)
    const y = base.y + yLocations[location.id ?? 0]
    if (location.x === undefined) {
      if(location.id !== undefined) {
        return { x: base.x - tileDescription.width * 3, y: y - tileDescription.height }
      }
      return { x: base.x, y: base.y - 9.1 }
    }
    return { x: base.x, y }
  }
  getBaseCoordinates(location: Location, context: MaterialContext) {
    const playerTilesRackCoordinates = playerTilesInRackLocator.getCoordinates(location, context)
    return { x: playerTilesRackCoordinates.x! - 3, y: playerTilesRackCoordinates.y! - 17 }
  }

  getLocationDescription(location: Location): LocationDescription {
    if (location.x === undefined) {
      if(location.id !== undefined) {
        return new PlayerTilesInGamePlaceDescription()
      }
      return new PlayerTilesInGameDescription()
    }
    return new PlayerTilesInGamePlaceDescription()
  }

  getNbTilesInFamily(location: Location, context: MaterialContext) {
    return context.rules
      .material(MaterialType.Tile)
      .location((loc) => loc.type === LocationType.PlayerTilesInGame && loc.id === location.id)
      .player(context.player).length
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
  width = tileDescription.width * 7
  height = tileDescription.height * 10
}

export class PlayerTilesInGamePlaceDescription extends DropAreaDescription {
  width = tileDescription.width
  height = tileDescription.height
}

export const playerTilesInGameLocator = new PlayerTilesInGameLocator()
