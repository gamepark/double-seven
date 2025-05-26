/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

class TilesDiscardLocator extends DeckLocator {
  coordinates = { x: 10, y: 30 }
}

export const tilesDiscardLocator = new TilesDiscardLocator()
