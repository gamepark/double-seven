import { isMoveItemType, Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getFamilies, Tile } from '../../material/Tile'

export class GetJokerHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  addMovesForGetJoker(tile: Tile): MaterialMove[] {
    if (tile === Tile.JokerTile) return []

    const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
    if (playerTilesForThisColor.length === 0) return []
    const moves: MaterialMove[] = []
    this.possibleJokerToGet(tile).forEach((loc) => {
      moves.push(...playerTilesForThisColor.moveItems(loc))
    })
    return moves
  }

  switchTilesForGetJocker(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsAGetJockerMove(move)) {
      const tileInThisLocation = this.material(MaterialType.Tile).location(
        (loc) => loc.type === LocationType.PlayerTilesInGame && loc.id === move.location.id && loc.x === move.location.x && loc.player === move.location.player
      )
      if (tileInThisLocation.length > 0) {
        return [tileInThisLocation.moveItem(() => ({ type: LocationType.PlayerTilesInRack, player: this.player, rotation: true }))]
      }
    }
    return []
  }

  private checkIfMoveIsAGetJockerMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.x !== undefined &&
      this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type === LocationType.PlayerTilesInRack
    )
  }

  private possibleJokerToGet(tile: Tile): Location[] {
    const locations: Location[] = []
    this.game.players.forEach((player) => {
      const playerTiles = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(player)
      const families = getFamilies(playerTiles)
      families.forEach((family) => {
        const familyColor = family.find((it) => it.id !== Tile.JokerTile)?.id
        const joker = family.find((it) => it.id === Tile.JokerTile)
        if (familyColor === tile && joker) {
          locations.push(joker.location)
        }
      })
    })
    return locations
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }
}
