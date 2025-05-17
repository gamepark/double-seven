/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />,
  underline: <u />
}

export const ActionsHelp = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t(`help.actions`)}</h2>
      <p>
        <Trans defaults="help.actions.description" components={components} />
      </p>
      <h3>{t(`help.actions.1`)}</h3>
      <p>
        <Trans defaults="help.actions.1.description" components={components} />
      </p>
      <h3>{t(`help.actions.2`)}</h3>
      <p>
        <Trans defaults="help.actions.2.description" components={components} />
      </p>
      <h3>{t(`help.actions.3`)}</h3>
      <p>
        <Trans defaults="help.actions.3.description" components={components} />
      </p>
      <h3>{t(`help.actions.4`)}</h3>
      <p>
        <Trans defaults="help.actions.4.description" components={components} />
      </p>
      <h3>{t(`help.actions.5`)}</h3>
      <p>
        <Trans defaults="help.actions.5.description" components={components} />
      </p>
    </>
  )
}
