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

  addMovesForExpandFamily(tile: Tile, familyY: number) {
    const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
    const jockerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.y === familyY)
    const moves: MaterialMove[] = []
    if (tilesInGameForThisFamily.length === 0) {
      return moves
    }
    const x = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.x ?? 0
    const y = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.y ?? 0
    if (playerTilesForThisColor.length > 0) {
      moves.push(...playerTilesForThisColor.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y })))
    }
    if (jockerTiles.length > 0) {
      moves.push(...jockerTiles.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y })))
    }
    return moves
  }

  checkIfMoveIsAExpandFamilyMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player === this.player &&
      move.location.x !== undefined &&
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
