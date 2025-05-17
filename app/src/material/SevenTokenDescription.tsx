/** @jsxImportSource @emotion/react */
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import SevenTokenBack from '../images/Tokens/SevenTokenBack.jpg'
import SevenTokenFront from '../images/Tokens/SevenTokenFront.jpg'
import { SevenTokenHelp } from './help/SevenTokenHelp'

export class SevenTokenDescription extends CardDescription {
  height = 5.2
  width = 4

  backImage = SevenTokenBack
  image = SevenTokenFront

  isFlipped = (item: MaterialItem) => item.location.rotation === true

  help = SevenTokenHelp
}

export const sevenTokenDescription = new SevenTokenDescription()
