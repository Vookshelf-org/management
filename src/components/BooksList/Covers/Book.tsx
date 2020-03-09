import classnames from "classnames"
import Link from "next/link"
import React from "react"

import CoverArt from "~/components/CoverArtPlaceholder"
import * as QueryType from "~/types/queries"

export type ContainerProps = {
  className?: string
  book: Pick<QueryType.Book, "id" | "title" | "primaryEdition">
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, book }) => {
  const url = book?.primaryEdition?.coverUrl
  return (
    <div className={classnames(className)}>
      <div className={classnames("relative")}>
        <CoverArt src={url} className={classnames("self-center")}>
          <Link href={"/book/[id]"} as={`/book/${book.id}`}>
            <a className={classnames("absolute", "inset-0", "z-20")} />
          </Link>
        </CoverArt>
        <p
          className={classnames(
            "mt-1",
            "text-black",
            "text-xs",
            "truncate",
            "select-all"
          )}
        >
          {book.title}
        </p>
      </div>
    </div>
  )
}

export const Container: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default Container
