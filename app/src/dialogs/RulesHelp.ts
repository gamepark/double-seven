import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { ActionsHelp } from './ActionsHelp'
import { DiscardTileHelp } from './DiscardTileHelp'

export const RulesHelp = {
  [RuleId.DiscardTile]: DiscardTileHelp,
  [RuleId.DoActions]: ActionsHelp
}