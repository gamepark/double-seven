import { MaterialRulesPart } from '@gamepark/rules-api'
import { DOUBLE_SEVEN_TOCKEN_POINTS } from '../../Constantes'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class ScoreHelper extends MaterialRulesPart {
  getScore(playerId: number): number {
    const tiles = this.getElementLength(MaterialType.Tile, LocationType.PlayerTilesInGame, playerId)
    const sevenToken = this.getElementLength(MaterialType.SevenToken, LocationType.PlayerSevenTokenSpace, playerId)
    const doubleSevenToken = this.getElementLength(MaterialType.DoubleSevenToken, LocationType.PlayerDoubleSevenTokenSpace, playerId)

    return tiles + sevenToken + doubleSevenToken * DOUBLE_SEVEN_TOCKEN_POINTS
  }

  getElementLength(materialType: MaterialType, locationType: LocationType, playerId: number): number {
    return this.material(materialType).location(locationType).player(playerId).length
  }
}
