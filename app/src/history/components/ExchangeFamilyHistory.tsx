/** @jsxImportSource @emotion/react */

import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { Tile } from '@gamepark/double-seven/material/Tile'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialGame, MaterialItem, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ExchangeFamilyHistory = (props: MoveComponentProps<MoveItem>) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  const otherName = usePlayerName(move.location.player)
  const game = context.game as MaterialGame
  const tile: MaterialItem = game.items[MaterialType.Tile]![move.itemIndex]
  const othersTiles = game.items[MaterialType.Tile]!.filter(
    (it: MaterialItem) =>
      move.location.type === it.location.type &&
      move.location.player === it.location.player &&
      move.location.id === it.location.id &&
      it.id !== tile.id &&
      it.id !== Tile.JokerTile
  )

  const otherColor = othersTiles.length > 0 ? othersTiles[0].id : tile.id

  return (
    <Trans defaults="history.exchange.family" values={{ player: name, color: tile.id, otherColor, otherName }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.Tile, tile)} transient />
    </Trans>
  )
}
