/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Rack from '../images/Rack.png'

export class TilesRackDescription extends BoardDescription {
  height = 7.4
  width = 21

  getStaticItems = ({ rules }: MaterialContext) => {
    const items: MaterialItem[] = []
    for (const player of rules.players) {
      items.push({ location: { type: LocationType.TilesRack, player } })
    }
    return items
  }

  image = Rack
}

export const tilesRackDescription = new TilesRackDescription()
