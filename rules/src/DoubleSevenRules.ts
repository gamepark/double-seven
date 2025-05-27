import { CompetitiveScore, MaterialGame, MaterialItem, MaterialMove, PositiveSequenceStrategy, SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
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
import { TwoForOneActionGetTileRule } from './rules/TwoForOneActionGetTileRule'
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
    [RuleId.FlipTile]: FlipTileRule,
    [RuleId.ChooseTwoTiles]: ChooseTwoTilesRule,
    [RuleId.ChooseThreeTiles]: ChooseThreeTilesRule,
    [RuleId.DeclareRainbow]: DeclareRainbowRule,
    [RuleId.ChooseTileAfterRainbow]: ChooseTileAfterRainbowRule,
    [RuleId.DoActions]: DoActionsRule,
    [RuleId.TwoForOneAction]: TwoForOneActionRule,
    [RuleId.TwoForOneActionGetTile]: TwoForOneActionGetTileRule,
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
      [LocationType.PlayerTilesInGame]: new PositiveSequenceStrategy()
    },
    [MaterialType.SevenToken]: {
      [LocationType.PlayerSevenTokenSpace]: new PositiveSequenceStrategy()
    }
  }

  protected afterItemMove(): MaterialMove[] {
    const activePlayer = this.getActivePlayer()
    if (activePlayer) {
      this.memorize(MemoryType.PlayerScore, this.scoreHelper.getScore(activePlayer), activePlayer)
    }
    return []
  }

  getScore(playerId: number): number {
    return this.remind(MemoryType.PlayerScore, playerId)
  }

  getTieBreaker(tieBreaker: number, playerId: number): number | undefined {
    if (tieBreaker === 1) {
      const doubleSevenToken = this.material(MaterialType.DoubleSevenToken).location(LocationType.PlayerDoubleSevenTokenSpace).player(playerId)
      return doubleSevenToken.length
    }
    return undefined
  }
}

const hideIdIfRotated = (item: MaterialItem) => (!item.location.rotation ? [] : ['id'])
const hideItemIdToOthersIfRotated = (item: MaterialItem, player?: number) => {
  return !item.location.rotation ? [] : player === item.location.player ? [] : ['id']
}
