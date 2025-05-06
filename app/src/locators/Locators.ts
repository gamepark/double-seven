import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { PlayerColor } from '@gamepark/double-seven/PlayerColor'
import { Locator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {}
