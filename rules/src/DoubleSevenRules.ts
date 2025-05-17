import {
  CompetitiveScore,
  isMoveItemType,
  MaterialGame,
  MaterialItem,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { DOUBLE_SEVEN_TOCKEN_POINTS, SEVEN_TOKEN_POINTS, TILES_IN_GAME_POINTS } from './Constantes'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerTilesInGameLocationStrategy } from './material/strategies/PlayerTilesInGameLocationStrategy'
import { ChooseFirstTilesRule } from './rules/ChooseFirstTilesRule'
import { ChooseThreeTilesRule } from './rules/ChooseThreeTilesRule'
import { ChooseTileAfterRainbowRule } from './rules/ChooseTileAfterRainbowRule'
import { ChooseTwoTilesRule } from './rules/ChooseTwoTilesRule'
import { DeclareRainbowRule } from './rules/DeclareRainbowRule'
import { DiscardTileRule } from './rules/DiscardTileRule'
import { DoActionsRule } from './rules/DoActionsRule'
import { FlipTileRule } from './rules/FlipTileRule'
import { ScoreHelper } from './rules/helper/ScoreHelper'
import { MemoryType } from './rules/Memory'
import { RuleId } from './rules/RuleId'
import { TwoForOneActionRule } from './rules/TwoForOneActionRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class DoubleSevenRules
  extends SecretMaterialRules<number, MaterialType, LocationType>
  implements TimeLimit<MaterialGame, MaterialMove>, CompetitiveScore
{
  scoreHelper = new ScoreHelper(this.game)
  rules = {
    [RuleId.ChooseFirstTiles]: ChooseFirstTilesRule,
    [RuleId.FlipTile]: FlipTileRule,
    [RuleId.ChooseTwoTiles]: ChooseTwoTilesRule,
    [RuleId.ChooseThreeTiles]: ChooseThreeTilesRule,
    [RuleId.DeclareRainbow]: DeclareRainbowRule,
    [RuleId.ChooseTileAfterRainbow]: ChooseTileAfterRainbowRule,
    [RuleId.DoActions]: DoActionsRule,
    [RuleId.TwoForOneAction]: TwoForOneActionRule,
    [RuleId.DiscardTile]: DiscardTileRule
  }

  giveTime(): number {
    return 60
  }

  hidingStrategies = {
    [MaterialType.Tile]: {
      [LocationType.TilesPile]: hideIdIfRotated,
      [LocationType.PlayerTilesInRack]: hideItemIdToOthersIfRotated
    }
  }

  locationsStrategies = {
    [MaterialType.Tile]: {
      [LocationType.TilesPile]: new PositiveSequenceStrategy(),
      [LocationType.TilesDiscard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerTilesInRack]: new PositiveSequenceStrategy(),
      [LocationType.PlayerTilesInGame]: new PlayerTilesInGameLocationStrategy()
    },
    [MaterialType.SevenToken]: {
      [LocationType.PlayerSevenTokenSpace]: new PositiveSequenceStrategy('y')
    }
  }

  protected beforeItemMove(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.SevenToken)(move) && move.location.type === LocationType.PlayerSevenTokenSpace) {
      this.addScoreToActivePlayer(SEVEN_TOKEN_POINTS)
    }
    if (isMoveItemType(MaterialType.DoubleSevenToken)(move) && move.location.type === LocationType.PlayerDoubleSevenTokenSpace) {
      this.addScoreToActivePlayer(DOUBLE_SEVEN_TOCKEN_POINTS)
    }
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInGame) {
      const itemOldPosition = this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type
      if (itemOldPosition === LocationType.PlayerTilesInRack) {
        this.addScoreToActivePlayer(TILES_IN_GAME_POINTS)
      }
    }
    return []
  }

  addScoreToActivePlayer(toAdd: number) {
    const activePlayer = this.getActivePlayer()
    if (activePlayer) {
      this.memorize(MemoryType.PlayerScore, this.scoreHelper.getScore(activePlayer) + toAdd, activePlayer)
    }
  }

  getScore(playerId: number): number {
    return this.remind(MemoryType.PlayerScore, playerId)
  }
}

const hideIdIfRotated = (item: MaterialItem) => (!item.location.rotation ? [] : ['id'])
const hideItemIdToOthersIfRotated = (item: MaterialItem, player?: number) => {
  return !item.location.rotation ? [] : player === item.location.player ? [] : ['id']
}
