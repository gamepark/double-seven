import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { doubleSevenTokenIdleSpaceLocator } from './DoubleSevenTokenIdleSpaceLocator'
import { playerDoubleSevenTokenSpaceLocator } from './PlayerDoubleSevenTokenSpaceLocator'
import { playerSevenTokenSpaceLocator } from './PlayerSevenTokenSpaceLocator'
import { playerTilesInGameLocator } from './PlayerTilesInGameLocator'
import { playerTilesInRackLocator } from './PlayerTilesInRackLocator'
import { sevenTokenDeckLocator } from './SevenTokenDeckLocator'
import { tilesDiscardLocator } from './TilesDiscardLocator'
import { tilesPileLocator } from './TilesPileLocator'
import { tilesRackLocator } from './TilesRackLocator'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.TilesPile]: tilesPileLocator,
  [LocationType.TilesDiscard]: tilesDiscardLocator,
  [LocationType.TilesRack]: tilesRackLocator,
  [LocationType.PlayerTilesInRack]: playerTilesInRackLocator,
  [LocationType.PlayerTilesInGame]: playerTilesInGameLocator,
  [LocationType.SevenTokenDeck]: sevenTokenDeckLocator,
  [LocationType.DoubleSevenTokenIdleSpace]: doubleSevenTokenIdleSpaceLocator,
  [LocationType.PlayerDoubleSevenTokenSpace]: playerDoubleSevenTokenSpaceLocator,
  [LocationType.PlayerSevenTokenSpace]: playerSevenTokenSpaceLocator
}
