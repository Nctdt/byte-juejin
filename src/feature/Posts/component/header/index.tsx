import { PlacehodlerFixed } from '@/component/PlacehodlerFixed'
import { FC } from 'react'
import { useScript } from './hooks/useScript'
import { styles } from './index.style'

export const Header: FC = () => {
  const {
    categories,
    subdomainCategories,
    selectDomainId,
    selectSubdomainId,
    domainHandleClick,
    subdomainHandleClick,
  } = useScript()
  return (
    <PlacehodlerFixed>
      <nav className={styles.nav}>
        <ul className={styles.domainUl}>
          {categories.map(domain => (
            <li
              key={domain.category_id}
              className={styles.domainLi(domain.category_id === selectDomainId)}
              onClick={() => domainHandleClick(domain.category_id)}>
              {domain.category_name}
            </li>
          ))}
        </ul>
        {subdomainCategories.length > 1 && (
          <ul className={styles.subdomainUl}>
            {subdomainCategories.map(subdomain => (
              <li
                key={subdomain.category_id}
                className={styles.subdomainLi(
                  subdomain.category_id === selectSubdomainId,
                )}
                onClick={() => subdomainHandleClick(subdomain.category_id)}>
                {subdomain.category_name}
              </li>
            ))}
          </ul>
        )}
      </nav>
    </PlacehodlerFixed>
  )
}
