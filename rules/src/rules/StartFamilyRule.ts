import { isMoveItemType, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile } from '../material/Tile'
import { StartFamilyHelper } from './helper/StartFamilyHelper'
import { RuleId } from './RuleId'

export class StartFamilyRule extends PlayerTurnRule {
  getPlayerMoves() {
    const helper = new StartFamilyHelper(this.game)
    const playerTiles = helper.playerTilesInGame
    const lonelyTile = playerTiles.location((l) => playerTiles.location((l2) => l2.id === l.id).length === 1).getItem()!
    const rack = helper.playerTilesRack
    const tiles = rack.id((id) => id === lonelyTile.id || id === Tile.JokerTile)
    return tiles.moveItems({ type: LocationType.PlayerTilesInGame, player: this.player, id: lonelyTile.location.id })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Tile)(move)) {
      return [this.startRule(RuleId.DoActions)]
    }
    return []
  }
}
