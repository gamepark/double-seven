/** @jsxImportSource @emotion/react */
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const ChooseTileAfterRainbowHeader = () => {
  const player = usePlayerId()
  const rules = useRules<DoubleSevenRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans defaults="header.choose.tile.rainbow.you" />
  }

  return <Trans defaults="header.choose.tile.rainbow.player" values={{ player: name }} />
}
