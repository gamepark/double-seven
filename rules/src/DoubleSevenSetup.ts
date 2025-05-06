import { MaterialGameSetup } from '@gamepark/rules-api'
import { DoubleSevenOptions } from './DoubleSevenOptions'
import { DoubleSevenRules } from './DoubleSevenRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class DoubleSevenSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, DoubleSevenOptions> {
  Rules = DoubleSevenRules

  setupMaterial(_options: DoubleSevenOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
