import notFound from '../../assets/notFound.svg'
import { useTranslation } from 'react-i18next'

function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <img
        alt={t('notFoundPage.notFound')}
        className="img-fluid h-25"
        src={notFound}
      >
      </img>
      <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.navigateToHome')}<a href="/">{t('notFoundPage.toHome')}</a>
      </p>
    </div>
  )
}

export default NotFoundPage
