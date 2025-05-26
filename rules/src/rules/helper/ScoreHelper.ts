import { MaterialRulesPart } from '@gamepark/rules-api'
import { DOUBLE_SEVEN_TOCKEN_POINTS } from '../../Constantes'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class ScoreHelper extends MaterialRulesPart {
  getScore(playerId: number): number {
    return this.getTilesScore(playerId) + this.getSevenTokenScore(playerId) + this.getDoubleSevenTokenScore(playerId)
  }

  getDoubleSevenTokenScore(playerId: number): number {
    const doubleSevenToken = this.getElementLength(MaterialType.DoubleSevenToken, LocationType.PlayerDoubleSevenTokenSpace, playerId)
    return doubleSevenToken * DOUBLE_SEVEN_TOCKEN_POINTS
  }

  getSevenTokenScore(playerId: number): number {
    return this.getElementLength(MaterialType.SevenToken, LocationType.PlayerSevenTokenSpace, playerId)
  }

  getTilesScore(playerId: number): number {
    return this.getElementLength(MaterialType.Tile, LocationType.PlayerTilesInGame, playerId)
  }

  getElementLength(materialType: MaterialType, locationType: LocationType, playerId: number): number {
    return this.material(materialType).location(locationType).player(playerId).length
  }
}
