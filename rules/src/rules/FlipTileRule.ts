import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class FlipTileRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    const maxTileInPile = this.material(MaterialType.Tile)
      .location(LocationType.TilesPile)
      .maxBy((item) => item.location.x!)
    if (maxTileInPile.length === 0) {
      return [this.startRule(this.getNextRule())]
    }
    return [maxTileInPile.moveItem(({ location }) => ({ ...location, rotation: false }))]
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.TilesPile) {
      return [this.startRule(this.getNextRule())]
    }
    return []
  }

  getNextRule() {
    const playerTilesInRack = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
    return playerTilesInRack.length > 0 ? RuleId.ChooseTwoTiles : RuleId.ChooseThreeTiles
  }
}
