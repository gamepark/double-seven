import { getEnumValues } from '@gamepark/rules-api'

export enum Tile {
  OrangeTile = 1,
  PinkTile,
  GreenTile,
  PurpleTile,
  GreyTile,
  RedTile,
  BlueTile,
  MaroonTile,
  JokerTile
}

export const tiles = getEnumValues(Tile)

export const getTiles = () => {
  const tiles: Tile[] = []
  getEnumValues(Tile).forEach((tile) => {
    const nbTiles = tile === Tile.JokerTile ? 3 : 11
    for (let i = 0; i < nbTiles; i++) {
      tiles.push(tile)
    }
  })
  return tiles
}
