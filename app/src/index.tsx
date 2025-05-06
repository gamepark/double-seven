/** @jsxImportSource @emotion/react */
import { DoubleSevenOptionsSpec } from '@gamepark/double-seven/DoubleSevenOptions'
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { DoubleSevenSetup } from '@gamepark/double-seven/DoubleSevenSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
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
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
