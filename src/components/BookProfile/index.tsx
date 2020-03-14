import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"

import Authors from "./Authors"
import Series from "./Series"

import * as QueryType from "~/codegen/queries"
import CoverArtPlaceHolder from "~/components/CoverArtPlaceholder"

export type ContainerProps = {
  className?: string
  book: QueryType.GetBookQuery["book"]
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, book }) => {
  const { t } = useTranslation()

  return (
    <div className={classnames(className, "container", "mx-auto", "flex")}>
      <CoverArtPlaceHolder
        src={book.primaryEdition?.coverUrl}
        className={classnames("mr-8", "max-w-xs")}
      />
      <div className={classnames("flex-grow")}>
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
          {book.title}
        </h1>
        <Authors
          connections={book.authorConnections}
          className={classnames("mb-2")}
        />
        {book.seriesConnections.length > 0 && (
          <Series connections={book.seriesConnections} />
        )}
      </div>
    </div>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
