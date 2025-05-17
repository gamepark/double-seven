import { isCustomMove, isMoveItemType, MaterialGame, MaterialMove, RandomBot } from '@gamepark/rules-api'
import { DoubleSevenRules } from '../DoubleSevenRules'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from '../rules/RuleId'

export class DoubleSevenBot extends RandomBot<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number> {
  constructor(playerId: number) {
    super(DoubleSevenRules, playerId)
  }

  override getLegalMoves(game: MaterialGame<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType>[] {
    const rules = new DoubleSevenRules(game)
    const player = game.rule?.player
    const legalMoves = super.getLegalMoves(game)
    if (rules.game.rule?.id !== RuleId.DoActions) return legalMoves

    //const playerTilesInRack = rules.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(player)

    return legalMoves.filter((move: MaterialMove) => {
      return (
        (isMoveItemType(MaterialType.Tile)(move) && (move.location.player === player || move.location.player === undefined)) || isCustomMove(move)
      )
    })
  }
}
