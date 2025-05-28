import { MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'lodash'
import { DoubleSevenOptions } from './DoubleSevenOptions'
import { DoubleSevenRules } from './DoubleSevenRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { getTiles } from './material/Tile'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class DoubleSevenSetup extends MaterialGameSetup<number, MaterialType, LocationType, DoubleSevenOptions> {
  Rules = DoubleSevenRules

  setupMaterial(_options: DoubleSevenOptions) {
    this.material(MaterialType.DoubleSevenToken).createItem({ location: { type: LocationType.DoubleSevenTokenIdleSpace, rotation: true } })
    this.setupTilesPile()
    this.players.forEach((player) => {
      this.setupPlayer(player)
    })
    this.setupFlipFirstTile()
  }

  setupTilesPile() {
    const tiles = shuffle(getTiles())
    tiles.forEach((tile) => {
      this.material(MaterialType.Tile).createItem({
        location: { type: LocationType.TilesPile, rotation: true },
        id: tile
      })
    })
  }

  setupFlipFirstTile() {
    this.material(MaterialType.Tile)
      .location(LocationType.TilesPile)
      .moveItem(({ location }) => ({ ...location, rotation: false }))
  }

  setupPlayer(player: number) {
    this.material(MaterialType.Tile)
      .location(LocationType.TilesPile)
      .limit(3)
      .moveItems(() => ({ type: LocationType.PlayerTilesInRack, player, rotation: true }))
  }

  start() {
    this.startPlayerTurn(RuleId.ChooseTwoTiles, this.players[0])
  }
}
