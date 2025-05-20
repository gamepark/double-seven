import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'

export class TwoForOneActionRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.PlayerAlreadyGetTwoForOneAction, true)
    this.memorize(MemoryType.PlayerTilesQuantity, this.playerTiles.length)
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    if (this.playerTiles.length > this.remind(MemoryType.PlayerTilesQuantity) - 2) {
      return this.playerTiles.moveItems(() => ({ type: LocationType.TilesPile, rotation: false }))
    } else {
      return this.tilesInPile.moveItems(() => ({ type: LocationType.PlayerTilesInRack, player: this.player, rotation: true }))
    }
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack) {
      return [this.startRule(RuleId.DoActions)]
    }
    return []
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.PlayerTilesQuantity)
    return []
  }

  get tilesInPile() {
    return this.material(MaterialType.Tile).location(LocationType.TilesPile)
  }

  get playerTiles() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }
}
