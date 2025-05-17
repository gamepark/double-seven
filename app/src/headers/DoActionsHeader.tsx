/** @jsxImportSource @emotion/react */
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { CustomMoveType } from '@gamepark/double-seven/rules/CustomMove'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const DoActionsHeader = () => {
  const player = usePlayerId()
  const rules = useRules<DoubleSevenRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const twoForOne = useLegalMove(isCustomMoveType(CustomMoveType.TwoForOneAction))

  if (itsMe) {
    return (
      <Trans
        defaults="header.take.actions.you"
        components={{
          pass: <PlayMoveButton move={pass} />,
          twoForOne: <PlayMoveButton move={twoForOne} />
        }}
      />
    )
  }

  return <Trans defaults="header.take.actions.player" values={{ player: name }} />
}
