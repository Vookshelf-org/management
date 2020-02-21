import { NextPage } from 'next'
import classnames from 'classnames'

import SearchBox from '../components/SearchBox/SearchBox'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import SearchBoxColumn from '../components/SearchBox/SearchBoxColumn'

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

interface Props {
  className?: string
  userAgent?: string
}

const Page: NextPage<Props> = () => {
  return (
    <main className={classnames('container', 'p-6')}>
      <SearchBox
        search={name => {
          const { loading, data } = useQuery(query, { variables: { name } })
          return {
            loading,
            columns: data?.findByName.map(({ id, name }) => (
              <SearchBoxColumn key={id}>
                <p>{name}</p>
              </SearchBoxColumn>
            )),
          }
        }}
      />
    </main>
  )
}
export default Page
