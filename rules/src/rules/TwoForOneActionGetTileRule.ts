import { ChooseTwoTilesRule } from './ChooseTwoTilesRule'
import { RuleId } from './RuleId'

export class TwoForOneActionGetTileRule extends ChooseTwoTilesRule {
  nbTileToGet = 1
  nextRule = RuleId.DoActions
}
