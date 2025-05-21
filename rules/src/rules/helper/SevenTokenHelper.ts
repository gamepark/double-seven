import { isMoveItemType, MaterialGame, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { MemoryType } from '../Memory'
import { ExpandFamilyHelper } from './ExpandFamilyHelper'

export class SevenTokenHelper extends MaterialRulesPart {
  player?: number
  expandFamilyHelper: ExpandFamilyHelper

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
    this.expandFamilyHelper = new ExpandFamilyHelper(game, player)
  }

  getSevenToken(move: MaterialMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Tile)(move) && this.expandFamilyHelper.checkIfMoveIsAExpandFamilyMove(move)) {
      const playerFamiliesWithSevenToken: number[] | undefined = this.remind(MemoryType.PlayerFamilyWithSevenToken, this.player) ?? []
      if (this.checkIfCanGetSevenToken(move, playerFamiliesWithSevenToken)) {
        this.memorize(MemoryType.PlayerFamilyWithSevenToken, [...playerFamiliesWithSevenToken, move.location.y], this.player)
        moves.push(
          this.material(MaterialType.SevenToken).createItem({ location: { type: LocationType.PlayerSevenTokenSpace, player: this.player, rotation: false } })
        )
        moves.push(...this.getDoubleSevenToken(playerFamiliesWithSevenToken))
      }
    }
    return moves
  }

  private getDoubleSevenToken(playerFamiliesWithSevenToken: number[]): MaterialMove[] {
    const doubleSevenToken = this.material(MaterialType.DoubleSevenToken)
    if (playerFamiliesWithSevenToken.length === 1 && doubleSevenToken.getItem()?.location.type === LocationType.DoubleSevenTokenIdleSpace) {
      this.memorize(MemoryType.PlayerWhoEndedGame, this.player)
      return [doubleSevenToken.moveItem(() => ({ type: LocationType.PlayerDoubleSevenTokenSpace, player: this.player, rotation: false }))]
    }
    return []
  }

  private checkIfCanGetSevenToken(move: MoveItem, playerFamiliesWithSevenToken: number[]): boolean {
    const family = this.playerTilesInGame.filter((it) => it.location.y === move.location.y)
    const oldLocation = this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type

    return family.length >= 6 && !playerFamiliesWithSevenToken.includes(move.location.y!) && oldLocation === LocationType.PlayerTilesInRack
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }
}
