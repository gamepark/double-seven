/** @jsxImportSource @emotion/react */
import { DoubleSevenBot } from '@gamepark/double-seven/bot/DoubleSevenBot'
import { DoubleSevenOptionsSpec } from '@gamepark/double-seven/DoubleSevenOptions'
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { DoubleSevenSetup } from '@gamepark/double-seven/DoubleSevenSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { DoubleSevenLogs } from './history/DoubleSevenLogs'
import Background from './images/Background.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { DoublSevenScoring } from './scoring/DoubleSevenScoring'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="double-seven"
      Rules={DoubleSevenRules}
      optionsSpec={DoubleSevenOptionsSpec}
      GameSetup={DoubleSevenSetup}
      material={Material}
      scoring={new DoublSevenScoring()}
      locators={Locators}
      animations={gameAnimations}
      ai={(game: MaterialGame, playerId: number) => Promise.resolve(new DoubleSevenBot(playerId).run(game))}
      logs={new DoubleSevenLogs()}
      theme={{ root: { background: { image: Background, overlay: 'rgba(0, 0, 0, 0.3)' } } }}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
