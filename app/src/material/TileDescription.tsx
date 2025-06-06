/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { Tile } from '@gamepark/double-seven/material/Tile'
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { isMoveItemType, ItemMoveType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Back from '../images/Tiles/Back.jpg'
import BlueTile from '../images/Tiles/BlueTile.jpg'
import GreenTile from '../images/Tiles/GreenTile.jpg'
import GreyTile from '../images/Tiles/GreyTile.jpg'
import JockerTile from '../images/Tiles/JockerTile.jpg'
import MaroonTile from '../images/Tiles/MaroonTile.jpg'
import OrangeTile from '../images/Tiles/OrangeTile.jpg'
import PinkTile from '../images/Tiles/PinkTile.jpg'
import PurpleTile from '../images/Tiles/PurpleTile.jpg'
import RedTile from '../images/Tiles/RedTile.jpg'
import TilesSound from '../sounds/tiles.wav'
import { TileHelp } from './help/TileHelp'

export class TileDescription extends CardDescription {
  height = 3.9
  width = 2.7
  borderRadius = 0.25

  backImage = Back

  images = images

  sounds = {
    [ItemMoveType.MoveAtOnce]: { sound: TilesSound, volume: 0.4, delay: 0.7 },
    [ItemMoveType.Move]: { sound: TilesSound, volume: 0.4, delay: 0.7 }
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return (
      this.isGetTileMove(move, context) ||
      this.isDiscardTileMove(move, context) ||
      this.isTwoForOneMove(move, context) ||
      this.isStartOrExpandFamily(move, context)
    )
  }

  isGetTileMove(move: MaterialMove, context: ItemContext) {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInRack &&
      move.location.player === context.player &&
      move.itemIndex === context.index
    )
  }

  isDiscardTileMove(move: MaterialMove, context: ItemContext) {
    return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.TilesDiscard && move.itemIndex === context.index
  }

  isTwoForOneMove(move: MaterialMove, context: ItemContext) {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.TilesPile &&
      move.itemIndex === context.index &&
      context.rules.game.rule?.id === RuleId.TwoForOneAction
    )
  }

  isStartOrExpandFamily(move: MaterialMove, context: ItemContext) {
    if (!isMoveItemType(MaterialType.Tile)(move)) return false

    const noTileAtLocation =
      context.rules
        .material(MaterialType.Tile)
        .location((loc) => loc.type === move.location.type && loc.id === move.location.id && loc.x === move.location.x)
        .player(move.location.player).length === 0

    return (
      noTileAtLocation && move.location.type === LocationType.PlayerTilesInGame && move.location.player === context.player && move.itemIndex === context.index
    )
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext) {
    return (item.location?.type === LocationType.TilesPile && item.location.rotation == true) || super.isFlippedOnTable(item, context)
  }

  help = TileHelp
}

const images = {
  [Tile.OrangeTile]: OrangeTile,
  [Tile.PinkTile]: PinkTile,
  [Tile.GreenTile]: GreenTile,
  [Tile.PurpleTile]: PurpleTile,
  [Tile.GreyTile]: GreyTile,
  [Tile.RedTile]: RedTile,
  [Tile.BlueTile]: BlueTile,
  [Tile.MaroonTile]: MaroonTile,
  [Tile.JokerTile]: JockerTile
}

export const tileDescription = new TileDescription()
