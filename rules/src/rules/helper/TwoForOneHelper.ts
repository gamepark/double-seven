import { isMoveItemType, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MemoryType } from '../Memory'
import { RuleId } from '../RuleId'

export class TwoForOneHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  addTwoForOneMove() {
    if (this.canDoTwoForOneAction()) {
      return [...this.playerTilesRack.moveItems(() => ({ type: LocationType.TilesPile, rotation: false }))]
    }
    return []
  }

  canDoTwoForOneAction(): boolean {
    return (
      !this.remind(MemoryType.PlayerAlreadyGetTwoForOneAction) &&
      this.material(MaterialType.Tile).location(LocationType.TilesPile).length > 0 &&
      this.playerTilesRack.length > 1
    )
  }

  forgetPlayerAlreadyGetTwoForOneAction() {
    this.forget(MemoryType.PlayerAlreadyGetTwoForOneAction)
  }

  checkAndMoveToTwoForOneAction(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.TilesPile) {
      this.memorize(MemoryType.TilesUsedForTwoForOne, [this.material(MaterialType.Tile).index(move.itemIndex).getItem()!.id])
      return [this.startRule(RuleId.TwoForOneAction)]
    }
    return []
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }
}
