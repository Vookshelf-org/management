import gql from "graphql-tag"

export const search = gql`
  query search($query: String!, $take: Int) {
    searchBooks(query: $query, take: $take) {
      id
      title
      subtitle
    }
    searchAuthors(query: $query, take: $take) {
      ... on Author {
        id
        name
      }
      ... on AuthorAlias {
        name
        author {
          id
          name
        }
      }
    }
    searchSeries(query: $query, take: $take) {
      id
      title
    }
  }
`
