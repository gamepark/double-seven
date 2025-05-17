/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialItem, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GetDoubleSevenTokenHistory = (props: MoveComponentProps) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const doubleSevenToken: MaterialItem = context.game.items[MaterialType.Tile][move.itemIndex]

  return (
    <Trans defaults="history.double.seven.token" values={{ player: name }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.DoubleSevenToken, doubleSevenToken)} transient />
    </Trans>
  )
}
