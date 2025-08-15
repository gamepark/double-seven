import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { MoveComponentProps, usePlayerId } from '@gamepark/react-game'
import { MaterialGame, MaterialItem, MoveItem } from '@gamepark/rules-api'

export const useGetRevealedTile = (props: MoveComponentProps<MoveItem>): { tile: MaterialItem } => {
  const { move, context } = props
  const player = usePlayerId()
  const actionPlayer = context.action.playerId
  const itsMe = player && actionPlayer === player
  const game = context.game as MaterialGame
  const tile: MaterialItem = itsMe ? game.items[MaterialType.Tile]![move.itemIndex] : { id: move.reveal?.id, location: { type: 0, rotation: false } }
  return { tile }
}
