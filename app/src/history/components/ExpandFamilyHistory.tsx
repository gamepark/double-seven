/** @jsxImportSource @emotion/react */

import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { Tile } from '@gamepark/double-seven/material/Tile'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialGame, MaterialItem, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { useGetRevealedTile } from './useGetRevealedTile'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ExpandFamilyHistory = (props: MoveComponentProps<MoveItem>) => {
  const { move, context } = props
  const actionPlayer = context.action.playerId
  const name = usePlayerName(actionPlayer)
  let { tile } = useGetRevealedTile(props)

  if (tile.id === Tile.JokerTile) {
    const game = context.game as MaterialGame
    const tilesInFamily: MaterialItem[] = game.items[MaterialType.Tile]!.filter(
      (it: MaterialItem) =>
        it.location.type === LocationType.PlayerTilesInGame &&
        it.location.player === actionPlayer &&
        it.location.id === move.location.id &&
        it.id !== Tile.JokerTile
    )
    tile = tilesInFamily[0]
  }

  return (
    <Trans defaults="history.expand.family" values={{ player: name, color: tile.id }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.Tile, tile)} transient />
    </Trans>
  )
}
