/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class TilesPileLocator extends PileLocator {
  radius = { x: 13, y: 20}
  coordinates = { x: 3, y: 0 }
  limit = 91
  minimumDistance = 2

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = super.getItemCoordinates(item, context)
    if (!item.location.rotation) {
      coordinates.z = 10
    }
    return coordinates
  }

  navigationSorts = []
}

export const tilesPileLocator = new TilesPileLocator()
