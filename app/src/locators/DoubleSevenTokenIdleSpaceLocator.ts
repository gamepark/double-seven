/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

class DoubleSevenTokenIdleSpaceLocator extends DeckLocator {
  coordinates = { x: -4, y: 30 }

  navigationSorts = []
}

export const doubleSevenTokenIdleSpaceLocator = new DoubleSevenTokenIdleSpaceLocator()
