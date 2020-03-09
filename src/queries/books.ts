import gql from "graphql-tag"

export const getBook = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      title
      subtitle
      authorConnections {
        author {
          id
          name
        }
        roles
      }
      editions {
        title
        isbn
        number
      }
      primaryEdition {
        title
        isbn
        coverUrl
      }
      seriesConnections {
        volume
        series {
          id
          title
        }
      }
    }
  }
`
