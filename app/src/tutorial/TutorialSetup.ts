import { DoubleSevenSetup } from '@gamepark/double-seven/DoubleSevenSetup'
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { getTiles, Tile } from '@gamepark/double-seven/material/Tile'
import { shuffle } from 'lodash'

export const me = 1
export const opponent = 2
export class TutorialSetup extends DoubleSevenSetup {
  setupTilesPile() {
    const tiles = shuffle(getTiles())
    tiles.forEach((tile) => {
      const z = tile === Tile.JokerTile ? 10 : undefined
      this.material(MaterialType.Tile).createItem({
        location: { type: LocationType.TilesPile, id: tile, z, rotation: true },
        id: tile
      })
    })
  }

  setupPlayer(player: number) {
    if (player === 2) {
      this.moveSpecificTile(Tile.MaroonTile, player)
      this.moveSpecificTile(Tile.RedTile, player)
      this.moveSpecificTile(Tile.RedTile, player)
    } else {
      this.moveSpecificTile(Tile.MaroonTile, player)
      this.moveSpecificTile(Tile.RedTile, player)
      this.moveSpecificTile(Tile.PurpleTile, player)
    }
  }

  setupFlipFirstTile() {
    this.material(MaterialType.Tile)
      .location(LocationType.TilesPile)
      .filter((it) => it.id === Tile.BlueTile)
      .moveItem(({ location }) => ({ ...location, rotation: false }))
  }

  moveSpecificTile(tile: Tile, player: number) {
    this.material(MaterialType.Tile)
      .location(LocationType.TilesPile)
      .filter((it) => it.id === tile)
      .moveItem(() => ({ type: LocationType.PlayerTilesInRack, player, rotation: true }))
  }
}
