import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { CustomMoveType } from '@gamepark/double-seven/rules/CustomMove'
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { and, isMyMove, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemsAtOnce, isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .configure((move, context) => {
    if (!isMoveItemType(MaterialType.Tile)(move)) return false
    const nbTilesInFamily = context.rules
      .material(MaterialType.Tile)
      .location((loc) => loc.type === LocationType.PlayerTilesInGame && loc.player === context.rules.game.rule?.player && loc.id === move.location.id)
    return nbTilesInFamily.length === 1
  })
  .skip()

gameAnimations.configure(and(isRule(RuleId.DeclareRainbow), isMoveItemsAtOnce, isMyMove())).skip()
gameAnimations.configure(and(isRule(RuleId.ChooseTileAfterRainbow), isMoveItemsAtOnce, isMyMove())).skip()

gameAnimations.configure(and(isRule(RuleId.ChooseTileAfterRainbow), isMoveItemsAtOnce)).sound(false)
gameAnimations.configure(and(isRule(RuleId.DeclareRainbow), isMoveItemsAtOnce)).sound(false)

gameAnimations.configure(and(isRule(RuleId.DoActions), isCustomMoveType(CustomMoveType.Pass))).duration(1000)
gameAnimations.configure(and(isRule(RuleId.DoActions), isCustomMoveType(CustomMoveType.Empty))).duration(1000)
gameAnimations.configure(and(isRule(RuleId.DeclareRainbow), isCustomMoveType(CustomMoveType.DeclareRainbow))).duration(1000)
