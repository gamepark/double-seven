/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const SevenTokenHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.seven.token`)}</h2>
      <p>
        <Trans defaults="help.seven.token.description" components={components} />
      </p>
    </>
  )
}
