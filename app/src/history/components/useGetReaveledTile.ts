import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MoveComponentProps, usePlayerId } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export const useGetReaveledTile = (props: MoveComponentProps): { tile: MaterialItem } => {
  const { move, context } = props
  const player = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = player && actionPlayer === player
  const tile: MaterialItem = itsMe ? context.game.items[MaterialType.Tile][move.itemIndex] : { id: move.reveal?.id, location: { type: 0, rotation: false } }
  return { tile }
}
