/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { linkButtonCss, MaterialHelpProps, Picture, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import OrangeTile from '../../images/Tiles/OrangeTile.jpg'
import PinkTile from '../../images/Tiles/PinkTile.jpg'
import GreenTile from '../../images/Tiles/GreenTile.jpg'
import PurpleTile from '../../images/Tiles/PurpleTile.jpg'
import GreyTile from '../../images/Tiles/GreyTile.jpg'
import RedTile from '../../images/Tiles/RedTile.jpg'
import BlueTile from '../../images/Tiles/BlueTile.jpg'
import MaroonTile from '../../images/Tiles/MaroonTile.jpg'
import JockerTile from '../../images/Tiles/JockerTile.jpg'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

const components = {
  bold: <strong />,
  underline: <u />
}

export const TileHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const isInDiscard = item.location?.type === LocationType.TilesDiscard

  return (
    <>
      <h2>{t(`help.tile`)}</h2>
      {isInDiscard && (
        <>
          <p>
            <Trans defaults="help.tile.discard" components={components} css={mb0} />
          </p>
        </>
      )}
      <p>
        <Trans defaults="help.tile.description" components={components} css={mb0} />
      </p>
      <ul css={list}>
        <li css={listLine}>
          <Trans defaults="help.tile.description.animals" components={components} />
          <Picture src={OrangeTile} css={mini} />
          <Picture src={PinkTile} css={mini} />
          <Picture src={GreenTile} css={mini} />
          <Picture src={PurpleTile} css={mini} />
          <Picture src={GreyTile} css={mini} />
          <Picture src={RedTile} css={mini} />
          <Picture src={BlueTile} css={mini} />
          <Picture src={MaroonTile} css={mini} />
        </li>
        <li>
          <Trans defaults="help.tile.description.jocker" components={components} />
          <Picture src={JockerTile} css={mini} />
        </li>
      </ul>
      <h3>{t(`help.tile.objectives`)}</h3>
      <p>
        <Trans
          defaults="help.tile.objectives.description"
          components={{
            ...components,
            action: <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.PlayerTilesInRack })} transient />
          }}
          css={mb0}
        />
      </p>
    </>
  )
}

const mini = css`
  height: 2.5em;
  border-radius: 0.2em;
  margin-left: 0.2em;
`
const list = css`
  margin-top: 0;
  padding-left: 1em;
`
const listLine = css`
  margin-bottom: 0.3em;
`
const mb0 = css`
  margin-bottom: 0;
`
