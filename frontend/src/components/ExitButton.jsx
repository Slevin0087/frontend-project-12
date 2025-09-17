import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'

function ExitButton(props) {
  const { t } = useTranslation()
  return (
    <Button variant="primary" onClick={() => props.onClick()}>
      {t('homepage.header.exit')}
    </Button>
  )
}

export default ExitButton
