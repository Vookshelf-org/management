import gql from "graphql-tag"

export default gql`
  query GetSeries($id: ID!) {
    series(id: $id) {
      title
      bookConnections {
        volume
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
