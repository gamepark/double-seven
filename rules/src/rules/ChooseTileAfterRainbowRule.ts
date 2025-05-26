import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ChooseTwoTilesRule } from './ChooseTwoTilesRule'
import { RuleId } from './RuleId'

export class ChooseTileAfterRainbowRule extends ChooseTwoTilesRule {
  nbTileToGet = 1

  onRuleStart(): MaterialMove[] {
    if (this.tilesInPile.length === 0) {
      return this.endRule()
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack) {
      return this.endRule()
    }
    return []
  }

  endRule() {
    return [this.playerTiles.moveItemsAtOnce({ rotation: true }), this.startRule(RuleId.DoActions)]
  }
}
