/** @jsxImportSource @emotion/react */

import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { Tile } from '@gamepark/double-seven/material/Tile'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { useGetReaveledTile } from './useGetReaveledTile'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ExpandFamilyHistory = (props: MoveComponentProps) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  let { tile } = useGetReaveledTile(props)

  if (tile.id === Tile.JokerTile) {
    const tilesInFamily: MaterialItem[] = context.game.items[MaterialType.Tile].filter(
      (it: MaterialItem) =>
        it.location.type === LocationType.PlayerTilesInGame &&
        it.location.player === actionPlayer &&
        it.location.y === move.location.y &&
        it.id !== Tile.JokerTile
    )
    tile = tilesInFamily[0]
  }

  return (
    <Trans defaults="history.expand.family" values={{ player: name, color: tile.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.Tile, tile)} transient />
    </Trans>
  )
}
