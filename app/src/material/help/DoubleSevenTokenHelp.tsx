/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const DoubleSevenTokenHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.double.seven.token`)}</h2>
      <p>
        <Trans defaults="help.double.seven.token.description" components={components} />
      </p>
    </>
  )
}
