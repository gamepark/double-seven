/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialGame, MaterialItem, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const GetSevenTokenHistory = (props: MoveComponentProps<MoveItem>) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const game = context.game as MaterialGame
  const sevenToken: MaterialItem = game.items[MaterialType.Tile]![move.itemIndex]

  return (
    <Trans defaults="history.seven.token" values={{ player: name }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.SevenToken, sevenToken)} transient />
    </Trans>
  )
}
