/** @jsxImportSource @emotion/react */
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { RulesDialog, ThemeButton, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { MemoryType } from '@gamepark/double-seven/rules/Memory'

export const LastTurnDialog = () => {
  const { t } = useTranslation()
  const player = usePlayerId()
  const rules = useRules<DoubleSevenRules>()
  const lastTurn = !rules?.isOver() && rules?.remind(MemoryType.PlayerWhoEndedGame) !== undefined
  const [explainLastTurn, setExplainLastTurn] = useState(false)
  const playerWhoEndedGame = rules?.remind(MemoryType.PlayerWhoEndedGame)
  const playerWhoEndedGameName = usePlayerName(playerWhoEndedGame)
  const itsMe = player && playerWhoEndedGame === player
  useEffect(() => {
    if (lastTurn) setExplainLastTurn(true)
  }, [lastTurn])
  return (
    <RulesDialog open={explainLastTurn} close={() => setExplainLastTurn(false)}>
      <div css={rulesCss}>
        <h2>{t('rules.lastTurn')}</h2>
        {itsMe ? <p>{t('rules.lastTurn.you')}</p> : <p>{t('rules.lastTurn.lastPlayer', { player: playerWhoEndedGameName })}</p>}
        <p>{t('rules.lastTurn.text')}</p>
        <ThemeButton onClick={() => setExplainLastTurn(false)}>{t('OK')}</ThemeButton>
      </div>
    </RulesDialog>
  )
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin: 0 1em;
    text-align: center;
  }

  > p {
    white-space: break-spaces;
  }
`
