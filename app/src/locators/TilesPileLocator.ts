/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'

class TilesPileLocator extends PileLocator {
  radius = 20
  coordinates = { x: 3, y: 0 }
  limit = 91
}

export const tilesPileLocator = new TilesPileLocator()
