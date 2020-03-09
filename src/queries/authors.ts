import gql from "graphql-tag"

export const getAuthor = gql`
  query getAuthor($id: ID!) {
    author(id: $id) {
      name
      aliases {
        name
      }
      relatedSeries {
        id
        title
        bookConnections {
          volume
          book {
            id
            title
            primaryEdition {
              coverUrl
            }
          }
        }
      }
      bookConnections {
        roles
        book {
          id
          title
          seriesConnections {
            volume
            series {
              title
            }
          }
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
