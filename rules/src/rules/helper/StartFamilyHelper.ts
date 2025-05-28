import { isMoveItemType, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { uniq } from 'lodash'
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
    const jokerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
    if (playerTilesForThisColor.length >= 2 || (playerTilesForThisColor.length === 1 && jokerTiles.length > 0)) {
      const id = uniq(this.playerTilesInGame.getItems().map((it) => it.location.id as number)).length
      moves.push(...playerTilesForThisColor.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, id })))
    }
    return moves
  }

  addSecondTileForStartFamily(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsStartFamilyMove(move)) {
      const tile = this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.id as Tile
      const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
      const jokerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
      if (playerTilesForThisColor.length > 0) {
        return [playerTilesForThisColor.moveItem(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, id: move.location.id }))]
      } else if (jokerTiles.length > 0) {
        return [jokerTiles.moveItem(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, id: move.location.id }))]
      }
    }
    return []
  }

  checkIfMoveIsStartFamilyMove(move: MaterialMove): boolean {
    if (!isMoveItemType(MaterialType.Tile)(move)) return false

    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.id === move.location.id)
    return move.location.type === LocationType.PlayerTilesInGame && move.location.player === this.player && tilesInGameForThisFamily.length === 1
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }
}
