/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { useGetRevealedTile } from './useGetRevealedTile'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const DiscardTileHistory = (props: MoveComponentProps) => {
  const { context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const { tile } = useGetRevealedTile(props)

  return (
    <Trans defaults="history.discard.tile" values={{ player: name, color: tile.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.Tile, tile)} transient />
    </Trans>
  )
}
