import { isMoveItemTypeAtOnce, Location, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
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
    const playerTiles = this.playerTilesInGame.location((loc) => loc.id === locationId).sort((item) => item.location.x!)
    if (playerTiles.length === 0) {
      return []
    }
    return this.possibleExchanges(playerTiles.length).flatMap((location) => playerTiles.moveItemsAtOnce(location))
  }

  switchTilesForExchange(move: MaterialMove): MaterialMove[] {
    if (isMoveItemTypeAtOnce(MaterialType.Tile)(move) && move.location.player !== this.player) {
      const tilesInThisLocation = this.material(MaterialType.Tile)
        .location(LocationType.PlayerTilesInGame)
        .locationId(move.location.id)
        .player(move.location.player)
        .sort((item) => item.location.x!)
      const originId = this.playerTilesInGame.index(move.indexes[0]).getItem()?.location.id
      return [tilesInThisLocation.moveItemsAtOnce({ type: LocationType.PlayerTilesInGame, player: this.player, id: originId })]
    }
    return []
  }

  private possibleExchanges(familyLength: number): Partial<Location>[] {
    const locations: Partial<Location>[] = []
    this.game.players.forEach((player) => {
      if (player !== this.player) {
        const playerTiles = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(player)
        const families = getFamilies(playerTiles)
        families.forEach((family) => {
          if (family.length === familyLength) {
            locations.push({ type: LocationType.PlayerTilesInGame, player, id: family[0].location.id })
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
