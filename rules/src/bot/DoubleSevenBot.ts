import { isCustomMove, isMoveItem, isMoveItemType, MaterialGame, MaterialItem, MaterialMove, RandomBot } from '@gamepark/rules-api'
import { DoubleSevenRules } from '../DoubleSevenRules'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getFamilies, Tile } from '../material/Tile'
import { RuleId } from '../rules/RuleId'

export class DoubleSevenBot extends RandomBot<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number> {
  constructor(playerId: number) {
    super(DoubleSevenRules, playerId)
  }

  override getLegalMoves(game: MaterialGame<number, MaterialType, LocationType>): MaterialMove<number, MaterialType, LocationType>[] {
    const rules = new DoubleSevenRules(game)
    const player = game.rule?.player
    const legalMoves = super.getLegalMoves(game)
    const chooseTileRules = [RuleId.ChooseTwoTiles, RuleId.ChooseThreeTiles, RuleId.ChooseTileAfterRainbow, RuleId.TwoForOneActionGetTile]
    if (chooseTileRules.includes(rules.game.rule?.id ?? 0)) {
      return this.getBotMoveToChooseATile(rules, legalMoves)
    }
    if (rules.game.rule?.id === RuleId.DoActions) {
      return this.getBotMoveForDoActionRule(rules, legalMoves, player)
    }
    return legalMoves
  }

  getBotMoveToChooseATile(rules: DoubleSevenRules, legalMoves: MaterialMove[]): MaterialMove[] {
    const visibleTile = rules.material(MaterialType.Tile).location(LocationType.TilesPile).rotation(false)
    if (visibleTile.length === 0) return legalMoves

    const visibleTileJoker = visibleTile.filter((it) => it.id === Tile.JokerTile)

    if (visibleTileJoker.length) return legalMoves.filter((it) => isMoveItem(it) && it.itemIndex === visibleTileJoker.getIndex())

    const playerTilesInGame = rules
      .material(MaterialType.Tile)
      .location(LocationType.PlayerTilesInGame)
      .player(rules.game.rule?.player)
      .getItems()
      .map((it: MaterialItem) => it.id)

    const moves: MaterialMove[] = []
    playerTilesInGame.forEach((id) => {
      const visibleTileWithSameColor = visibleTile.filter((it) => it.id === id)
      if (visibleTileWithSameColor.length) moves.push(...legalMoves.filter((it) => isMoveItem(it) && it.itemIndex === visibleTileWithSameColor.getIndex()))
    })

    if (moves.length > 0) return moves

    const playerTilesInRack = rules
      .material(MaterialType.Tile)
      .location(LocationType.PlayerTilesInRack)
      .player(rules.game.rule?.player)
      .getItems()
      .map((it: MaterialItem) => it.id)

    if (playerTilesInRack.includes(visibleTile.getItem()?.id)) return legalMoves.filter((it) => isMoveItem(it) && it.itemIndex === visibleTile.getIndex())

    return legalMoves
  }

  getBotMoveForDoActionRule(rules: DoubleSevenRules, legalMoves: MaterialMove[], player?: number): MaterialMove[] {
    const legalMovesWithoutTwoForOne = legalMoves.filter((it) => (isMoveItem(it) && it.location.type !== LocationType.TilesPile) || isCustomMove(it))

    const getJokerMove = legalMovesWithoutTwoForOne.find((it: MaterialMove) => {
      if (isMoveItem(it) && it.location.type === LocationType.PlayerTilesInGame && it.location.x !== undefined) {
        const tileInLocation = rules
          .material(MaterialType.Tile)
          .location((loc) => loc.type === it.location.type && it.location.player === loc.player && it.location.id === loc.id && it.location.x === loc.x)
          .getItem()
        return tileInLocation?.id === Tile.JokerTile
      }
      return false
    })
    if (getJokerMove) return [getJokerMove]

    const expandFamilyMoves = legalMovesWithoutTwoForOne
      .filter(
        (it) =>
          isMoveItem(it) && it.location.type === LocationType.PlayerTilesInGame && it.location.player === rules.game.rule?.player && it.location.x !== undefined
      )
      .sort((a, b) => {
        if (!isMoveItem(a) || !isMoveItem(b)) return 0
        const playerTilesInGame = rules.material(MaterialType.Tile).location(LocationType.PlayerTilesInGame).player(rules.game.rule?.player)
        const families = getFamilies(playerTilesInGame).flatMap((f) => {
          return { id: f[0].location.id, length: f.length }
        })
        const aLength = families.find((t) => t.id === a.location.id)?.length ?? 0
        const bLength = families.find((t) => t.id === b.location.id)?.length ?? 0
        return aLength - bLength
      })
    if (expandFamilyMoves.length > 0) return [expandFamilyMoves[expandFamilyMoves.length - 1]]

    const startFamilyMoves = legalMovesWithoutTwoForOne.filter(
      (it) =>
        isMoveItem(it) && it.location.type === LocationType.PlayerTilesInGame && it.location.player === rules.game.rule?.player && it.location.x === undefined
    )
    if (startFamilyMoves.length > 0) return startFamilyMoves

    const exchangeFamily = legalMovesWithoutTwoForOne
      .filter(
        (it) => isMoveItem(it) && it.location.type === LocationType.PlayerTilesInGame && it.location.player !== rules.game.rule?.player && it.location.x === 0
      )
      .filter((it) => {
        if (!isMoveItem(it)) return false
        const tileInLocation = rules
          .material(MaterialType.Tile)
          .location((loc) => loc.type === it.location.type && it.location.player === loc.player && it.location.y === loc.y && it.location.x === loc.x)
          .getItem()
        const playerTilesInRack = rules
          .material(MaterialType.Tile)
          .location(LocationType.PlayerTilesInRack)
          .player(rules.game.rule?.player)
          .getItems()
          .map((t: MaterialItem) => t.id)
        return playerTilesInRack.includes(tileInLocation?.id)
      })
    if (exchangeFamily.length > 0) return exchangeFamily

    return legalMovesWithoutTwoForOne.filter((move: MaterialMove) => {
      return (isMoveItemType(MaterialType.Tile)(move) && (move.location.player === player || move.location.player === undefined)) || isCustomMove(move)
    })
  }
}
