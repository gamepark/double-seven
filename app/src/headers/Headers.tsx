/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/double-seven/rules/RuleId'
import { ComponentType } from 'react'
import { ChooseThreeTilesHeader } from './ChooseThreeTilesHeader'
import { ChooseTileAfterRainbowHeader } from './ChooseTileAfterRainbowHeader'
import { ChooseTwoTilesHeader } from './ChooseTwoTilesHeader'
import { DeclareRainbowHeader } from './DeclareRainbowHeader'
import { DiscardTileHeader } from './DiscardTileHeader'
import { FlipTileHeader } from './FlipTileHeader'
import { DoActionsHeader } from './DoActionsHeader'
import { TwoForOneActionGetTileHeader } from './TwoForOneActionGetTileHeader'
import { TwoForOneActionHeader } from './TwoForOneActionHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.FlipTile]: FlipTileHeader,
  [RuleId.ChooseTwoTiles]: ChooseTwoTilesHeader,
  [RuleId.ChooseThreeTiles]: ChooseThreeTilesHeader,
  [RuleId.DeclareRainbow]: DeclareRainbowHeader,
  [RuleId.ChooseTileAfterRainbow]: ChooseTileAfterRainbowHeader,
  [RuleId.DoActions]: DoActionsHeader,
  [RuleId.TwoForOneAction]: TwoForOneActionHeader,
  [RuleId.TwoForOneActionGetTile]: TwoForOneActionGetTileHeader,
  [RuleId.DiscardTile]: DiscardTileHeader
}
