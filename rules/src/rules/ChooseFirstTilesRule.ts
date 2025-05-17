import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class ChooseFirstTilesRule extends SimultaneousRule {
  getActivePlayerLegalMoves(player: number): MaterialMove[] {
    return this.tilesInPile.moveItems(() => ({ type: LocationType.PlayerTilesInRack, player, rotation: true }))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack) {
      const playerTiles = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(move.location.player)
      if (playerTiles.length === 3) {
        const player = move.location.player
        return [this.endPlayerTurn(player!)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove[] {
    return [this.startPlayerTurn(RuleId.FlipTile, this.game.players[0])]
  }

  get tilesInPile() {
    return this.material(MaterialType.Tile).location(LocationType.TilesPile)
  }
}
