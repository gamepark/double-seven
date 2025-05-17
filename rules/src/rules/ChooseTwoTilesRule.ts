import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'

export class ChooseTwoTilesRule extends PlayerTurnRule {
  nbTileToGet = 2
  nextRule = RuleId.DeclareRainbow

  onRuleStart(): MaterialMove[] {
    if (this.tilesInPile.length === 0) {
      return [this.startRule(RuleId.DoActions)]
    }
    this.memorize(MemoryType.PlayerTilesQuantity, this.playerTiles.length)
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return this.tilesInPile.moveItems(() => ({ type: LocationType.PlayerTilesInRack, player: this.player, rotation: true }))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack) {
      if (this.tilesInPile.length === 0) {
        this.memorize(MemoryType.PlayerWhoEndedGame, this.player)
        return [this.startRule(RuleId.DoActions)]
      }
      const nbPlayerTiles: number = this.remind(MemoryType.PlayerTilesQuantity)
      if (this.playerTiles.length === nbPlayerTiles + this.nbTileToGet) {
        return [this.startRule(this.nextRule)]
      }
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
