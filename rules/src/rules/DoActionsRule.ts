import {
  CustomMove,
  isCustomMoveType,
  isMoveItemType,
  ItemMove,
  Location,
  Material,
  MaterialItem,
  MaterialMove,
  MoveItem,
  PlayerTurnRule
} from '@gamepark/rules-api'
import { groupBy, values } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Tile, tiles } from '../material/Tile'
import { CustomMoveType } from './CustomMove'
import { MemoryType } from './Memory'
import { RuleId } from './RuleId'

export class DoActionsRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const playerFamilies: MaterialItem[][] = this.getFamilies(this.playerTilesInGame)
    playerFamilies.forEach((family) => {
      const tile = family.find((t: MaterialItem) => (t.id as Tile) !== Tile.JokerTile)
      moves.push(...this.addMovesForGrowingFamily(tile?.id as Tile, tile!.location.y!))
      moves.push(...this.addMovesForEchangeFamily(this.playerTilesInGame.location((loc) => loc.y === tile?.location.y)))
    })
    tiles.forEach((tile) => {
      if (tile !== Tile.JokerTile) {
        moves.push(...this.addMovesForStartFamily(tile))
        moves.push(...this.addMovesForGetJocker(tile))
      }
    })

    if (this.canDoTwoForOneAction()) {
      moves.push(this.customMove(CustomMoveType.TwoForOneAction))
    }
    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }

  canDoTwoForOneAction(): boolean {
    return (
      !this.remind(MemoryType.PlayerAlreadyGetTwoForOneAction) &&
      this.material(MaterialType.Tile).location(LocationType.TilesPile).length > 0 &&
      this.playerTilesRack.length > 1
    )
  }

  beforeItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.switchTilesForExchange(move))
    moves.push(...this.switchTilesForGetJocker(move))
    moves.push(...this.getSevenToken(move))
    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      const playerWhoEndedGame: number | undefined = this.remind(MemoryType.PlayerWhoEndedGame)
      if (playerWhoEndedGame === this.nextPlayer) {
        return [this.endGame()]
      }
      if (this.playerTilesRack.length >= 6) {
        return [this.startRule(RuleId.DiscardTile)]
      }
      return [this.startPlayerTurn(this.getNextRule(), this.nextPlayer)]
    }
    if (isCustomMoveType(CustomMoveType.TwoForOneAction)(move)) {
      return [this.startRule(RuleId.TwoForOneAction)]
    }
    return []
  }

  afterItemMove(move: ItemMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    moves.push(...this.addSecondTileForStartFamily(move))
    return moves
  }

  getNextRule() {
    if (this.visibleTilesInPile.length > 0) {
      const nextPlayerTilesInRack = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.nextPlayer)
      return nextPlayerTilesInRack.length > 0 ? RuleId.ChooseTwoTiles : RuleId.ChooseThreeTiles
    }
    return RuleId.FlipTile
  }

  onRuleEnd(): MaterialMove[] {
    this.forget(MemoryType.PlayerAlreadyGetTwoForOneAction)
    return []
  }

  get visibleTilesInPile() {
    return this.material(MaterialType.Tile).location(LocationType.TilesPile).rotation(false)
  }

  get playerTilesRack() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(this.player)
  }

  get playerTilesInGame() {
    return this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(this.player)
  }

  private addMovesForStartFamily(tile: Tile) {
    const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
    const jockerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.id === tile)
    const moves: MaterialMove[] = []
    if (tilesInGameForThisFamily.length > 0) {
      return moves
    }
    if (playerTilesForThisColor.length >= 2 || (playerTilesForThisColor.length === 1 && jockerTiles.length > 0)) {
      moves.push(...playerTilesForThisColor.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player })))
    }
    return moves
  }

  private addMovesForGrowingFamily(tile: Tile, familyY: number) {
    const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
    const jockerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
    const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.y === familyY)
    const moves: MaterialMove[] = []
    if (tilesInGameForThisFamily.length === 0) {
      return moves
    }
    const x = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.x ?? 0
    const y = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.y ?? 0
    if (playerTilesForThisColor.length > 0) {
      moves.push(...playerTilesForThisColor.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y })))
    }
    if (jockerTiles.length > 0) {
      moves.push(...jockerTiles.moveItems(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y })))
    }
    return moves
  }

  private addMovesForEchangeFamily(playerTiles: Material): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (playerTiles.length === 0) {
      return moves
    }
    this.possibleEchanges(playerTiles.length).forEach((loc) => {
      moves.push(...playerTiles.moveItems(loc))
    })
    return moves
  }

  private possibleEchanges(familyLength: number): Location[] {
    const locations: Location[] = []
    this.game.players.forEach((player) => {
      if (player !== this.player) {
        const playerTiles = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(player)
        const families = this.getFamilies(playerTiles)
        families.forEach((family) => {
          if (family.length === familyLength) {
            locations.push(...family.map((it) => it.location))
          }
        })
      }
    })
    return locations
  }

  private addMovesForGetJocker(tile: Tile): MaterialMove[] {
    const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
    if (playerTilesForThisColor.length === 0) return []
    const moves: MaterialMove[] = []
    this.possibleJockerToGet(tile).forEach((loc) => {
      moves.push(...playerTilesForThisColor.moveItems(loc))
    })
    return moves
  }

  private possibleJockerToGet(tile: Tile): Location[] {
    const locations: Location[] = []
    this.game.players.forEach((player) => {
      const playerTiles = this.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(player)
      const families = this.getFamilies(playerTiles)
      families.forEach((family) => {
        const familyColor = family.find((it) => it.id !== Tile.JokerTile)?.id
        const joker = family.find((it) => it.id === Tile.JokerTile)
        if (familyColor === tile && joker) {
          locations.push(joker.location)
        }
      })
    })
    return locations
  }

  getFamilies(playerTiles: Material): MaterialItem[][] {
    return values(groupBy(playerTiles.getItems(), (item: MaterialItem) => item.location.y))
  }

  getSevenToken(move: MaterialMove): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsAGrowingUpFamilyMove(move)) {
      const playerFamiliesWithSevenToken: number[] | undefined = this.remind(MemoryType.PlayerFamilyWithSevenToken, this.player) ?? []
      if (this.checkIfCanGetSevenToken(move, playerFamiliesWithSevenToken)) {
        this.memorize(MemoryType.PlayerFamilyWithSevenToken, [...playerFamiliesWithSevenToken, move.location.y], this.player)
        moves.push(
          this.material(MaterialType.SevenToken)
            .location(LocationType.SevenTokenDeck)
            .moveItem(() => ({ type: LocationType.PlayerSevenTokenSpace, player: this.player, rotation: false }))
        )
        moves.push(...this.getDoubleSevenToken(playerFamiliesWithSevenToken))
      }
    }
    return moves
  }

  getDoubleSevenToken(playerFamiliesWithSevenToken: number[]): MaterialMove[] {
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

  private checkIfMoveIsAGrowingUpFamilyMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player === this.player &&
      move.location.x !== undefined &&
      this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type === LocationType.PlayerTilesInRack
    )
  }

  private checkIfMoveIsAExchangeMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player !== this.player &&
      move.location.x !== undefined &&
      this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type === LocationType.PlayerTilesInGame
    )
  }

  private checkIfMoveIsAGetJockerMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.x !== undefined &&
      this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.location.type === LocationType.PlayerTilesInRack
    )
  }

  private switchTilesForExchange(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsAExchangeMove(move)) {
      const tilesInThisLocation = this.material(MaterialType.Tile).location(
        (loc) => loc.type === LocationType.PlayerTilesInGame && loc.y === move.location.y && loc.player === move.location.player
      )
      const movedTileY = this.playerTilesInGame.index(move.itemIndex).getItem()?.location.y
      const otherPlayerTilesToMove = this.playerTilesInGame.filter((it) => it.location.y === movedTileY)
      return [
        ...tilesInThisLocation.moveItems((item) => ({ ...item.location, y: movedTileY, player: this.player })),
        ...otherPlayerTilesToMove.index((index) => index !== move.itemIndex).moveItems(() => ({ ...move.location, x: undefined }))
      ]
    }
    return []
  }

  private switchTilesForGetJocker(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsAGetJockerMove(move)) {
      const tileInThisLocation = this.material(MaterialType.Tile).location(
        (loc) => loc.type === LocationType.PlayerTilesInGame && loc.y === move.location.y && loc.x === move.location.x && loc.player === move.location.player
      )
      if (tileInThisLocation.length > 0) {
        return [tileInThisLocation.moveItem(() => ({ type: LocationType.PlayerTilesInRack, player: this.player }))]
      }
    }
    return []
  }

  private checkIfMoveIsStartFamilyMove(move: MaterialMove): boolean {
    return (
      isMoveItemType(MaterialType.Tile)(move) &&
      move.location.type === LocationType.PlayerTilesInGame &&
      move.location.player === this.player &&
      move.location.x === undefined
    )
  }

  private addSecondTileForStartFamily(move: MaterialMove): MaterialMove[] {
    if (isMoveItemType(MaterialType.Tile)(move) && this.checkIfMoveIsStartFamilyMove(move)) {
      const posedTileY = this.playerTilesInGame.index(move.itemIndex).getItem()?.location.y
      const tile = this.material(MaterialType.Tile).index(move.itemIndex).getItem()?.id as Tile
      const playerTilesForThisColor = this.playerTilesRack.filter((item) => item.id === tile)
      const jockerTiles = this.playerTilesRack.filter((item) => item.id === Tile.JokerTile)
      const tilesInGameForThisFamily = this.playerTilesInGame.filter((item) => item.location.y === posedTileY)
      if (tilesInGameForThisFamily.length === 0) {
        return []
      }
      const x = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.x ?? 0
      const y = tilesInGameForThisFamily.maxBy((item) => item.location.x!).getItem()?.location.y ?? 0
      if (playerTilesForThisColor.length > 0) {
        return [playerTilesForThisColor.moveItem(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y }))]
      } else if (jockerTiles.length > 0) {
        return [jockerTiles.moveItem(() => ({ type: LocationType.PlayerTilesInGame, player: this.player, x: x + 1, y }))]
      }
    }
    return []
  }
}
