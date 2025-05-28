import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { DropAreaDescription, FlexLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { ActionsHelp } from '../material/help/ActionsHelp'
import { tileDescription } from '../material/TileDescription'
import { tilesRackDescription } from '../material/TilesRackDescription'

class PlayerTilesInRackLocator extends FlexLocator {
  parentItemType = MaterialType.TilesRack
  gap = { x: tileDescription.width }
  lineSize = 5
  lineGap = { y: 2.35, z: 2 }

  getParentItem(location: Location) {
    return { type: MaterialType.TilesRack, location: { type: LocationType.TilesRack, player: location.player } }
  }

  positionOnParent = { x: 22, y: 0 }

  getDropLocations() {
    return [{ type: LocationType.PlayerTilesInRack }]
  }

  locationDescription = new PlayerTilesInRackDescription(tilesRackDescription)

  navigationSorts = []
}

export class PlayerTilesInRackDescription extends DropAreaDescription {
  width = tilesRackDescription.width
  height = tilesRackDescription.height * 1.8
  borderRadius = 0.4

  help = ActionsHelp
}

export const playerTilesInRackLocator = new PlayerTilesInRackLocator()
