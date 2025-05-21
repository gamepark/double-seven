import { isMoveItemType, Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getFamilies } from '../../material/Tile'

export class ExchangeFamilyHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  addMovesForExchangeFamily(locationId: number): MaterialMove[] {
    const playerTiles = this.playerTilesInGame.location((loc) => loc.id === locationId)
    const moves: MaterialMove[] = []
    if (playerTiles.length === 0) {
      return moves
    }
    this.possibleEchanges(playerTiles.length).forEach((loc) => {
      moves.push(playerTiles.minBy((item) => item.location.x!).moveItem(loc))
    })
    return moves
  }

  switchTilesForExchange(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsAExchangeMove(move)) {
      const tilesInThisLocation = this.material(MaterialType.Tile).location(
        (loc) => loc.type === LocationType.PlayerTilesInGame && loc.id === move.location.id && loc.player === move.location.player
      )
      const movedTileId = this.playerTilesInGame.index(move.itemIndex).getItem()?.location.id
      const otherPlayerTilesToMove = this.playerTilesInGame.filter((it) => it.location.id === movedTileId)
      return [
        tilesInThisLocation.moveItemsAtOnce({ id: movedTileId, player: this.player }),
        otherPlayerTilesToMove.index((index) => index !== move.itemIndex).moveItemsAtOnce({ id: move.location.id, player: move.location.player })
      ]
    }
    return []
  }

  private checkIfMoveIsAExchangeMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player !== this.player &&
      move.location.x !== undefined &&
      this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type === LocationType.PlayerTilesInGame
    )
  }

  private possibleEchanges(familyLength: number): Location[] {
    const locations: Location[] = []
    this.game.players.forEach((player) => {
      if (player !== this.player) {
        const playerTiles = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(player)
        const families = getFamilies(playerTiles)
        families.forEach((family) => {
          if (family.length === familyLength) {
            locations.push({ ...family[0].location, x: 0 })
          }
        })
      }
    })
    return locations
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }
}
