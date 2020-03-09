import gql from "graphql-tag"

export default gql`
  query GetBook($id: ID!) {
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
