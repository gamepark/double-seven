import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { uniqBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { CustomMoveType } from './CustomMove'
import { RuleId } from './RuleId'

export class DeclareRainbowRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (!this.canDeclareRainbow()) {
      return [this.startRule(RuleId.DoActions)]
    }
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.canDeclareRainbow()) {
      moves.push(this.customMove(CustomMoveType.DeclareRainbow))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
  }

  canDeclareRainbow(): boolean {
    const tiles = this.playerTiles.getItems()
    if (tiles.some((it) => it.id === Tile.JokerTile)) return false
    const nbTilesGroupedByColor = uniqBy(tiles, 'id').length
    return nbTilesGroupedByColor >= 5 && nbTilesGroupedByColor === tiles.length
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.DeclareRainbow)(move)) {
      return [this.playerTiles.moveItemsAtOnce({ rotation: false }), this.startRule(RuleId.ChooseTileAfterRainbow)]
    }
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startRule(RuleId.DoActions)]
    }
    return []
  }

  get playerTiles() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }
}
