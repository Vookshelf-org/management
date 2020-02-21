import React, { useState } from 'react'
import classnames from 'classnames'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import SearchBox, {
  ContainerProps as SearchBoxContainerProps,
} from '../SearchBox/SearchBox'
import SearchBoxColumn from '../SearchBox/SearchBoxColumn'

export type ContainerProps = {
  className?: string
}
export type Props = {
  search: SearchBoxContainerProps['search']
} & ContainerProps

const Component: React.FC<Props> = ({ className, search }) => (
  <header
    className={classnames(className, 'w-full', 'sticky', 'py-4', 'shadow')}
  >
    <div className={classnames('container', 'mx-auto')}>
      <SearchBox
        className={classnames('w-1/4')}
        placeholder={'header.searchbox-author-placeholder'}
        search={search}
      />
    </div>
  </header>
)

const query = gql`
  query($name: String!) {
    findByName(name: $name) {
      id
      name
      books {
        id
        title
      }
    }
  }
`

const Header: React.FC<ContainerProps> = props => {
  const authorSearch: Props['search'] = name => {
    const { loading, data } = useQuery(query, { variables: { name } })
    return {
      loading,
      columns: data?.findByName.map(({ id, name }) => (
        <SearchBoxColumn key={id} href={`/author/${id}`}>
          <p>{name}</p>
        </SearchBoxColumn>
      )),
    }
  }
  return <Component {...props} search={authorSearch} />
}

export default Header
