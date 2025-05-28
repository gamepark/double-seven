import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { DropAreaDescription, getRelativePlayerIndex, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { ActionsHelp } from '../material/help/ActionsHelp'
import { tileDescription } from '../material/TileDescription'
import { tilesRackDescription } from '../material/TilesRackDescription'

class PlayerTilesInRackLocator extends FlexLocator {
  gap = { x: tileDescription.width + 0.1 }

  lineSize = 5
  lineGap = { y: 2.35, z: 2 }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const base = this.getBaseCoordinates(location, context)

    if(location.x === undefined) return { x: base.x, y: base.y! + 4}
    return { x: base.x, y: base.y! + 0.4 }
  }

    getBaseCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    if (context.rules.players.length === 2) return coordinatesForTwoPlayers[index]
    if (context.rules.players.length === 3) return coordinatesForThreePlayers[index]
    if (context.rules.players.length === 4) return coordinatesForFourPlayers[index]
    return { x: 0, y: 0 }
  }

  getDropLocations() {
    return [{ type: LocationType.PlayerTilesInRack }]
  }

  locationDescription = new PlayerTilesInRackDescription(tilesRackDescription)

  navigationSorts = []
}

const coordinatesForTwoPlayers: Partial<Coordinates>[] = [
  { x: -50, y: 14 },
  { x: 45, y: 14 }
]

const coordinatesForThreePlayers: Partial<Coordinates>[] = [
  { x: -30, y: 14 },
  { x: 23, y: 14 },
  { x: 48, y: 14 }
]

const coordinatesForFourPlayers: Partial<Coordinates>[] = [
  { x: -55, y: 14 },
  { x: -30, y: 14 },
  { x: 23, y: 14 },
  { x: 48, y: 14 }
]

export class PlayerTilesInRackDescription extends DropAreaDescription {
  width = tilesRackDescription.width
  height = tilesRackDescription.height * 1.8
  borderRadius = 0.4

  help = ActionsHelp
}

export const playerTilesInRackLocator = new PlayerTilesInRackLocator()
