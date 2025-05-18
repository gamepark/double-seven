import { isMoveItemType, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Tile } from '../../material/Tile'

export class StartFamilyHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  addMovesForStartFamily(tile: Tile): MaterialMove[] {
    if (tile === Tile.JokerTile) return []

    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.id === tile)
    if (tilesInGameForThisFamily.length > 0) return []

    const moves: MaterialMove[] = []
    const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
    const jockerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
    if (playerTilesForThisColor.length >= 2 || (playerTilesForThisColor.length === 1 && jockerTiles.length > 0)) {
      moves.push(...playerTilesForThisColor.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player })))
    }
    return moves
  }

  addSecondTileForStartFamily(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsStartFamilyMove(move)) {
      const posedTileY = this.playerTilesInGame.index(move.itemIndex).getItem()?.location.y
      const tile = this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.id as Tile
      const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
      const jockerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
      const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.y === posedTileY)
      if (tilesInGameForThisFamily.length === 0) {
        return []
      }
      const x = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.x ?? 0
      const y = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.y ?? 0
      if (playerTilesForThisColor.length > 0) {
        return [playerTilesForThisColor.moveItem(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y }))]
      } else if (jockerTiles.length > 0) {
        return [jockerTiles.moveItem(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y }))]
      }
    }
    return []
  }

  private checkIfMoveIsStartFamilyMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player === this.player &&
      move.location.x === undefined
    )
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }
}
