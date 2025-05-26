/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { MemoryType } from '@gamepark/double-seven/rules/Memory'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import Star from '../images/Panels/star.png'
import Panel1 from '../images/Panels/Panel1.jpg'
import Panel2 from '../images/Panels/Panel2.jpg'
import Panel3 from '../images/Panels/Panel3.jpg'
import Panel4 from '../images/Panels/Panel4.jpg'

export const PlayerPanels = () => {
  const rules = useRules<DoubleSevenRules>()!
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

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
  bottom: 1em;
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
    left: 1em;
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
