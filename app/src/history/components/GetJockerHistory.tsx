/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GetJockerHistory = (props: MoveComponentProps) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const tile: MaterialItem = context.game.items[MaterialType.Tile][move.itemIndex]

  return (
    <Trans defaults="history.get.jocker" values={{ player: name }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.Tile, tile)} transient />
    </Trans>
  )
}
