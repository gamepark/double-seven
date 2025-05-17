/** @jsxImportSource @emotion/react */
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { CustomMoveType } from '@gamepark/double-seven/rules/CustomMove'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const DeclareRainbowHeader = () => {
  const player = usePlayerId()
  const rules = useRules<DoubleSevenRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const declareRainbow = useLegalMove(isCustomMoveType(CustomMoveType.DeclareRainbow))
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))

  if (itsMe) {
    return (
      <Trans
        defaults="header.declare.rainbow.you"
        components={{
          declareRainbow: <PlayMoveButton move={declareRainbow} />,
          pass: <PlayMoveButton move={pass} />
        }}
      />
    )
  }

  return <Trans defaults="header.declare.rainbow.player" values={{ player: name }} />
}
