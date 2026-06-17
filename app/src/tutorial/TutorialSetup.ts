import { DoubleSevenSetup } from '@gamepark/double-seven/DoubleSevenSetup'
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { getTiles, Tile } from '@gamepark/double-seven/material/Tile'

export const me = 1
export const opponent = 2

export class TutorialSetup extends DoubleSevenSetup {
  setupTilesPile() {
    const items = getTiles().map((id) => ({ id, location: { type: LocationType.TilesPile, rotation: true } }))
    this.material(MaterialType.Tile).createItems(items)
    // Isolate tiles required for the tutorial
    this.material(MaterialType.Tile).id(Tile.RedTile).limit(3).moveItems({ type: LocationType.TilesDiscard })
    this.material(MaterialType.Tile).id(Tile.MaroonTile).limit(2).moveItems({ type: LocationType.TilesDiscard })
    this.material(MaterialType.Tile).id(Tile.PinkTile).limit(1).moveItems({ type: LocationType.TilesDiscard })
    this.material(MaterialType.Tile).id(Tile.PurpleTile).limit(1).moveItems({ type: LocationType.TilesDiscard })
    this.material(MaterialType.Tile).id(Tile.BlueTile).limit(1).moveItems({ type: LocationType.TilesDiscard })
    this.material(MaterialType.Tile).id(Tile.GreyTile).limit(3).moveItems({ type: LocationType.TilesDiscard })
    // Isolate *every* joker: the opponent draws from the bottom of the shuffled pile (min x), and a joker
    // in its rack makes "start a family" branch into the StartFamily rule (choose red or joker). That extra
    // choice is not in the tutorial script, so the opponent would deadlock ("did not return any move to play").
    // The draw order below puts a single joker back on top for the player's own scripted draw.
    this.material(MaterialType.Tile).id(Tile.JokerTile).moveItems({ type: LocationType.TilesDiscard })
    // Shuffle the other tiles
    this.material(MaterialType.Tile).location(LocationType.TilesPile).shuffle()
    // Put back the tiles we want to draw on top
    const drawOrder = [Tile.BlueTile, Tile.GreyTile, Tile.GreyTile, Tile.GreyTile, Tile.MaroonTile, Tile.JokerTile]
    for (const tile of drawOrder.reverse()) {
      this.material(MaterialType.Tile).location(LocationType.TilesDiscard).id(tile).moveItem({ type: LocationType.TilesPile, rotation: true })
    }
  }

  setupPlayer(player: number) {
    const reservedTiles = this.material(MaterialType.Tile).location(LocationType.TilesDiscard)
    const location = { type: LocationType.PlayerTilesInRack, player, rotation: true }
    if (player === me) {
      reservedTiles.id(Tile.MaroonTile).moveItem(location)
      reservedTiles.id(Tile.RedTile).moveItem(location)
      reservedTiles.id(Tile.PurpleTile).moveItem(location)
    } else {
      reservedTiles.id(Tile.PinkTile).moveItem(location)
      reservedTiles.id(Tile.RedTile).limit(2).moveItems(location)
    }
  }
}
