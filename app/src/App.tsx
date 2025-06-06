/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialGameSounds, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  const [isSoundLoading, setSoundsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading || isSoundLoading
  return (
    <>
      {!!game && <GameDisplay players={game.players.length} />}
      <LoadingScreen display={loading} author="Michael Schacht" artist="Christine Alcouffe" publisher="TIKI Editions" developer="David Sylvestre" />
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading} />
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <MaterialGameSounds onSoundsLoad={() => setSoundsLoading(false)} />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
    </>
  )
}
