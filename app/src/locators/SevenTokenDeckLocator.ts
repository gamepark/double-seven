/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

class SevenTokenDeckLocator extends DeckLocator {
  coordinates = { x: 0, y: -27 }
  rotateZ = 90
}

export const sevenTokenDeckLocator = new SevenTokenDeckLocator()
