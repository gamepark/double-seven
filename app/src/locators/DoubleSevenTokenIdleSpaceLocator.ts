/** @jsxImportSource @emotion/react */
import { DeckLocator } from '@gamepark/react-game'

class DoubleSevenTokenIdleSpaceLocator extends DeckLocator {
  coordinates = { x: -8, y: -25 }

  navigationSorts = []
}

export const doubleSevenTokenIdleSpaceLocator = new DoubleSevenTokenIdleSpaceLocator()
