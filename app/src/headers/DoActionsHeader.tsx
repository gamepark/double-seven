/** @jsxImportSource @emotion/react */
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { CustomMoveType } from '@gamepark/double-seven/rules/CustomMove'
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayRulesHelp = MaterialMoveBuilder.displayRulesHelp

export const DoActionsHeader = () => {
  const player = usePlayerId()
  const rules = useRules<DoubleSevenRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const empty = useLegalMove(isCustomMoveType(CustomMoveType.Empty))

  if (itsMe) {
    if (empty) {
      return (
        <Trans
          defaults="header.take.actions.empty"
          components={{
            empty: <PlayMoveButton move={empty} />
          }}
        />
      )
    }
    return (
      <Trans
        defaults="header.take.actions.you"
        components={{
          pass: <PlayMoveButton move={pass} />,
          actions: <PlayMoveButton move={displayRulesHelp(RuleId.DoActions)} transient />
        }}
      />
    )
  }

  return <Trans defaults="header.take.actions.player" values={{ player: name }} />
}
