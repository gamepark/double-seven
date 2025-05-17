import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ChooseTwoTilesRule } from './ChooseTwoTilesRule'
import { RuleId } from './RuleId'

export class ChooseTileAfterRainbowRule extends ChooseTwoTilesRule {
  nbTileToGet = 1
  nextRule = RuleId.DoActions

  onRuleStart(): MaterialMove[] {
    const moves = super.onRuleStart()
    if (this.tilesInPile.length === 0) {
      moves.push(this.playerTiles.moveItemsAtOnce({ rotation: true }))
    }
    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack) {
      return [this.playerTiles.moveItemsAtOnce({ rotation: true })]
    }
    return []
  }
}
