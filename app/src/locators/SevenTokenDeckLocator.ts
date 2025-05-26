/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

class SevenTokenDeckLocator extends DeckLocator {
  coordinates = { x: 0, y: -26 }
}

export const sevenTokenDeckLocator = new SevenTokenDeckLocator()
