/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { LastTurnDialog } from './dialogs/LastTurnDialog'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = ({ players }: GameDisplayProps) => {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }
  const getTableWidth = (): { xMin: number; xMax: number } => {
    switch (players) {
      case 2:
        return { xMin: -50, xMax: 60 }
      case 3:
        return { xMin: -50, xMax: 90 }
      case 4:
      default:
        return { xMin: -80, xMax: 90 }
    }
  }
  return (
    <>
      <GameTable
        xMin={getTableWidth().xMin}
        xMax={getTableWidth().xMax}
        yMin={-30}
        yMax={35}
        margin={margin}
        verticalCenter
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation />
        <PlayerPanels />
        <LastTurnDialog />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
