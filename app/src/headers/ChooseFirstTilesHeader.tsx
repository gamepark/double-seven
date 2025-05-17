/** @jsxImportSource @emotion/react */
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const ChooseFirstTilesHeader = () => {
  const { t } = useTranslation()
  const playerId: number | undefined = usePlayerId()
  const activePlayers = useRules<DoubleSevenRules>()?.game.rule?.players ?? []
  const player = usePlayerName(activePlayers[0])
  if (playerId !== undefined && activePlayers.includes(playerId)) {
    return <Trans defaults="header.choose.first.tiles.you" />
  } else if (activePlayers.length === 1) {
    return <>{t('header.choose.first.tiles.player', { player })}</>
  } else {
    return <>{t('header.choose.first.tiles.all')}</>
  }
}
