import gql from "graphql-tag"

export const getSeries = gql`
  query getSeries($id: ID!) {
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
