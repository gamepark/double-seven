import { CustomMove, isCustomMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { uniqBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { CustomMoveType } from './CustomMove'
import { RuleId } from './RuleId'

export class DeclareRainbowRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const tilesWithoutJocker = this.playerTiles.getItems().filter((it) => it.id !== Tile.JokerTile)
    const nbTilesGroupedByColor = uniqBy(tilesWithoutJocker, 'id').length
    if (nbTilesGroupedByColor >= 5 && nbTilesGroupedByColor === tilesWithoutJocker.length) {
      moves.push(this.customMove(CustomMoveType.DeclareRainbow))
    }
    moves.push(this.customMove(CustomMoveType.Pass))
    return moves
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
