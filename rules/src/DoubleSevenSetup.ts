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
    this.material(MaterialType.SevenToken).createItem({ location: { type: LocationType.SevenTokenDeck, rotation: true }, quantity: 8 })
    const tiles = getTiles()
    shuffle(tiles).forEach((tile) => {
      this.material(MaterialType.Tile).createItem({
        location: { type: LocationType.TilesPile, rotation: true },
        id: tile
      })
    })

    /*this.players.forEach((player) => {
      for (let i = 0; i < 2; i++) {
        this.material(MaterialType.SevenToken).createItem({ location: { type: LocationType.PlayerSevenTokenSpace, player } })
      }
      this.material(MaterialType.DoubleSevenToken).createItem({ location: { type: LocationType.PlayerDoubleSevenTokenSpace, player } })
      getEnumValues(Tile).forEach((tile) => {
        this.material(MaterialType.Tile).createItem({
          location: { type: LocationType.PlayerTilesInRack, player },
          id: tile
        })
      })
      for (let i = 0; i < 11; i++) {
        getEnumValues(Tile).forEach((tile) => {
          if (tile !== Tile.JokerTile) {
            this.material(MaterialType.Tile).createItem({
              location: { type: LocationType.PlayerTilesInGame, y: tile - 1, x: i, player },
              id: tile
            })
          }
        })
      }
    })*/
  }

  start() {
    this.startSimultaneousRule(RuleId.ChooseFirstTiles)
  }
}
