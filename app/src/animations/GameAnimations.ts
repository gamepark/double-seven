import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .move((move, context) => {
    if (!isMoveItemType(MaterialType.Tile)(move)) return false
    const nbTilesInFamily = context.rules
      .material(MaterialType.Tile)
      .location((loc) => loc.type === LocationType.PlayerTilesInGame && loc.player === context.rules.game.rule?.player && loc.y === move.location.y)
    return nbTilesInFamily.length === 1
  })
  .none()
