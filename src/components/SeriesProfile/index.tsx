import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"

import Book from "~/components/BooksList/Covers/Book"
import * as QueryType from "~/types/queries"

export type ContainerProps = {
  className?: string
  series: QueryType.GetSeriesQuery["series"]
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, series }) => {
  const { t } = useTranslation()

  return (
    <div className={classnames(className, "container", "mx-auto")}>
      <h1
        className={classnames(
          "w-full",
          "text-3xl",
          "font-bold",
          "text-black",
          "select-all",
          "mb-2"
        )}
      >
        {series.title}
      </h1>
      <div
        className={classnames(
          "grid",
          "col-gap-4",
          "row-gap-4",
          "grid-cols-2",
          "sm:grid-cols-3",
          "md:grid-cols-4",
          "lg:grid-cols-6",
          "xl:grid-cols-8"
        )}
      >
        {series.bookConnections
          .sort(({ volume: a }, { volume: b }) => a - b)
          .map((connection, i) => (
            <Book book={connection.book} key={i} />
          ))}
      </div>
    </div>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
