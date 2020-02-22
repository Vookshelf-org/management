import gql from 'graphql-tag'

export const getAuthor = gql`
  query getAuthor($id: Float!) {
    author(id: $id) {
      name
      books {
        id
        title
        volume
        authors {
          id
          name
        }
        series {
          id
          title
        }
      }
    }
  }
`
