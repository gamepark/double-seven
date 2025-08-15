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
    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.id === familyId)
    const moves: MaterialMove[] = []
    if (tilesInGameForThisFamily.length === 0) {
      return moves
    }
    const x = tilesInGameForThisFamily.length
    if (playerTilesForThisColor.length > 0) {
      moves.push(...playerTilesForThisColor.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x, id: familyId })))
    }
    if (jockerTiles.length > 0) {
      moves.push(...jockerTiles.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x, id: familyId })))
    }
    return moves
  }

  checkIfMoveIsAExpandFamilyMove(move: MaterialMove): boolean {
    if (!isMoveItemType(MaterialType.Tile)(move)) return false

    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.id === move.location.id)
    const tileIsFromRack = this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type === LocationType.PlayerTilesInRack
    const nothingTileInThisLocation =
      this.material(MaterialType.Tile)
        .location((loc) => loc.type === move.location.type && loc.id === move.location.id && loc.x === move.location.x)
        .player(move.location.player).length === 0
    return (
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player === this.player &&
      tilesInGameForThisFamily.length > 1 &&
      tileIsFromRack &&
      nothingTileInThisLocation
    )
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }
}
