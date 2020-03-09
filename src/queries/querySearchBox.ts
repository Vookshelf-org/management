import gql from "graphql-tag"

export default gql`
  query SearchBox($query: String!, $take: Int) {
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
