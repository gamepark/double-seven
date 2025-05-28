import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { DropAreaDescription, FlexLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { tileDescription } from '../material/TileDescription'

class PlayerTilesInRackLocator extends FlexLocator {
  parentItemType = MaterialType.TilesRack
  gap = { x: tileDescription.width + 0.1 }
  lineSize = 5
  lineGap = { y: 2.35, z: 2 }

  getParentItem(location: Location) {
    return { type: MaterialType.TilesRack, location: { type: LocationType.TilesRack, player: location.player } }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x = 0, y } = super.getCoordinates(location, context)
    return location.x && location.x >= 5 ? { x: x - this.gap.x / 2, y } : { x, y }
  }

  positionOnParent = { x: 22, y: 0 }

  locationDescription = new DropAreaDescription({
    width: 20,
    height: 10,
    borderRadius: 0.5
  })

  navigationSorts = []
}

export const playerTilesInRackLocator = new PlayerTilesInRackLocator()
