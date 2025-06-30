import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { ChooseTwoTilesRule } from './ChooseTwoTilesRule'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'

export class TwoForOneActionGetTileRule extends ChooseTwoTilesRule {
  nbTileToGet = 1
  nextRule = RuleId.DoActions

  beforeItemMove(move: ItemMove<number, number, number>): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack) {
      this.forget(MemoryType.TilesUsedForTwoForOne)
    }
    return []
  }

  get tilesInPile() {
    const tilesCantTake = this.remind<Tile[] | undefined>(MemoryType.TilesUsedForTwoForOne) ?? []
    return this.material(MaterialType.Tile).location(LocationType.TilesPile).filter(it => !tilesCantTake.includes(it.id as Tile))
  }
}
