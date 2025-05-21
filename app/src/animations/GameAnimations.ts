import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, MaterialMove } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

const checkIfIsRotateTilesInRack = (move: MaterialMove) => {
  if (!isMoveItemTypeAtOnce(MaterialType.Tile)(move)) return false
  return move.location.type === undefined
}

gameAnimations
  .when()
  .move((move, context) => {
    if (!isMoveItemType(MaterialType.Tile)(move)) return false
    const nbTilesInFamily = context.rules
      .material(MaterialType.Tile)
      .location((loc) => loc.type === LocationType.PlayerTilesInGame && loc.player === context.rules.game.rule?.player && loc.id === move.location.id)
    return nbTilesInFamily.length === 1
  })
  .none()

gameAnimations.when().rule(RuleId.ChooseTileAfterRainbow).move(checkIfIsRotateTilesInRack).sound(false)

gameAnimations.when().rule(RuleId.DeclareRainbow).move(checkIfIsRotateTilesInRack).sound(false)
