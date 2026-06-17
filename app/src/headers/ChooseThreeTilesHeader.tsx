import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const ChooseThreeTilesHeader = () => {
  const player = usePlayerId()
  const rules = useRules<DoubleSevenRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    return <Trans i18nKey="header.choose.tiles.you" values={{ nbTilesToGet: 3 }} />
  }

  return <Trans i18nKey="header.choose.tiles.player" values={{ player: name, nbTilesToGet: 3 }} />
}
