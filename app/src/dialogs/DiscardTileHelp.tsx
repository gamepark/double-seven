import { useTranslation } from 'react-i18next'

export function DiscardTileHelp() {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('discard.rules.title')}</h2>
      <p>{t('discard.rules.description')}</p>
    </>
  )
}
