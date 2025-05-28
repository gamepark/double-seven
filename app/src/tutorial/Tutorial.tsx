/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/double-seven/material/LocationType'
import { MaterialType } from '@gamepark/double-seven/material/MaterialType'
import { Tile } from '@gamepark/double-seven/material/Tile'
import { CustomMoveType } from '@gamepark/double-seven/rules/CustomMove'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType, isMoveItemTypeAtOnce, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Seven from '../images/SevenIcon.png'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const BaseComponents = {
  bold: <strong />,
  italic: <em />
}

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 2

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Mimi',
      avatar: {
        topType: 'LongHairBigHair',
        accessoriesType: 'Prescription01',
        hairColor: 'Red',
        facialHairType: 'Blank',
        clotheType: 'ShirtScoopNeck',
        clotheColor: 'PastelGreen',
        eyeType: 'Wink',
        eyebrowType: 'Default',
        mouthType: 'Twinkle',
        skinColor: 'Pale'
      }
    }
  ]

  options = {
    players: [{ id: me }, { id: opponent }]
  }
  setup = new TutorialSetup()

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.1" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.2" components={BaseComponents} />,
        position: { x: 0, y: -20 }
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Tile).location(LocationType.PlayerTilesInRack).player(me)],
        scale: 0.7
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.3" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.4" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      ...this.focusOnTileAndMoveToChooseTile(Tile.GreyTile)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.5" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Tile)
            .location(LocationType.TilesPile)
            .location((loc) => loc.rotation === false)
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.Tile)(move)) return false
          const tile = this.material(game, MaterialType.Tile).location(LocationType.TilesPile).index(move.itemIndex).getItem()
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack && tile?.id
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.6" components={BaseComponents} />
      },
      move: {
        filter: (move) => isCustomMoveType(CustomMoveType.DeclareRainbow)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.7" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      ...this.focusOnTileAndMoveToChooseTile(Tile.GreyTile)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.8" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.9" components={BaseComponents} />
      },
      move: {
        filter: (move) => {
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInGame && move.location.player === me
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.10" components={BaseComponents} />
      },
      move: {
        filter: (move) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },
    {
      move: {
        player: opponent
      }
    },
    {
      move: {
        player: opponent
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          if (!isMoveItemType(MaterialType.Tile)(move)) return false
          const tile = this.material(game, MaterialType.Tile).location(LocationType.PlayerTilesInRack).index(move.itemIndex).getItem()
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInGame && tile?.id === Tile.RedTile
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isCustomMoveType(CustomMoveType.Pass)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.11" components={BaseComponents} />,
        position: { x: 0, y: -20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Tile)
            .location((loc) => loc.type === LocationType.PlayerTilesInGame && loc.id === 0)
            .player(opponent)
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.12" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      ...this.focusOnTileAndMoveToChooseTile(Tile.GreyTile)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.13" components={BaseComponents} />,
        position: { x: 0, y: 20 }
      },
      ...this.focusOnTileAndMoveToChooseTile(Tile.BlueTile)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.14" components={BaseComponents} />
      },
      move: {
        filter: (move) => {
          return (
            isMoveItemType(MaterialType.Tile)(move) &&
            move.location.type === LocationType.PlayerTilesInGame &&
            move.location.player === me &&
            move.location.x === undefined
          )
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.15" components={BaseComponents} />
      },
      move: {
        filter: (move) => {
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInGame && move.location.player === me
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.16" components={BaseComponents} />
      },
      move: {
        filter: (move) => {
          return isMoveItemTypeAtOnce(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInGame && move.location.player === opponent
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.17" components={BaseComponents} />
      },
      move: {
        filter: (move) => {
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInGame && move.location.player === me
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.18" components={BaseComponents} />
      },
      move: {
        filter: (move) => {
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.TilesPile
        }
      }
    },
    {
      move: {}
    },
    this.focusOnTileAndMoveToChooseTile(Tile.JokerTile),
    {
      popup: {
        text: () => <Trans defaults="tuto.step.19" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.20" components={BaseComponents} />
      },
      move: {
        filter: (move) => {
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInGame && move.location.player === me
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.21" components={BaseComponents} />
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.step.22"
            components={{
              ...BaseComponents,
              seven: <Picture src={Seven} css={small} />
            }}
          />
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            defaults="tuto.step.23"
            components={{
              ...BaseComponents,
              seven: <Picture src={Seven} css={small} />
            }}
          />
        )
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.step.24" components={BaseComponents} />
      }
    }
  ]

  focusOnTileAndMoveToChooseTile(tileToPlay: Tile) {
    return {
      focus: (game: MaterialGame) => ({
        materials: [
          this.material(game, MaterialType.Tile)
            .location(LocationType.TilesPile)
            .location((loc) => loc.id === tileToPlay)
        ],
        scale: 0.1
      }),
      move: {
        filter: (move: MaterialMove, game: MaterialGame) => {
          if (!isMoveItemType(MaterialType.Tile)(move)) return false
          const tile = this.material(game, MaterialType.Tile).location(LocationType.TilesPile).index(move.itemIndex).getItem()
          return isMoveItemType(MaterialType.Tile)(move) && move.location.type === LocationType.PlayerTilesInRack && tile?.location.id === tileToPlay
        }
      }
    }
  }
}

const small = css`
  height: 1em;
  margin-bottom: -0.17em;
`
