import { CustomMove, ItemMove, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getFamilies, Tile, tiles } from '../material/Tile'
import { CustomMoveType } from './CustomMove'
import { ExchangeFamilyHelper } from './helper/ExchangeFamilyHelper'
import { ExpandFamilyHelper } from './helper/ExpandFamilyHelper'
import { GetJokerHelper } from './helper/GetJokerHelper'
import { PassHelper } from './helper/PassHelper'
import { SevenTokenHelper } from './helper/SevenTokenHelper'
import { StartFamilyHelper } from './helper/StartFamilyHelper'
import { TwoForOneHelper } from './helper/TwoForOneHelper'

export class DoActionsRule extends PlayerTurnRule {
  startFamilyHelper = new StartFamilyHelper(this.game)
  expandFamilyHelper = new ExpandFamilyHelper(this.game)
  exchangeFamilyHelper = new ExchangeFamilyHelper(this.game)
  getJokerHelper = new GetJokerHelper(this.game)
  sevenTokenHelper = new SevenTokenHelper(this.game)
  twoForOneHelper = new TwoForOneHelper(this.game)
  passHelper = new PassHelper(this.game, this.nextPlayer)

  getPlayerMoves(): MaterialMove[] {
    if (this.playerTilesInRack.length === 0) return [this.customMove(CustomMoveType.Pass)]

    const moves: MaterialMove[] = []
    const playerFamilies: MaterialItem[][] = getFamilies(this.playerTilesInGame)
    playerFamilies.forEach((family) => {
      const tile = family.find((t: MaterialItem) => (t.id as Tile) !== Tile.JokerTile)
      moves.push(...this.expandFamilyHelper.addMovesForExpandFamily(tile?.id as Tile, tile!.location.id!))
      moves.push(...this.exchangeFamilyHelper.addMovesForExchangeFamily(tile!.location.id!))
    })
    tiles.forEach((tile) => {
      moves.push(...this.startFamilyHelper.addMovesForStartFamily(tile))
      moves.push(...this.getJokerHelper.addMovesForGetJoker(tile))
    })

    moves.push(...this.twoForOneHelper.addTwoForOneMove())
    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.exchangeFamilyHelper.switchTilesForExchange(move))
    moves.push(...this.getJokerHelper.switchTilesForGetJocker(move))
    moves.push(...this.sevenTokenHelper.getSevenToken(move))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.passHelper.checkIfPassAndMoveToNextAction(move))
    moves.push(...this.twoForOneHelper.checkAndMoveToTwoForOneAction(move))
    return moves
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.startFamilyHelper.addSecondTileForStartFamily(move))
    return moves
  }

  onRuleEnd(): MaterialMove[] {
    this.twoForOneHelper.forgetPlayerAlreadyGetTwoForOneAction()
    return []
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }

  get playerTilesInRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }
}
