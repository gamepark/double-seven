import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { getRelativePlayerIndex, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { tileDescription } from '../material/TileDescription'

class PlayerTilesInRackLocator extends FlexLocator {
  gap = { x: tileDescription.width }

  lineSize = 5
  lineGap = { y: 2.35 }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    if (context.rules.players.length === 2) return coordinatesForTwoPlayers[index]
    if (context.rules.players.length === 3) return coordinatesForThreePlayers[index]
    if (context.rules.players.length === 4) return coordinatesForFourPlayers[index]
    return { x: 0, y: 0 }
  }

  getDropLocations() {
    return [{ type: LocationType.PlayerTilesInRack }]
  }

}

const coordinatesForTwoPlayers: Partial<Coordinates>[] = [
  { x: -44, y: 20 },
  { x: 35, y: 20 }
]

const coordinatesForThreePlayers: Partial<Coordinates>[] = [
  { x: -44, y: 20 },
  { x: 35, y: 20 },
  { x: 65, y: 20 }
]

const coordinatesForFourPlayers: Partial<Coordinates>[] = [
  { x: -74, y: 20 },
  { x: -44, y: 20 },
  { x: 35, y: 20 },
  { x: 65, y: 20 }
]

export const playerTilesInRackLocator = new PlayerTilesInRackLocator()
