/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

class TilesPileLocator extends PileLocator {
  radius = 20
  coordinates = { x: 3, y: 0 }
  limit = 91

  getItemCoordinates(item: MaterialItem, context: ItemContext) {
    const coordinates = super.getItemCoordinates(item, context)
    if (!item.location.rotation) {
      coordinates.z = 10
    }
    return coordinates
  }
}

export const tilesPileLocator = new TilesPileLocator()
