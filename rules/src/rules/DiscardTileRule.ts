import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class DiscardTileRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    return [...this.playerTilesRack.moveItems(() => ({ type: LocationType.TilesDiscard, rotation: false }))]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.TilesDiscard) {
      return [this.startPlayerTurn(this.getNextRule(), this.nextPlayer)]
    }
    return []
  }

  getNextRule() {
    if (this.visibleTilesInPile.length > 0) {
      const nextPlayerTilesInRack = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.nextPlayer)
      return nextPlayerTilesInRack.length > 0 ? RuleId.ChooseTwoTiles : RuleId.ChooseThreeTiles
    }
    return RuleId.FlipTile
  }

  get visibleTilesInPile() {
    return this.material(MaterialType.Tile).location(LocationType.TilesPile).rotation(false)
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }
}
