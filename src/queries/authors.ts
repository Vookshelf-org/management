import gql from 'graphql-tag'

export const getAuthor = gql`
  query getAuthor($id: ID!) {
    author(id: $id) {
      name
      aliases {
        name
      }
      bookConnections {
        roles
        book {
          id
          title
          primaryEdition {
            id
            isbn
            title
            coverUrl
          }
        }
      }
    }
  }
`
