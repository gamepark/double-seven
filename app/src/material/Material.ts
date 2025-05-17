import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { doubleSevenTokenDescription } from './DoubleSevenTokenDescription'
import { sevenTokenDescription } from './SevenTokenDescription'
import { tileDescription } from './TileDescription'
import { tilesRackDescription } from './TilesRackDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.Tile]: tileDescription,
  [MaterialType.SevenToken]: sevenTokenDescription,
  [MaterialType.DoubleSevenToken]: doubleSevenTokenDescription,
  [MaterialType.TilesRack]: tilesRackDescription
}
