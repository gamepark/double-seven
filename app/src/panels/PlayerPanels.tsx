/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MemoryType } from '@gamepark/double-seven/rules/Memory'
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { StyledPlayerPanel, useAnimation, usePlayers, useRules } from '@gamepark/react-game'
import { isCustomMove, MaterialMove } from '@gamepark/rules-api'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import Panel1 from '../images/Panels/Panel1.jpg'
import Panel2 from '../images/Panels/Panel2.jpg'
import Panel3 from '../images/Panels/Panel3.jpg'
import Panel4 from '../images/Panels/Panel4.jpg'
import Star from '../images/Panels/star.png'

export const PlayerPanels = () => {
  const { t } = useTranslation()
  const rules = useRules<DoubleSevenRules>()!
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  const animation = useAnimation<MaterialMove>((animation) => isCustomMove(animation.move))
  if (!root) {
    return null
  }

  const speakingPlayer = animation && rules.getActivePlayer()
  const isEmpty = speakingPlayer !== undefined && rules.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(speakingPlayer).length === 0
  const isRainbow = rules.game.rule?.id === RuleId.DeclareRainbow
  const speak = speakingPlayer !== undefined && (isRainbow ? t('speak.rainbow') : isEmpty ? t('speak.empty') : t('speak.pass'))

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          key={player.id}
          player={player}
          css={panelPosition(index, players.length)}
          backgroundImage={images[player.id]}
          counters={[
            {
              image: Star,
              value: rules.remind(MemoryType.PlayerScore, player.id) || 0
            }
          ]}
          speak={speakingPlayer === player.id && speak}
          activeRing
        />
      ))}
    </>,
    root
  )
}

const panelPosition = (players: number, index: number) => css`
  position: absolute;
  width: 28em;
  height: 8.3em;
  border: 0;
  bottom: 2em;
  ${getPanelPosition(players, index)};
`
const getPanelPosition = (index: number, nbPlayers: number) => {
  if (nbPlayers === 2) return cssForTwoPlayers[index]
  if (nbPlayers === 3) return cssForThreePlayers[index]
  if (nbPlayers === 4) return cssForFourPlayers[index]
  return css``
}

const cssForTwoPlayers = [
  css`
    left: 3em;
  `,
  css`
    right: 10em;
  `
]
const cssForThreePlayers = [
  css`
    left: 1em;
  `,
  css`
    right: 60em;
  `,
  css`
    right: 10em;
  `
]
const cssForFourPlayers = [
  css`
    left: 1em;
  `,
  css`
    left: 55em;
  `,
  css`
    right: 60em;
  `,
  css`
    right: 10em;
  `
]

const images: Record<number, string> = {
  1: Panel1,
  2: Panel2,
  3: Panel3,
  4: Panel4
}
