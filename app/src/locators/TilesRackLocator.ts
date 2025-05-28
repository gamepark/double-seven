import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class TilesRackLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext) {
    return { x: this.getPlayerX(location.player!, context), y: 18 }
  }

  getPlayerX(player: number, context: MaterialContext) {
    const players = context.rules.players.length
    const playersX = players === 2 ? [-35, 40] : players === 3 ? [-25, 28, 53] : [-50, -25, 28, 53]
    return playersX[getRelativePlayerIndex(context, player)]
  }

  navigationSorts = []
}

export const tilesRackLocator = new TilesRackLocator()
