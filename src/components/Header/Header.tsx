import { useQuery } from '@apollo/react-hooks'
import classnames from 'classnames'
import gql from 'graphql-tag'
import React from 'react'
import { useTranslation } from 'react-i18next'

import SearchBox, {
  ContainerProps as SearchBoxContainerProps,
} from '~/components/SearchBox/SearchBox'
import SearchBoxColumn from '~/components/SearchBox/SearchBoxColumn'
import SearchBoxColumnsBox from '~/components/SearchBox/SearchBoxColumnsBox'

export type ContainerProps = {
  className?: string
}
export type Props = {
  search: SearchBoxContainerProps['search']
} & ContainerProps

const Component: React.FC<Props> = ({ className, search }) => (
  <header
    className={classnames(
      className,
      'w-full',
      'sticky',
      'h-16',
      'shadow',
      'z-50'
    )}
  >
    <div
      className={classnames(
        'container',
        'mx-auto',
        'h-full',
        'flex',
        'items-center'
      )}
    >
      <SearchBox
        className={classnames('w-1/3')}
        placeholder={'header.searchbox-placeholder'}
        search={search}
      />
    </div>
  </header>
)

const query = gql`
  query($input: String!) {
    searchAuthors(name: $input) {
      id
      name
    }
    searchBooks(title: $input) {
      id
      title
      authors {
        id
        name
      }
    }
    searchSeries(title: $input) {
      id
      title
    }
  }
`

const Header: React.FC<ContainerProps> = props => {
  const { t } = useTranslation()
  const search: Props['search'] = input => {
    const { loading, data } = useQuery(query, { variables: { input } })
    return {
      loading,
      columns:
        data?.searchAuthors.length === 0 &&
        data?.searchBooks.length === 0 &&
        data?.searchSeries.length === 0
          ? []
          : [
              <SearchBoxColumnsBox
                key="author"
                columns={
                  data?.searchAuthors.map(({ id, name }) => (
                    <SearchBoxColumn
                      key={id}
                      link={{ href: '/author/[id]', as: `/author/${id}` }}
                    >
                      <p>{name}</p>
                    </SearchBoxColumn>
                  )) || []
                }
              >
                <p>{t('common:author')}</p>
              </SearchBoxColumnsBox>,
              <SearchBoxColumnsBox
                key="books"
                columns={
                  data?.searchBooks.map(({ id, title }) => (
                    <SearchBoxColumn
                      key={id}
                      link={{ href: '/book/[id]', as: `/book/${id}` }}
                    >
                      <p>{title}</p>
                    </SearchBoxColumn>
                  )) || []
                }
              >
                <p>{t('common:book')}</p>
              </SearchBoxColumnsBox>,
              <SearchBoxColumnsBox
                key="series"
                columns={
                  data?.searchSeries.map(({ id, title }) => (
                    <SearchBoxColumn
                      key={id}
                      link={{ href: '/series/[id]', as: `/series/${id}` }}
                    >
                      <p>{title}</p>
                    </SearchBoxColumn>
                  )) || [
                    <SearchBoxColumn key={'series-no-result'}>
                      <p>{t('common:no-result')}</p>
                    </SearchBoxColumn>,
                  ]
                }
              >
                <p>{t('common:series')}</p>
              </SearchBoxColumnsBox>,
            ],
    }
  }
  return <Component {...props} search={search} />
}

export default Header
