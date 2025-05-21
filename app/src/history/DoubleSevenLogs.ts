import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { Tile } from '@gamepark/double-seven/material/Tile'
import { ExpandFamilyHelper } from '@gamepark/double-seven/rules/helper/ExpandFamilyHelper'
import { StartFamilyHelper } from '@gamepark/double-seven/rules/helper/StartFamilyHelper'
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isMoveItem, MaterialMove } from '@gamepark/rules-api'
import { DiscardTileHistory } from './components/DiscardTileHistory'
import { ExchangeFamilyHistory } from './components/ExchangeFamilyHistory'
import { ExpandFamilyHistory } from './components/ExpandFamilyHistory'
import { FlipTileHistory } from './components/FlipTileHistory'
import { GetDoubleSevenTokenHistory } from './components/GetDoubleSevenTokenHistory'
import { GetJockerHistory } from './components/GetJockerHistory'
import { GetSevenTokenHistory } from './components/GetSevenTokenHistory'
import { StartFamilyHistory } from './components/StartFamilyHistory'

export class DoubleSevenLogs implements LogDescription {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext): MovePlayedLogDescription | undefined {
    const ruleId: RuleId = context.game.rule.id
    const actionPlayer = context.action.playerId
    if (ruleId === RuleId.FlipTile && this.getMoveLocationType(move) === LocationType.TilesPile) {
      return {
        Component: FlipTileHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.TilesDiscard) {
      return {
        Component: DiscardTileHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerSevenTokenSpace) {
      return {
        Component: GetSevenTokenHistory,
        player: actionPlayer
      }
    }
    if (this.getMoveLocationType(move) === LocationType.PlayerDoubleSevenTokenSpace) {
      return {
        Component: GetDoubleSevenTokenHistory,
        player: actionPlayer
      }
    }
    if (isMoveItem(move) && this.getMoveLocationType(move) === LocationType.PlayerTilesInRack) {
      const movedTile = context.game.items[MaterialType.Tile][move.itemIndex]
      const isJocker = movedTile.id === Tile.JokerTile
      const isNotFromTilePile = movedTile.location.id !== LocationType.TilesPile
      if (isJocker && isNotFromTilePile) {
        return {
          Component: GetJockerHistory,
          player: actionPlayer
        }
      }
    }
    if (ruleId === RuleId.DoActions && this.getMoveLocationType(move) === LocationType.PlayerTilesInGame) {
      if (isMoveItem(move) && move.location.player === actionPlayer) {
        if (new StartFamilyHelper(context.game).checkIfMoveIsStartFamilyMove(move)) {
          return {
            Component: StartFamilyHistory,
            player: actionPlayer
          }
        } else if (new ExpandFamilyHelper(context.game).checkIfMoveIsAExpandFamilyMove(move)) {
          return {
            Component: ExpandFamilyHistory,
            player: actionPlayer
          }
        }
      }
      if (isMoveItem(move) && move.location.player !== actionPlayer && move.location.x !== undefined) {
        const oldLocation = context.game.items[MaterialType.Tile][move.itemIndex].location.type
        if (oldLocation === LocationType.PlayerTilesInGame) {
          return {
            Component: ExchangeFamilyHistory,
            player: actionPlayer
          }
        }
      }
    }
    return undefined
  }

  getMoveLocationType(move: MaterialMove) {
    return isMoveItem(move) ? move.location.type : undefined
  }
}
