/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DoubleSevenRules } from '@gamepark/double-seven/DoubleSevenRules'
import { ScoreHelper } from '@gamepark/double-seven/rules/helper/ScoreHelper'
import { Picture, ScoringDescription } from '@gamepark/react-game'
import { getEnumValues } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import SevenIcon from '../images/SevenIcon.png'

enum ScoringKeys {
  Tile,
  SevenToken,
  DoubleSevenToken,
  Total
}

export class DoublSevenScoring implements ScoringDescription {
  getScoringKeys(_: DoubleSevenRules) {
    return getEnumValues(ScoringKeys)
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.Tile:
        return <Trans defaults="game-over.score.type.tile" />
      case ScoringKeys.SevenToken:
        return (
          <Trans
            defaults="game-over.score.type.seven.token"
            components={{
              seven: <Picture src={SevenIcon} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.DoubleSevenToken:
        return (
          <Trans
            defaults="game-over.score.type.double.seven.token"
            components={{
              seven: <Picture src={SevenIcon} css={pictureCss} />
            }}
          />
        )
      case ScoringKeys.Total:
        return (
          <div css={bold}>
            <Trans defaults="game-over.score.type.total" />
          </div>
        )
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: number, rules: DoubleSevenRules) {
    const scoreHelper = new ScoreHelper(rules.game)
    switch (key) {
      case ScoringKeys.Tile:
        return scoreHelper.getTilesScore(player)
      case ScoringKeys.SevenToken:
        return scoreHelper.getSevenTokenScore(player)
      case ScoringKeys.DoubleSevenToken:
        return scoreHelper.getDoubleSevenTokenScore(player)
      case ScoringKeys.Total:
        return <div css={bold}>{scoreHelper.getScore(player)}</div>
    }
  }
}

const bold = css`
  font-weight: bold;
`

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.3em;
`
