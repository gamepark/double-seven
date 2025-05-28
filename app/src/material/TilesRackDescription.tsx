/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import Rack from '../images/Rack.png'
import displayRulesHelp = MaterialMoveBuilder.displayRulesHelp

export class TilesRackDescription extends BoardDescription {
  height = 6.88
  width = 19.5

  getStaticItems = ({ rules }: MaterialContext) => {
    const items: MaterialItem[] = []
    for (const player of rules.players) {
      items.push({ location: { type: LocationType.TilesRack, player } })
    }
    return items
  }

  getLocations(item: MaterialItem) {
    return [{ type: LocationType.PlayerTilesInRack, player: item.location.player }]
  }

  image = Rack

  displayHelp = () => displayRulesHelp(RuleId.DiscardTile)
}

export const tilesRackDescription = new TilesRackDescription()
