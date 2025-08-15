/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const FlipTileHistory = (props: MoveComponentProps<MoveItem>) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const flippedTile: MaterialItem = { id: move.reveal?.id, location: { type: 0, rotation: false } }

  return (
    <Trans defaults="history.flip.tile" values={{ player: name, color: move.reveal?.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.Tile, flippedTile)} transient />
    </Trans>
  )
}
