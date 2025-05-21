import { isMoveItemType, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Tile } from '../../material/Tile'

export class ExpandFamilyHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  addMovesForExpandFamily(tile: Tile, familyId: number) {
    const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
    const jockerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
    const moves: MaterialMove[] = []
    if (playerTilesForThisColor.length > 0) {
      moves.push(...playerTilesForThisColor.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, id: familyId })))
    }
    if (jockerTiles.length > 0) {
      moves.push(...jockerTiles.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, id: familyId })))
    }
    return moves
  }

  checkIfMoveIsAExpandFamilyMove(move: MaterialMove): boolean {
    if (!isMoveItemType(MaterialType.Tile)(move)) return false

    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.id === move.location.id)
    return (
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player === this.player &&
      tilesInGameForThisFamily.length > 1 &&
      this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type === LocationType.PlayerTilesInRack
    )
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }
}
