import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'

export class TwoForOneActionRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    this.memorize(MemoryType.PlayerAlreadyGetTwoForOneAction, true)
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return this.playerTiles.moveItems(() => ({ type: LocationType.TilesPile, rotation: false }))
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.TilesPile) {
      this.memorize<Tile[]>(MemoryType.TilesUsedForTwoForOne, old => [...old, this.material(MaterialType.Tile).index(move.itemIndex).getItem()!.id])
      return [this.startRule(RuleId.TwoForOneActionGetTile)]
    }
    return []
  }

  get playerTiles() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }
}
