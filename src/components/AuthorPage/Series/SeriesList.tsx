import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import * as QueryType from "~/codegen/queries"
import Book from "~/components/BooksList/Covers/Book"

export type ContainerProps = {
  className?: string
  connections: QueryType.GetAuthorQuery["author"]["relatedSeries"][number]["bookConnections"]
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, connections }) => {
  const { t } = useTranslation()
  return (
    <div className={classnames("overflow-x-scroll")}>
      <div className={classnames(className, "w-full", "flex", "py-4")}>
        {connections
          .sort(({ volume: a, volume: b }) => a - b)
          .map(({ book, volume }, i, { length }) => (
            <Book
              key={volume}
              book={book}
              className={classnames("w-48", "md:w-40", "xl:w-32", {
                "mr-2": i + 1 !== length,
              })}
            />
          ))}
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default Container
