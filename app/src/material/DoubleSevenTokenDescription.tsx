/** @jsxImportSource @emotion/react */
import { CardDescription } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import DoubleSevenTokenBack from '../images/Tokens/DoubleSevenTokenBack.jpg'
import DoubleSevenTokenFront from '../images/Tokens/DoubleSevenTokenFront.jpg'
import { DoubleSevenTokenHelp } from './help/DoubleSevenTokenHelp'

export class DoubleSevenTokenDescription extends CardDescription {
  height = 7
  width = 7
  borderRadius = 3.5

  backImage = DoubleSevenTokenBack
  image = DoubleSevenTokenFront

  isFlipped = (item: MaterialItem) => item.location.rotation === true

  help = DoubleSevenTokenHelp
}

export const doubleSevenTokenDescription = new DoubleSevenTokenDescription()
