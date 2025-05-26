/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

class SevenTokenDeckLocator extends DeckLocator {
  coordinates = { x: 4, y: 30 }

  navigationSorts = []
}

export const sevenTokenDeckLocator = new SevenTokenDeckLocator()
