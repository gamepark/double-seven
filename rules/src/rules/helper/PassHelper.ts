import { isCustomMoveType, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CustomMoveType } from '../CustomMove'
import { MemoryType } from '../Memory'
import { RuleId } from '../RuleId'

export class PassHelper extends MaterialRulesPart {
  player?: number
  nextPlayer: number

  constructor(game: MaterialGame, nextPlayer: number, player = game.rule?.player) {
    super(game)
    this.player = player
    this.nextPlayer = nextPlayer
  }

  checkIfPassAndMoveToNextAction(move: MaterialMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move) || isCustomMoveType(CustomMoveType.Empty)(move)) {
      const playerWhoEndedGame: number | undefined = this.remind(MemoryType.PlayerWhoEndedGame)
      if (playerWhoEndedGame === this.nextPlayer) {
        return [this.endGame()]
      }
      if (this.playerTilesRack.length >= 6) {
        return [this.startRule(RuleId.DiscardTile)]
      }
      return [this.startPlayerTurn(this.getNextRule(), this.nextPlayer)]
    }
    return []
  }

  getNextRule() {
    if (this.visibleTilesInPile.length > 0) {
      const nextPlayerTilesInRack = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.nextPlayer)
      return nextPlayerTilesInRack.length > 0 ? RuleId.ChooseTwoTiles : RuleId.ChooseThreeTiles
    }
    return RuleId.FlipTile
  }

  get visibleTilesInPile() {
    return this.material(MaterialType.Tile).location(LocationType.TilesPile).rotation(false)
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }
}
