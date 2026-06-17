import { DoubleSevenBot } from '@gamepark/double-seven/bot/DoubleSevenBot'
import { DoubleSevenOptionsSpec } from '@gamepark/double-seven/DoubleSevenOptions'
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { DoubleSevenSetup } from '@gamepark/double-seven/DoubleSevenSetup'
import { GameProvider } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { RulesHelp } from './dialogs/RulesHelp'
import { DoubleSevenLogs } from './history/DoubleSevenLogs'
import Background from './images/Background.jpg'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { DoubleSevenScoring } from './scoring/DoubleSevenScoring'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="double-seven"
      Rules={DoubleSevenRules}
      optionsSpec={DoubleSevenOptionsSpec}
      GameSetup={DoubleSevenSetup}
      material={Material}
      tutorial={new Tutorial()}
      scoring={new DoubleSevenScoring()}
      locators={Locators}
      animations={gameAnimations}
      rulesHelp={RulesHelp}
      ai={(game: MaterialGame, playerId: number) => Promise.resolve(new DoubleSevenBot(playerId).run(game))}
      logs={new DoubleSevenLogs()}
      theme={{ root: { background: { image: Background, overlay: 'rgba(0, 0, 0, 0)' } } }}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
